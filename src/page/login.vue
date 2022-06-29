<template>
  <div class="login_main">
    <div class="top">
      <img
        src="../assets/images/logo.png"
        alt="logo-top-login"
        width="280px"
        height="60px;"
      />
    </div>
    <div class="main">
      <div class="login_box">
        <img src="../assets/images/login_logo.png" alt="logo" class="login-logo" />

        <div class="login_subbox">
          <div class="login_title">{{ $t('收银管理系统') }}</div>
          <div class="login_border">
            <div class=" login_title_back"></div>
            <div class="paddingTwenty">
              <div>
                <el-input
                  v-model="email"
                  :placeholder="$t('请输入邮箱')"
                  class="input"
                ></el-input>
                <img class="userImg" src="../assets/images/user.png" alt="user" />
              </div>
              <div>
                <el-input
                  v-model="password"
                  :placeholder="$t('请输入密码')"
                  class="input"
                ></el-input>
                <img
                  class="passwordImg"
                  src="../assets/images/password.png"
                  alt="password"
                />
                <div>
                  <el-input
                    v-model="code"
                    :placeholder="$t('请输入验证码')"
                    class="input"
                    style="width: 50%;"
                  ></el-input>
                  <img class="codeImg" src="../assets/images/code.png" alt="code" />
                  <span class="codeNumber forgetPsd">wxmf</span>
                </div>
              </div>
              <div class="marginTopTen">
                <el-checkbox v-model="keep"></el-checkbox>&nbsp;&nbsp;{{
                  $t('保留登录记录')
                }}
                <router-link class="forgetPsd" to="/forgotPassword">{{
                  $t('忘记密码')
                }}</router-link>
              </div>
              <div style="text-align:center;" class="marginTopThirty">
                <el-button
                  id="#mouse"
                  class="login_btn"
                  type="button"
                  @click="login"
                  :loading="$store.state.btn_loading"
                >
                  {{ $t('登录') }}
                </el-button>
              </div>
              <div style="text-align:center;" class="paddingTopTwenty"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <copyright style="border:none; background: none"></copyright>
    </div>
  </div>
