var com = require("Common");
cc.Class({
  extends: cc.Component,
  properties: {
    audio_backmusic: {
      url: cc.AudioClip,
      default: null
    },
    // audio_playmusic: {
    //   url: cc.AudioClip,
    //   default: null
    // },
    audio_btnmusic: {
      url: cc.AudioClip,
      default: null
    }
  },

  onLoad: function() {
    cc.game.addPersistRootNode(this.node);
    console.log(com.data.playing);
    if (com.data.musicback) {
      this.backmusic = cc.audioEngine.play(this.audio_backmusic, true, 1);
    }
  },
  update: function(dt) {
    // this.audio_switch.playing = com.data.playing;
    // if (audio_switch.background == 1 && audio_switch.playing != 1) {
    //   this.backmusic = cc.audioEngine.play(this.audio_backmusic, true, 1);
    // }
    // if (audio_switch.playgame == 1 && audio_switch.playing == 1) {
    //     this.playmusic = cc.audioEngine.play(this.audio_playmusic, true, 1);
    // }
    if(com.data.btntouch == 1){
        this.audio_btnmusic = cc.audioEngine.play(this.audio_backmusic, true, 1);
        setTimeout(function(){
            com.data.btntouch =0;
            cc.audioEngine.stop(this.audio_btnmusic);
        },100)
    }
  },
  onDestroy: function() {
    cc.audioEngine.stop(this.backmusic);
  },

  setData:function(status){

  }
});
