var com = require('Common');
var gameMgr = require("gameMgr");
cc.Class({
    extends: cc.Component,

    properties: {
        data: {
            default: null,
            userid: 0,
            core: 0,
            roomid: 0,
            isLogin: 1,
            sceneType: 0,
            // sceneType 0:login 1:index 2:room
        },
        btn_logout: cc.Button,
        btn_help: cc.Button,
        btn_setting: cc.Button,
        btn_create: cc.Button,
        btn_enter: cc.Button,
    },

    onLoad() {
        this.btn_logout.node.on("click", this.logoutClick, this);
        this.btn_help.node.on("click", this.helpClick, this);
        this.btn_setting.node.on("click", this.settingClick, this);
        this.btn_create.node.on("click", this.createClick, this);
        this.btn_enter.node.on("click", this.enterClick, this);

        this.data = com.data;
        console.log(this.data);

        this.node.children[7]._components[0].string = this.data.userid;
        this.node.children[9]._components[0].string = this.data.core;
    },

    start() {

    },

    update(dt) { },

    logoutClick(event) {
        // http
        com.data.isLogin = 0;
        cc.director.loadScene("login");
    },
    helpClick(event) {
        com.data.sceneType = 1;
        cc.director.loadScene("help");
    },
    settingClick(event) {
        com.data.sceneType = 1;
        cc.director.loadScene("setting");
    },
    createClick(event) {
        this.createRoom();
    },
    enterClick(event) {
        cc.director.loadScene("findroom");
    },
    createRoom() {
        var self = this;
        var onCreate = function (ret) {
            console.log(ret)
            gameMgr.connectGameServer(ret)
            com.data.roomid = ret.roomid;
            cc.director.loadScene("room");
        };

        var data = {
            userid:com.data.userid
        };
        console.log(data);
        Alert.show("正在创建房间", null, false, 0.2);
        setTimeout(function() {
            cc.http.sendRequest("/game/room/create_private_room","post", data, onCreate);
        }, 2000);
        
    }
});
