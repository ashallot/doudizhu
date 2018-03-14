cc.Class({
  extends: cc.Component,

  properties: {
    userinfo: [],
    user_reinfo: [],

    // userinfo: {
    //   userid: 0,
    //   pwd: "",
    // },
    // user_reinfo: {
    //   userid_re: 0,
    //   pwd_re1: "",
    //   pwd_re2: "",
    // },
    timer: function() {},

    btn_login: cc.Button,
    btn_register: cc.Button,
    btn_setting: cc.Button,
    btn_help: cc.Button,
    btn_confirm: cc.Button,
    btn_fanhui: cc.Button,

    input_zhanghao: cc.EditBox,
    input_pwd: cc.EditBox,

    input_zhanghao_re: cc.EditBox,
    input_pwd_re1: cc.EditBox,
    input_pwd_re2: cc.EditBox
  },

  // use this for initialization
  onLoad: function() {
    this.node.children[5].active = false;
    this.btn_login.node.on("click", this.loginClick, this);
    this.btn_register.node.on("click", this.registerClick, this);
    this.btn_setting.node.on("click", this.settingClick, this);
    this.btn_help.node.on("click", this.helpClick, this);
    this.btn_confirm.node.on("click", this.confirmClick, this);
    this.btn_fanhui.node.on("click", this.fanhuiClick, this);

    this.input_zhanghao.node.on("editbox", this.zhanghaoInput, this);
    this.input_pwd.node.on("editbox", this.pwdInput, this);

    this.input_zhanghao_re.node.on("editbox", this.zhanghao_reInput, this);
    this.input_pwd_re1.node.on("editbox", this.pwd_re1Input, this);
    this.input_pwd_re2.node.on("editbox", this.pwd_re2Input, this);
  },

  // called every frame
  update: function(dt) {},

  loginClick(event) {
    console.log("login");
    console.log(this.userinfo);
    if (!this.userinfo.userid) {
      this.node.children[5].children[0]._components[0].string = "请输入账号！";
      this.node.children[5].active = true;
      this.timer = setTimeout(() => {
        this.node.children[5].active = false;
      }, 1000);
    } else if (this.userinfo.userid.toString().length != 8) {
      this.node.children[5].children[0]._components[0].string =
        "请输入8位账号！";
      this.node.children[5].active = true;
      this.timer = setTimeout(() => {
        this.node.children[5].active = false;
      }, 1000);
    } else if (!this.userinfo.pwd) {
      this.node.children[5].children[0]._components[0].string = "请输入密码！";
      this.node.children[5].active = true;
      this.timer = setTimeout(() => {
        this.node.children[5].active = false;
      }, 1000);
    }

    // http

    // var userData = {
    //   userid: 12345678,
    //   core: 100,
    //   roomid: 0
    // };
    // cc.sys.localStorage.setItem('userData', JSON.stringify(userData));

    // var user = JSON.parse(cc.sys.localStorage.getItem('userData'));

    // console.log(user);
  },
  registerClick(event) {
    this.node.children[4].active = false;
    console.log("register");
  },
  settingClick(event) {
    console.log("setting");
  },
  helpClick(event) {
    console.log("help");
  },
  confirmClick(event) {
    console.log("confirm");
    console.log(this.user_reinfo);
    if (!this.user_reinfo.userid_re) {
      this.node.children[5].children[0]._components[0].string = "请输入账号！";
      this.node.children[5].active = true;
      this.timer = setTimeout(() => {
        this.node.children[5].active = false;
      }, 1000);
    } else if (this.user_reinfo.userid_re.toString().length != 8) {
      this.node.children[5].children[0]._components[0].string =
        "请输入8位账号！";
      this.node.children[5].active = true;
      this.timer = setTimeout(() => {
        this.node.children[5].active = false;
      }, 1000);
    } else if (!this.user_reinfo.pwd_re1 || !this.user_reinfo.pwd_re2) {
      this.node.children[5].children[0]._components[0].string =
        "请输入两次密码！";
      this.node.children[5].active = true;
      this.timer = setTimeout(() => {
        this.node.children[5].active = false;
      }, 1000);
    } else if (this.user_reinfo.pwd_re1 != this.user_reinfo.pwd_re2) {
      this.node.children[5].children[0]._components[0].string =
        "两次密码不一致！";
      this.node.children[5].active = true;
      this.timer = setTimeout(() => {
        this.node.children[5].active = false;
      }, 1000);
    }

    // http
  },
  fanhuiClick(event) {
    console.log("fanhui");
    this.node.children[4].active = true;
  },

  zhanghaoInput: function(text, editbox, customEventData) {
    this.userinfo.userid = parseInt(text);
  },
  pwdInput: function(text, editbox, customEventData) {
    this.userinfo.pwd = text;
  },

  zhanghao_reInput: function(text, editbox, customEventData) {
    this.user_reinfo.userid_re = parseInt(text);
  },
  pwd_re1Input: function(text, editbox, customEventData) {
    this.user_reinfo.pwd_re1 = text;
  },
  pwd_re2Input: function(text, editbox, customEventData) {
    this.user_reinfo.pwd_re2 = text;
  }
});
