var com = require("Common");
cc.Class({
  extends: cc.Component,
  properties: {
    audio_backmusic: {
      url: cc.AudioClip,
      default: null
    },
    audio_playmusic: {
      url: cc.AudioClip,
      default: null
    },
    audio_btnmusic: {
      url: cc.AudioClip,
      default: null
    }
  },

  onLoad: function () {
    cc.game.addPersistRootNode(this.node);
    if (com.data.back_music && !com.data.playing) {//背景音乐打开且未进入游戏中
      this.backmusic = cc.audioEngine.play(this.audio_backmusic, true, 1);
    }
    if (com.data.play_music && com.data.playing) {//游戏音量打开且进入游戏中
      this.playmusic = cc.audioEngine.play(this.audio_playmusic, true, 1);
    }
    if(com.data.btntouch){
      this.audio_btnmusic = cc.audioEngine.play(this.audio_btnmusic,false,1);
    }
  },
  update: function (dt) {
    if(com.data.btntouch){
        this.audio_btnmusic = cc.audioEngine.resumeAll(this.audio_btnmusic);
        com.data.btntouch =false;
    }else{
      this.audio_btnmusic = cc.audioEngine.pause(this.audio_btnmusic);
    }
    if (com.data.back_music && !com.data.playing) {//背景音乐打开且未进入游戏中
      this.backmusic = cc.audioEngine.resumeAll(this.audio_backmusic);
    } else if (!com.data.back_music && !com.data.playing) {
      this.backmusic = cc.audioEngine.pauseAll(this.audio_backmusic);
    }
    if (com.data.play_music && com.data.playing) {//游戏音量打开且进入游戏中
      this.playmusic = cc.audioEngine.resumeAll(this.audio_playmusic);
    } else if (!com.data.play_music && com.data.playing) {
      this.playmusic = cc.audioEngine.pauseAll(this.audio_playmusic);
    }
  },
  onDestroy: function () {
    cc.audioEngine.stop(this.backmusic);
    // cc.audioEngine.stop(this.audio_btnmusic);
  },

  setData: function (status) {

  }
});
