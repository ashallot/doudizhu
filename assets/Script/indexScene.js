var com = require('Common');  
cc.Class({
    extends: cc.Component,

    properties: {
        data:{
            default:null,
            userid:0,
            core:0,
            roomid:0,
            isLogin:true,
            sceneType:0,
            // sceneType 0:login 1:index 2:room 
        },
      btn_logout: cc.Button,
      btn_help: cc.Button,
      btn_setting: cc.Button,
      btn_create: cc.Button,
      btn_enter: cc.Button,
    },

    onLoad () {
        this.btn_logout.node.on("click", this.logoutClick, this);
        this.btn_help.node.on("click", this.helpClick, this);
        this.btn_setting.node.on("click", this.settingClick, this);
        this.btn_create.node.on("click", this.createClick, this);
        this.btn_enter.node.on("click", this.enterClick, this);

        this.data = com.data;
        console.log(this.data);
    },

    start () {

    },

    update (dt) {},

    logoutClick(event){
        // http
        com.data.isLogin = false;
        cc.director.loadScene("login");
    },
    helpClick(event){
        com.data.sceneType = 1;
        cc.director.loadScene("help");
    },
    settingClick(event){
        com.data.sceneType = 1;
        cc.director.loadScene("setting");
    },
    createClick(event){

    },
    enterClick(event){
        cc.director.loadScene("findroom");
    },
});
