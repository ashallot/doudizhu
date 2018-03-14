cc.Class({
    extends: cc.Component,
  
    properties: {  
      btn_back: cc.Button
    },
  
    // use this for initialization
    onLoad: function() {
      this.btn_back.node.on("click", this.backClick, this);
    },
  
    // called every frame
    update: function(dt) {},

    backClick(event) {
      console.log("back");
      cc.director.loadScene("login");
    }
  });
  