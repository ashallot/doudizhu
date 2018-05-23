var net = require("NET")
var common = require("Common")
module.exports = {
    
    clear:function(){
        this.dataEventHandler = null;
        if(this.isOver == null){
            this.seats = null;
            this.roomId = null;
            this.maxNumOfGames = 0;
            this.numOfGames = 0;        
        }
    },
    
    dispatchEvent(event,data){
        if(this.dataEventHandler){
            this.dataEventHandler.emit(event,data);
        }    
    },
    
    getSeatIndexByID:function(userId){
        for(var i = 0; i < this.seats.length; ++i){
            var s = this.seats[i];
            if(s.userid == userId){
                return i;
            }
        }
        return -1;
    },
    
    isOwner:function(){
        return this.seatIndex == 0;   
    },
    
    getSeatByID:function(userId){
        var seatIndex = this.getSeatIndexByID(userId);
        var seat = this.seats[seatIndex];
        return seat;
    },
    
    getSelfData:function(){
        return this.seats[this.seatIndex];
    },
    
    getLocalIndex:function(index){
        var ret = (index - this.seatIndex + 4) % 4;
        return ret;
    },
    
    initHandlers:function(){
        var self = this;
        net.addHandler("login_result",function(data){
            console.log(data);
            if(data.errcode === 0){
                var data = data.data;
                self.roomId = data.roomid;
                self.conf = data.conf;
                self.maxNumOfGames = data.conf.maxGames;
                self.numOfGames = data.numofgames;
                self.seats = data.seats;
                self.seatIndex = self.getSeatIndexByID(common.data.userid);
                self.isOver = false;
            }
            else{
                console.log(data.errmsg);   
            }
            self.dispatchEvent('login_result');
        });
                
        net.addHandler("login_finished",function(data){
            console.log("login_finished");
            cc.director.loadScene("mjgame",function(){
                net.ping();
            });
            self.dispatchEvent("login_finished");
        });

        net.addHandler("exit_result",function(data){
            self.roomId = null;
            self.turn = -1;
            self.seats = null;
        });
        
        net.addHandler("exit_notify_push",function(data){
           var userId = data;
           var s = self.getSeatByID(userId);
           if(s != null){
               s.userid = 0;
               s.name = "";
               self.dispatchEvent("user_state_changed",s);
           }
        });
        
        net.addHandler("dispress_push",function(data){
            self.roomId = null;
            self.seats = null;
        });
                
        net.addHandler("disconnect",function(data){
            if(self.roomId == null){
                Alert.show('正在返回游戏大厅');
                cc.director.loadScene("index");
            }
            else{
                if(self.isOver == false){
                    self.dispatchEvent("disconnect");                    
                }
                else{
                    self.roomId = null;
                }
            }
        });
        
        net.addHandler("new_user_comes_push",function(data){
            //console.log(data);
            var seatIndex = data.seatindex;
            var needCheckIp = false;
            if(self.seats[seatIndex].userid > 0){
                self.seats[seatIndex].online = true;
                if(self.seats[seatIndex].ip != data.ip){
                    self.seats[seatIndex].ip = data.ip;
                    needCheckIp = true;
                }
            }
            else{
                data.online = true;
                self.seats[seatIndex] = data;
                needCheckIp = true;
            }
            self.dispatchEvent('new_user',self.seats[seatIndex]);
            
            if(needCheckIp){
                self.dispatchEvent('check_ip',self.seats[seatIndex]);
            }
        });
        
        net.addHandler("user_state_push",function(data){
            //console.log(data);
            var userId = data.userid;
            var seat = self.getSeatByID(userId);
            seat.online = data.online;
            self.dispatchEvent('user_state_changed',seat);
        });
        
        net.addHandler("user_ready_push",function(data){
            //console.log(data);
            var userId = data.userid;
            var seat = self.getSeatByID(userId);
            seat.ready = data.ready;
            self.dispatchEvent('user_state_changed',seat);
        });
         
        net.addHandler("game_begin_push",function(data){
            console.log('game_action_push');
            console.log(data);
            self.button = data;
            self.turn = self.button;
            self.gamestate = "begin";
            self.dispatchEvent('game_begin');
        });
        
        net.addHandler("game_playing_push",function(data){
            console.log('game_playing_push'); 
            self.gamestate = "playing"; 
            self.dispatchEvent('game_playing');
        });
        
        net.addHandler("game_chupai_push",function(data){
            console.log('game_chupai_push');
            //console.log(data);
            var turnUserID = data;
            var si = self.getSeatIndexByID(turnUserID);
            self.doTurnChange(si);
        });
        
        net.addHandler("game_num_push",function(data){
            self.numOfGames = data;
            self.dispatchEvent('game_num',data);
        });

        net.addHandler("game_over_push",function(data){
            console.log('game_over_push');
            var results = data.results;
            for(var i = 0; i <  self.seats.length; ++i){
                self.seats[i].score = results.length == 0? 0:results[i].totalscore;
            }
            self.dispatchEvent('game_over',results);
            if(data.endinfo){
                self.isOver = true;
                self.dispatchEvent('game_end',data.endinfo);    
            }
            self.reset();
            for(var i = 0; i <  self.seats.length; ++i){
                self.dispatchEvent('user_state_changed',self.seats[i]);    
            }
        });
    },
    
    doGuo:function(seatIndex,pai){
        var seatData = this.seats[seatIndex];
        var folds = seatData.folds;
        folds.push(pai);
        this.dispatchEvent('guo_notify',seatData);    
    },
    
    doChupai:function(seatIndex,pai){
        this.chupai = pai;
        var seatData = this.seats[seatIndex];
        if(seatData.holds){             
            var idx = seatData.holds.indexOf(pai);
            seatData.holds.splice(idx,1);
        }
        this.dispatchEvent('game_chupai_notify',{seatData:seatData,pai:pai});    
    },
    
    doTurnChange:function(si){
        var data = {
            last:this.turn,
            turn:si,
        }
        this.turn = si;
        this.dispatchEvent('game_chupai',data);
    },
    
    connectGameServer:function(data){
        this.dissoveData = null;
        var self = this;

        var onConnectOK = function(){
            console.log("onConnectOK");
            var sd = {
                roomid:data.roomid
            };
            net.send("login",sd);
        };
        
        var onConnectFailed = function(){
            console.log("failed.");
        };
        Alert.show("正在进入房间", null, false, 0.2);
        net.connect(onConnectOK,onConnectFailed);
    },
    leaveGameServer:function(data){
        var self = this;
        
        var onOK = function(){
            console.log("onOK");
            var sd = {
                roomid:data.roomid,
                user:common.data.userid
            };
            net.close();
        };
        net.close(onOK);
    }

};
