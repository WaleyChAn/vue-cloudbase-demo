<template>
  <div class="">
    <a-button type="primary"
              @click="logout()"
              size="large">注销</a-button>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'

export default {
  name: 'TboxHome',
  components: {

  },
  data () {
    return {
      cloudbaseAuth: this.$store.state.cloudbaseAuth
    }
  },
  methods: {
    goto (url) {
      if (url) {
        this.$router.push(url)
      }
    },
    logout () {
      let _this = this
      _this.$confirm({
        title: '确定注销吗？',
        content: '没啥，退出了可以重新登录',
        okText: '确定',
        cancelText: '取消',
        onOk () {
          return new Promise((resolve, reject) => {
            _this.cloudbaseAuth
              .signOut()
              .then((res) => {
                resolve()
                _this.$router.go(0)
              })
              .catch((err) => {
                if (err && err.message) {
                  let errinfo = JSON.parse(err.message)
                  let errmsg = errinfo.msg.split('] ')[2]
                  message.error(errmsg)
                }
              })
          }).catch(() => console.log('有点问题了...'))
        },
        onCancel () { }
      })
    }
  }
}
</script>
