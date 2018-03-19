var com = require("Common");
cc.http = require("HTTP");
cc.Class({
  extends: cc.Component,

  properties: {
    roomid:[],
    btn_1: cc.Button,
    btn_2: cc.Button,
    btn_3: cc.Button,
    btn_4: cc.Button,
    btn_5: cc.Button,
    btn_6: cc.Button,
    btn_7: cc.Button,
    btn_8: cc.Button,
    btn_9: cc.Button,
    btn_again: cc.Button,
    btn_0: cc.Button,
    btn_del: cc.Button,
    btn_back: cc.Button
  },

  onLoad:function() {
    this.node.children[2].active = false;
    this.btn_1.node.on("click", this.key1Click, this);
    this.btn_2.node.on("click", this.key2Click, this);
    this.btn_3.node.on("click", this.key3Click, this);
    this.btn_4.node.on("click", this.key4Click, this);
    this.btn_5.node.on("click", this.key5Click, this);
    this.btn_6.node.on("click", this.key6Click, this);
    this.btn_7.node.on("click", this.key7Click, this);
    this.btn_8.node.on("click", this.key8Click, this);
    this.btn_9.node.on("click", this.key9Click, this);
    this.btn_again.node.on("click", this.keyagainClick, this);
    this.btn_0.node.on("click", this.key0Click, this);
    this.btn_del.node.on("click", this.keydelClick, this);
    this.btn_back.node.on("click", this.keybackClick, this);
  },

  start() {},

  update(dt) {},


  keybackClick:function(event){
    this.roomid = [];
    cc.director.loadScene("index");
  },
  key1Click:function(event){
    if(this.roomid.length<6){
        this.roomid.push(1);
        this.node.children[1].children[2]._components[0].string = this.roomid.join('');
        if(this.roomid.length==6){
            // http
            this.http();
        }
    }
  },
  key2Click:function(event){
    if(this.roomid.length<6){
        this.roomid.push(2);
        this.node.children[1].children[2]._components[0].string = this.roomid.join('');
        if(this.roomid.length==6){
            // http
            this.http();
        }
    }
  },
  key3Click:function(event){
    if(this.roomid.length<6){
        this.roomid.push(3);
        this.node.children[1].children[2]._components[0].string = this.roomid.join('');
        if(this.roomid.length==6){
            // http
            this.http();
        }
    }
  },
  key4Click:function(event){
    if(this.roomid.length<6){
        this.roomid.push(4);
        this.node.children[1].children[2]._components[0].string = this.roomid.join('');
        if(this.roomid.length==6){
            // http
            this.http();
        }
    }
  },
  key5Click:function(event){
    if(this.roomid.length<6){
        this.roomid.push(5);
        this.node.children[1].children[2]._components[0].string = this.roomid.join('');
        if(this.roomid.length==6){
            // http
            this.http();
        }
    }
  },
  key6Click:function(event){
    if(this.roomid.length<6){
        this.roomid.push(6);
        this.node.children[1].children[2]._components[0].string = this.roomid.join('');
        if(this.roomid.length==6){
            // http
            this.http();
        }
    }
  },
  key7Click:function(event){
    if(this.roomid.length<6){
        this.roomid.push(7);
        this.node.children[1].children[2]._components[0].string = this.roomid.join('');
        if(this.roomid.length==6){
            // http
            this.http();
        }
    }
  },
  key8Click:function(event){
    if(this.roomid.length<6){
        this.roomid.push(8);
        this.node.children[1].children[2]._components[0].string = this.roomid.join('');
        if(this.roomid.length==6){
            // http
            this.http();
        }
    }
  },
  key9Click:function(event){
    if(this.roomid.length<6){
        this.roomid.push(9);
        this.node.children[1].children[2]._components[0].string = this.roomid.join('');
        if(this.roomid.length==6){
            // http
            this.http();
        }
    }
  },
  key0Click:function(event){
    if(this.roomid.length<6){
        this.roomid.push(0);
        this.node.children[1].children[2]._components[0].string = this.roomid.join('');
        if(this.roomid.length==6){
            // http
            this.http();
        }
    }
  },
  keyagainClick:function(event){
    this.roomid = [];
    this.node.children[1].children[2]._components[0].string = '';
  },
  keydelClick:function(event){
    var index = this.roomid.length-1;
    if(index <0)index = 0;
    console.log(index);
    this.roomid.splice(index,1);
    this.node.children[1].children[2]._components[0].string = this.roomid.join('');
  },
  http:function(){
    Alert.show("房间不存在", null, false, 0.2);
    //   cc.http.sendRequest("/game/room/findroom", data, onFind);
  }
});
