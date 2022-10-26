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
          <div class="login_title">{{ $t('忘记密码') }}</div>
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
                  v-model="emailCode"
                  :placeholder="$t('请输入邮箱验证码')"
                  class="input"
                ></el-input>
                <img class="codeImg" src="../assets/images/code.png" alt="code" />
                <span
                  v-if="!countdown"
                  class="verification sendOut border-radius"
                  @click="getCode()"
                  >{{ $t('发送') }}</span
                >
                <span v-if="countdown" class="verification sendOut border-radius"
                  >{{ count }}s</span
                >
                <div>
                  <el-input
                    v-model="newPassword"
                    :placeholder="$t('请输入新密码')"
                    class="input"
                  ></el-input>
                  <img
                    class="passwordImg"
                    src="../assets/images/password.png"
                    alt="password"
                  />
                </div>
              </div>
              <h1 class="returnLogin">
                <router-link to="/login">{{ $t('返回登录') }}</router-link>
              </h1>
              <div style="text-align:center;" class="marginTopThirty">
                <el-button
                  id="#mouse"
                  class="login_btn"
                  type="button"
                  @click="forgotPassword()"
                  :loading="$store.state.btn_loading"
                >
                  {{ $t('确定') }}
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

export default {
  name: 'Login',
  components: { Copyright },
  data() {
    return {
      email: '',
      emailCode: '',
      newPassword: '',
      countdown: false, // 倒计时
      count: '',
      timer: null
    }
  },
  mounted() {},
  methods: {
    // 获取验证码
    getCode() {
      const TIME_COUNT = 60
      if (this.email === '') {
        this.$notify({
          title: this.$t('操作失败'),
          message: this.$t('EMAIL不能为空'),
          type: 'warning'
        })
      } else {
        if (!this.timer) {
          this.count = TIME_COUNT
          this.countdown = true
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.countdown = false
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
          this.$http
            .get('api/shop/staff/reset_password', {
              params: {
                email: this.email
              }
            })
            .then(res => {
              if (res.ret) {
                this.$notify({
                  title: this.$t('成功'),
                  message: res.msg,
                  type: 'success'
                })
              }
            })
        }
      }
    },
    forgotPassword() {
      if (this.email === '') {
        this.$notify({
          title: this.$t('操作失败'),
          message: this.$t('EMAIL不能为空'),
          type: 'warning'
        })
      } else if (this.emailCode === '') {
        this.$notify({
          title: this.$t('操作失败'),
          message: this.$t('邮箱验证码不能为空'),
          type: 'warning'
        })
      } else if (this.newPassword === '') {
        this.$notify({
          title: this.$t('操作失败'),
          message: this.$t('新密码不能为空'),
          type: 'warning'
        })
      } else {
        this.$http
          .post('api/shop/staff/reset_password', {
            email: this.email,
            email_code: this.emailCode,
            password: this.newPassword
          })
          .then(res => {
            if (res.ret === 1) {
              this.$notify({
                title: this.$t('成功'),
                message: res.msg,
                type: 'success'
              })
            }
          })
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
.returnLogin {
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
  a {
    color: #333;
  }
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
    width: 20.5px;
    position: absolute;
    left: 47px;
    top: 198px;
  }
  .codeImg {
    width: 20px;
    position: absolute;
    left: 47px;
    top: 138px;
  }
  .verification {
    position: absolute;
    display: inline-block;
    font-size: 12px;
    top: 139px;
    border: 1px solid rgba(121, 121, 121, 1);
    padding: 3px 5px;
  }
  .verification:hover {
    cursor: pointer;
  }
  .sendOut {
    left: 318px;
  }
  .sendOutTime {
    left: 410px;
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
