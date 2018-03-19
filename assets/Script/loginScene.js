var com = require("Common");
cc.http = require("HTTP");
cc.Class({
  extends: cc.Component,

  properties: {
    userinfo: {
      default: null,
      userid: 0,
      pwd: ""
    },
    user_reinfo: {
      default: null,
      userid_re: 0,
      pwd_re1: "",
      pwd_re2: ""
    },

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
    var onLogin = function(res) {
      if (res.status == 1) {
        Alert.show("登录成功！", null, false, 0.2);
        com.data = {
          userid: res.username,
          core: res.core,
          roomid: 0,
          isLogin: 1,
          sceneType: 0
        };
        setTimeout(
          ()=>{
            if (com.data.isLogin == 1) {
              cc.director.loadScene("index");
            }
          },1500
        )
      } else if (res.status == 0) {
        Alert.show("登录失败！账号不存在！", null, false, 0.2);
      } else if (res.status == 2) {
        Alert.show("登录失败！密码错误！", null, false, 0.2);
      }
    };
    if (!this.userinfo.userid) {
      Alert.show("请输入账号！", null, false, 0.2);
    } else if (this.userinfo.userid.toString().length != 8) {
      Alert.show("请输入8位账号！", null, false, 0.2);
    } else if (!this.userinfo.pwd) {
      Alert.show("请输入密码！", null, false, 0.2);
    } else {
      var data = {
        username: this.userinfo.userid,
        password: this.userinfo.pwd
      };
      cc.http.sendRequest("/game/user/login", data, onLogin);

      // if (com.data.isLogin == 1) {
      //   cc.director.loadScene("index");
      // }
    }
  },
  registerClick(event) {
    this.node.children[4].active = false;
  },
  settingClick(event) {
    com.data.sceneType = 0;
    cc.director.loadScene("setting");
  },
  helpClick(event) {
    com.data.sceneType = 0;
    cc.director.loadScene("help");
  },
  confirmClick(event) {
    var onRegister = function(res) {
      if (res.status == 1) {
        Alert.show("注册成功！返回登录！", null, false, 0.2);
      } else if (res.status == 0) {
        Alert.show("注册失败！账号已被使用！", null, false, 0.2);
      } else if (res.status == 2) {
        Alert.show("注册失败！服务器错误！", null, false, 0.2);
      }
    };
    if (!this.user_reinfo.userid_re) {
      Alert.show("请输入账号！", null, false, 0.2);
    } else if (this.user_reinfo.userid_re.toString().length != 8) {
      Alert.show("请输入8位账号！", null, false, 0.2);
    } else if (!this.user_reinfo.pwd_re1 || !this.user_reinfo.pwd_re2) {
      Alert.show("请输入两次密码！", null, false, 0.2);
    } else if (this.user_reinfo.pwd_re1 != this.user_reinfo.pwd_re2) {
      Alert.show("两次密码不一致！", null, false, 0.2);
    } else {
      var data = {
        username: this.user_reinfo.userid_re,
        password: this.user_reinfo.pwd_re1,
        repassword: this.user_reinfo.pwd_re2
      };
      cc.http.sendRequest("/game/user/register", data, onRegister);
    }
  },
  fanhuiClick(event) {
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
