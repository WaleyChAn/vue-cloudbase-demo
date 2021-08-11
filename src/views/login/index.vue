<template>
  <div class="tbox-login"
       :class="loginType">
    <div class="login-content">
      <div class="login-title">
        <dl>
          <dt>{{ isSignup ? '注册账号' : '简单登录页' }}</dt>
          <dd>暂时只有邮箱账号，以后在做别的账号</dd>
        </dl>
      </div>
      <div class="login-form">
        <a-form-model ref="loginForm"
                      :model="form"
                      :rules="rules">
          <a-form-model-item prop="email">
            <a-input v-model="form.email"
                     placeholder="邮箱"
                     size="large">
              <a-icon slot="prefix"
                      type="mail" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input-password v-model="form.password"
                              placeholder="密码"
                              size="large"
                              autocomplete="new-password">
              <a-icon slot="prefix"
                      type="lock" />
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item v-if="isSignup"
                             prop="confirm">
            <a-input-password v-model="form.confirm"
                              placeholder="确认密码"
                              size="large"
                              autocomplete="new-password">
              <a-icon slot="prefix"
                      type="lock" />
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item class="login-link">
            <a class="login-link-item"
               @click="handleSignup">
              <a-icon :type="isSignup ? 'login': 'user-add'" />
              <span>{{ isSignup ? '登录已有账号' : '注册账号' }}</span>
            </a>
            <a class="login-link-item"
               v-if="!isSignup"
               @click="handleForget">
              <a-icon type="question-circle" />
              <span>忘记密码</span>
            </a>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary"
                      @click="onSubmit"
                      :loading="loading"
                      size="large">{{ isSignup ? '注 册' : '登 录' }}</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TboxLogin',
  components: {

  },
  data () {
    return {
      cloudbaseAuth: this.$store.state.cloudbaseAuth,
      loginParams: this.$route.params || null,
      loading: false,
      form: {
        email: '',
        password: '',
        confirm: ''
      },
      rules: {

      },
      isSignup: false,
      loginType: '',
      timer: null
    }
  },
  computed: {
    loginDisable () {
      let isDisable = this.form.email === '' || this.form.password === ''
      return isDisable
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {

  },
  methods: {
    onSubmit () {
      let _this = this
      _this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (_this.isSignup) {
            _this.signup()
          } else {
            _this.login()
          }
        } else {
          _this.$message.error('账号密码再想想？')
          return false
        }
      })
    },
    login () {
      let _this = this
      _this.cloudbaseAuth
        .signInWithEmailAndPassword(_this.form.email, _this.form.password)
        .then((res) => {
          _this.$message.success('登录成功！')
          let nextPath = '/'
          if (_this.loginParams) {
            nextPath = _this.loginParams.to.path
          }
          _this.$router.push(nextPath)
          _this.loading = false
        })
        .catch((err) => {
          if (err && err.message) {
            let errinfo = JSON.parse(err.message)
            let errmsg = errinfo.msg.split('] ')[2]
            _this.$message.error(errmsg)
          }
          _this.loading = false
        })
    },
    signup () {
      let _this = this
      _this.cloudbaseAuth
        .signUpWithEmailAndPassword(_this.form.email, _this.form.password)
        .then((res) => {
          _this.$message.success('已发送激活邮件，邮件有效时间为1小时，请尽快前往邮箱激活！')
          _this.loading = false
        })
        .catch((err) => {
          if (err && err.message) {
            let errinfo = JSON.parse(err.message)
            let errmsg = errinfo.msg.split('] ')[2]
            _this.$message.error(errmsg)
          }
          _this.loading = false
        })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    },
    handleSignup () {
      let _this = this
      _this.loginType = 'signup'
      for (let key in _this.form) {
        _this.form[key] = ''
      }
      _this.timer = setTimeout(() => {
        _this.loginType = ''
        _this.isSignup = !_this.isSignup
      }, 300)
    },
    handleForget () {
      let _this = this
      _this.$confirm({
        title: '忘记密码？',
        content: '还没来得及做...',
        okText: '行吧',
        cancelText: '取消'
      })
    }
  }
}
</script>
