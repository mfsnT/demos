<template>
  <header class="header">
    <div class="wrap">
      <div class="logo">Resumer</div>
      <div class="btn-group">
        <span v-if="isLogined" class="username">{{ currentUser.username }}</span>
        <el-button type="primary" round @click="openLoginPop" v-if="!isLogined">登陆</el-button>
        <el-button type="primary" round @click="openRegisterPop" v-if="!isLogined">注册</el-button>
        <el-button type="primary" round v-if="isLogined" key="logout" @click="logOut">退出登陆</el-button>
        <el-button type="primary" round v-if="isLogined" key="save" @click="saveFormData">保存</el-button>
        <el-button type="primary" round>预览</el-button>
      </div>
      <div class="layer-mask" v-show="shouldShowPop">
        <div class="layer-pop">
          <el-tabs v-model="activeName">
            <el-tab-pane label="登陆" name="login">
              <form key="login-input">
                <div class="form-item" >
                  <label for="login-username">账号：</label>
                  <input type="text" id="login-username" v-model="loginData.username">
                </div>
                <div class="form-item">
                  <label for="login-pwd">密码：</label>
                  <input type="password" id="login-pwd" v-model="loginData.password">
                </div>
                <el-button type="primary" @click="logIn(false)">登陆</el-button>
                <el-button type="primary" native-type="reset">重置</el-button>
              </form>
            </el-tab-pane>
            <el-tab-pane label="注册" name="signup">
              <form  key="signup-input">
                <div class="form-item">
                  <label for="signup-username">账号：</label>
                  <input type="text" id="signup-username" v-model="formData.username">
                </div>
                <div class="form-item">
                  <label for="signup-pwd">密码：</label>
                  <input type="password" id="signup-pwd" v-model="formData.password">
                </div>
                <el-button type="primary" @click="signUp">注册</el-button>
                <el-button type="primary" native-type="reset">重置</el-button>
              </form>
            </el-tab-pane>
          </el-tabs>
          <i class="el-icon-circle-close" @click="closePop"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import AV from 'leancloud-storage'

const APP_ID = 'mvEzkoDQA3TSp6uTIbz81Mk0-gzGzoHsz'
const APP_KEY = 'hV7aJ6xx0vtOh9FIvc3e8eei'

AV.init({
  appId: APP_ID, 
  appKey: APP_KEY
})

export default {
  data() {
    return {
      isLogined: false,
      shouldShowPop: false,
      activeName: '',
      labelPosition: 'right',
      formData: {
        username: '',
        password: ''
      },
      loginData: {
        username: '',
        password: ''
      },
      currentUser: null
    }
  },
  methods: {
    openLoginPop() {
      this.shouldShowPop = true
      this.activeName = 'login'
    },
    openRegisterPop() {
      this.shouldShowPop = true
      this.activeName = 'signup'
    },
    closePop() {
      this.shouldShowPop = false
    },
    signUp() {
      const user = new AV.User()

      user.setUsername(this.formData.username)
      user.setPassword(this.formData.password)
      user.signUp().then(() => {
        this.loginData.username = this.formData.username
        this.loginData.password = this.formData.password
        this.logIn(true)
      })
    },
    logIn(isFirstTimeLogin) {
      AV.User.logIn(this.loginData.username, this.loginData.password).then(usermessage => {
                this.closePop()
                this.currentUser = this.getCurrentUser()
                this.isLogined = true

                if (isFirstTimeLogin) {
                  return
                }

                this.getFormData()
             },
             error => console.log(error))
    },
    logOut() {
      AV.User.logOut()
      this.currentUser = null
      window.location.reload()
    },
    getCurrentUser() {
      let {id, createdAt, attributes: {username}} = AV.User.current()
      return {id, createdAt, username, hasSavedData: false}
    },
    saveFormData() {
      const Todo = AV.Object.extend('Todo')
      let data = JSON.stringify(this.$store.state.profile)
      let id = this.currentUser.id
      
      if (this.currentUser.hasSavedData) {
        const todo = AV.Object.createWithoutData('Todo', this.currentUser.todoId)

        todo.set('content', {data})
        todo.save().then(() => console.log('ok'), (meg) => console.log(meg))
      } else {
        const todo = new Todo()
        const acl = new AV.ACL()

        acl.setReadAccess(AV.User.current(), true)
        acl.setWriteAccess(AV.User.current(), true)
        
        todo.setACL(acl)
        todo.set('content', {data})
        todo.set('id', id)
        todo.save().then(() => {
          console.log('save')
          this.currentUser.hasSavedData = true
          this.currentUser.todoId = todo.id
        }, 
        (msg) => console.log(msg))
      }
    },
    getFormData() {
      const query = new AV.Query('Todo')
      
      query.contains('id', this.currentUser.id)
      query.find().then(todoData => {
        console.log(todoData)
        let data = todoData[0]
        this.currentUser.hasSavedData = true
        this.currentUser.todoId = data.id
        this.$store.state.profile = JSON.parse(data.attributes.content.data)
      }, 
      () => console.log('获取数据失败'))

      
    }
  }
}
</script>

<style lang="less">
.header {
  min-width: 1200px;
  height: 60px;
  box-shadow: 0 0 5px #666;
  margin-bottom: 10px;
  background-color: #fff;

  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      font-weight: bold;
      font-size: 28px;
      color: #409EFF;
      letter-spacing: 1px;
    }

    .btn-group {
      .username {
        margin-right: 18px;
      }
    }

    .layer-mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, .5);
      z-index: 2;

      .layer-pop {
        width: 400px;
        padding: 18px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        form {
          text-align: center;
          margin-top: 12px;

          .form-item {
            text-align: left;
            margin-bottom: 22px;
            display: flex;

            label {
              display: block;
              width: 70px;
              text-align: right;
              vertical-align: middle;
              font-size: 14px;
              color: #5a5e66;
              line-height: 40px;
              padding: 0 12px 0 0;
              box-sizing: border-box;
            }

            input {
              flex: 1;
              -webkit-appearance: none;
              background-color: #fff;
              background-image: none;
              border-radius: 4px;
              border: 1px solid #d8dce5;
              box-sizing: border-box;
              color: #5a5e66;
              display: inline-block;
              font-size: inherit;
              height: 40px;
              line-height: 1;
              outline: 0;
              padding: 0 15px;
              transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            }
          }
        }
      }

        i {
          position: absolute;
          top: 12px;
          right: 12px;
          cursor: pointer;
        }
    }
  }

}
</style>


