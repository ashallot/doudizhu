cc.Class({
  extends: cc.Component,

  properties: {
    userid: "",
    pwd: "",
    btn_login: cc.Button,
    btn_register: cc.Button,
    btn_setting: cc.Button,
    btn_help: cc.Button,

    input_zhanghao: cc.EditBox,
    input_pwd: cc.EditBox
  },

  // use this for initialization
  onLoad: function() {
    this.btn_login.node.on("click", this.loginClick, this);
    this.btn_register.node.on("click", this.registerClick, this);
    this.btn_setting.node.on("click", this.settingClick, this);
    this.btn_help.node.on("click", this.helpClick, this);

    this.input_zhanghao.node.on("editbox", this.zhanghaoInput, this);
    this.input_pwd.node.on("editbox", this.pwdInput, this);
  },

  // called every frame
  update: function(dt) {},

  loginClick(event) {
    console.log("login");
    console.log(this.userid);
  },
  registerClick(event) {
    console.log("register");
  },
  settingClick(event) {
    console.log("setting");
  },
  helpClick(event) {
    console.log("help");
  },
  zhanghaoInput: function(text, editbox, customEventData) {
    this.userid = parseInt(text);
    console.log(this.userid);
  },
  pwdInput: function(text, editbox, customEventData) {
    this.pwd = text;
    console.log(this.pwd);
  }
});