</template>
<script>
import Copyright from '../components/copyright.vue'
import { NLE } from '../lib/constant/constant'
export default {
  name: 'Login',
  components: { Copyright },
  data() {
    return {
      email: '',
      password: '',
      code: '',
      keep: false
    }
  },
  mounted() {
    this.email = localStorage.getItem(NLE.EMAIL)
    this.password = localStorage.getItem(NLE.PASSWORD)
    if (!this.email || !this.password) {
      this.email = ''
      this.password = ''
    } else {
      this.keep = true
    }
  },
  methods: {
    login() {
      if (this.keep) {
        localStorage.setItem(NLE.EMAIL, this.email)
        localStorage.setItem(NLE.PASSWORD, this.password)
        // localStorage.setItem(
        //   'TOKEN',
        //   '262181e7e5f1182323f5846ce8b8ef53f20cbc5174d24f1b0244b31de7c9f847904544'
        // )
      } else {
        localStorage.setItem(NLE.EMAIL, '')
        localStorage.setItem(NLE.PASSWORD, '')
      }
      if (this.email === '') {
        this.$notify({
          title: this.$t('操作失败'),
          message: this.$t('EMAIL不能为空'),
          type: 'warning'
        })
      } else if (this.password === '') {
        this.$notify({
          title: this.$t('操作失败'),
          message: this.$t('密码不能为空'),
          type: 'warning'
        })
      } else if (this.code === '') {
        this.$notify({
          title: this.$t('操作失败'),
          message: this.$t('验证码不能为空'),
          type: 'warning'
        })
      } else {
        // this.$http
        //   .post('user/login', {
        //     userName: this.email,
        //     password: this.password
        //   })
        //   .then(res => {
        //     console.log(res)
        //     if (res.ret) {
        //       this.$notify({
        //         type: 'success',
        //         title: this.$t('success'),
        //         message: this.$t('LoginSuccessful')
        //       })
        //       this.$store.commit('token/saveToken', { token: res.data.token })
        //       this.$router.push('/')
        //     } else {
        //       this.$message({
        //         message: res.msg,
        //         type: 'error'
        //       })
        //     }
        //   })
        this.$router.push('/')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-input__inner {
  height: 40px;
  padding: 0 35px;
}
.fontSizeTwelve {
  font-size: 12px;
}
.marginTopTen {
  margin-top: 10px;
}
.marginTopThirty {
  margin-top: 30px;
}
.paddingTwenty {
  padding: 20px 40px;
}
.paddingTopTwenty {
  padding-top: 20px;
}

.login_main {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  overflow-x: hidden;
  .top {
    height: 80px;
    width: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    z-index: 30;
    img {
      margin-top: 10px;
      margin-left: 6%;
    }
  }
  .main {
    width: 800px;
    height: 400px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 5px rgba(102, 118, 174, 0.2);
  }
  .bottom {
    width: 100%;
    background-color: #f4f4f4 !important;
    position: absolute;
    bottom: 0;
  }
  .login-logo {
    // max-width: 1000px;
    width: 400px;
    height: 400px;
    // background: url('../assets/images/login_logo.png') no-repeat;
    // background-size: cover;
  }
}

.login_box {
  background-color: #f9f9f9;
  position: relative;
}
.login_subbox {
  display: inline-block;
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  resize: both;
  .login_title {
    text-align: center;
    font-size: 28px;
    font-weight: 400;
    color: #43495f;
  }
}
.login_border {
  margin: auto;
  resize: both;
  margin-top: 10px;
  .userImg {
    width: 20px;
    position: absolute;
    left: 47px;
    top: 79px;
  }
  .passwordImg {
    width: 18.5px;
    position: absolute;
    left: 47px;
    top: 138px;
  }
  .codeImg {
    width: 20px;
    position: absolute;
    left: 47px;
    top: 198px;
  }
  .codeNumber {
    width: 45%;
    height: 40px;
    margin-top: 10px;
    background: #d7d7d7;
    text-align: center;
    line-height: 40px;
    letter-spacing: 15px;
    font-size: 17px;
    font-style: italic;
    cursor: pointer;
  }
}
.login_border .input {
  margin: 10px 0;
  border-radius: 0px;
  outline: none;
  width: 320px;
}
.login_border .input:focus {
  outline: none;
  background-image: linear-gradient(#62a8ea, #62a8ea), linear-gradient(#e4eaec, #e4eaec);
  background-image: -ms-linear-gradient(#62a8ea, #62a8ea),
    -ms-linear-gradient(#e4eaec, #e4eaec);
  border: 0 none;
  border-radius: 0;
  box-shadow: none;
  float: none;
  background-size: 100% 2px, 100% 1px;
  outline: 0 none;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  -ms-transition-duration: 0.3s;
  transition-duration: 0.3s;
}
.login_btn {
  height: 42px;
  width: 100%;
  background-color: #43495f;
  color: #fff;
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 16px;
  cursor: pointer;
}
.login_text-color {
  color: #757575;
  font-weight: 200;
  font-size: 14px;
}
.forgetPsd {
  float: right;
  color: #333;
}
//  @media only screen and (max-width: 1440px) {
//     .main {
//       width: 1100px!important;
//       .login-logo {
//         margin-left: -165px;
//         max-width: 75%;
//         height: 575px;
//       }
//     }
//     .login_subbox {
//       margin-left: 20px;
//     }
//   }
// @media screen and (max-width: 1440px) {
//   .login_main {
//     .main {
//       width: 1000px;
//       height: 450px;
//       .login-logo {
//         width: 400px;
//         height: 450px;
//         // background: url('../assets/images/xiao.png') no-repeat;
//       }
//     }
//   }
// }
</style>
