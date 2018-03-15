var com = require("Common");
cc.Class({
    extends: cc.Component,
  
    properties: {  
      btn_back: cc.Button,
      btn_musicbg: cc.Button,
      btn_musicplay: cc.Button,
      sceneType:0
      // sceneType 0:login 1:index 2:room 
    },
  
    // use this for initialization
    onLoad: function() {
      this.btn_back.node.on("click", this.backClick, this);
      this.btn_musicbg.node.on("click", this.musicbgClick, this);
      this.btn_musicplay.node.on("click", this.musicplayClick, this);
      this.sceneType = com.data.sceneType;
    },
  
    // called every frame
    update: function(dt) {},

    backClick(event) {
      console.log("back");
      if(this.sceneType == 0){
        cc.director.loadScene("login");
      }else if(this.sceneType == 1){
        cc.director.loadScene("index");
      }else if(this.sceneType == 2){
        cc.director.loadScene("login");
      }
    },
    musicbgClick(event){
      console.log("musicbg");
    //   console.log(this.node.children[5].active);
      this.node.children[8].active = !this.node.children[8].active;
    },
    musicplayClick(event){
      console.log("musicplay");
      this.node.children[10].active = !this.node.children[10].active;
    }
  });
  