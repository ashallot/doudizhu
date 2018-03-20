var com = require("Common");
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
        cc.director.loadScene("index");
    },
    readyclick(event){
        this.node.children[1].active = false;
        this.node.children[2].active = true;
    },
});
