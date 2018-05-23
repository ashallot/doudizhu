var com = require("Common");
var gameMgr = require("gameMgr");
cc.Class({
    extends: cc.Component,

    properties: {
        btn_back:cc.Button,
        btn_ready:cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.children[2].active = false;
        this.btn_back.node.on("click",this.backclick,this);
        this.btn_ready.node.on("click",this.readyclick,this);
    },

    start () {

    },

    update (dt) {},
    backclick(event){
        this.leaveRoom();
    },
    readyclick(event){
        this.node.children[1].active = false;
        this.node.children[2].active = true;
    },
    leaveRoom() {
        var self = this;
        var onCreate = function (ret) {
            console.log(ret)
            gameMgr.leaveGameServer(ret)
            cc.director.loadScene("index");
        };

        var data = {
            userid:com.data.userid,
            roomid:com.data.roomid
        };
        // var data = '/'+com.data.userid+'/'+com.data.roomid
        console.log(data);
        cc.http.sendRequest("/game/room/leave_room","put", data, onCreate);
        
    }
});
