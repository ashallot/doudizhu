var com = require("Common");
cc.Class({
    extends: cc.Component,

    properties: {
        btn_back:cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.btn_back.node.on("click",this.backclick,this);
    },

    start () {

    },

    update (dt) {},
    backclick(event){
        cc.director.loadScene("index");
    }
});
