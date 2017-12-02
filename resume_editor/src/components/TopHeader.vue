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
        <el-popover ref="shareLink"
                    placement="bottom"
                    width="400"
                    trigger="click"
                    v-if="isLogined">
          <input type="text" v-model="url" @focus="textSelected($event)" autofocus>
        </el-popover>
        <el-button type="primary" round v-if="isLogined" key="shareLink" v-popover:shareLink>分享预览</el-button>
        <a :href="`preview.html?username=${currentUser.username}`" v-if="isLogined" target="blank">预览</a>
      </div>
      <transition name="el-fade-in-linear">
        <div class="layer-mask" v-show="shouldShowPop">
          <div class="layer-pop">
            <el-tabs v-model="activeName">
              <el-tab-pane label="登陆" name="login">
                <!-- <form key="login-input">
                  <div class="form-item" >
                    <label for="login-username">账号：</label>
                    <input type="text" id="login-username" placeholder="请输入账号" v-model="loginData.username">
                    <p>sss </p>
                  </div>
                  <div class="form-item">
                    <label for="login-pwd">密码：</label>
                    <input type="password" id="login-pwd" placeholder="请输入密码" v-model="loginData.password">
                    <p>saaa</p>
                  </div>
                  <el-button type="primary" @click="logIn(false)">登陆</el-button>
                  <el-button type="primary" native-type="reset">重置</el-button>
                </form> -->
                <el-form :model="loginData"
                         :label-position="labelPosition" 
                         label-width="60px"
                         class="demo-ruleForm"
                         :rules="rules1"
                         ref="loginForm">
                  <el-form-item label="账号：" prop="username">
                    <el-input v-model="loginData.username"></el-input>
                  </el-form-item>
                  <el-form-item label="密码：" prop="password" auto-complete="off">
                    <el-input type="password" v-model="loginData.password"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="注册" name="signup">
                <!-- <form  key="signup-input">
                  <div class="form-item">
                    <label for="signup-username">账号：</label>
                    <input type="text" id="signup-username" placeholder="大小写字母、数字和下划线，6-8位" v-model="formData.username">
                  </div>
                  <div class="form-item">
                    <label for="signup-pwd">密码：</label>
                    <input type="password" id="signup-pwd" placeholder="大小写字母、数字和下划线，6-8位" v-model="formData.password">
                  </div>
                  <el-button type="primary" @click="signUp">注册</el-button>
                  <el-button type="primary" native-type="reset">重置</el-button>
                </form> -->
                <el-form status-icon :label-position="labelPosition" label-width="60px">
                  <el-form-item label="账号：">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="密码：">
                    <el-input></el-input>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
            <i class="el-icon-circle-close" @click="closePop"></i>
          </div>
        </div>
      </transition>
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
    const checkUsername = (rule, value, callback) => {
      if (/^\s*$/.test(value)) {
        return callback(new Error('输入不能为空！'))
      } else if (/\s+/g.test(value)) {
        return callback(new Error('输入中不能包含空字符'))
      } else if (/^\w{6,8}$/i.test(value)) {
        alert('登陆成功')
        return callback()
      }

      return callback(new Error('输入格式出错'))

    }

    const checkPassword = (rule, value, callback) => {
      if (/^\s*$/.test(value)) {
        return callback(new Error('输入不能为空！'))
      } else if (/\s+/g.test(value)) {
        return callback(new Error('输入中不能包含空字符'))
      } else if (/^\w{6,8}$/i.test(value)) {
        alert('登陆成功')
        return callback()
      }

      return callback(new Error('输入格式出错'))
    }

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
      currentUser: null,
      url: '',
      rules1: {
        username: [{
          validator: checkUsername,
          trigger: 'blur'
        }],
        password: [{
          validator: checkPassword,
          trigger: 'blur'
        }]
      }
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
                this.setUrl()
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
      let username = this.currentUser.username
      
      if (this.currentUser.hasSavedData) {
        const todo = AV.Object.createWithoutData('Todo', this.currentUser.todoId)

        todo.set({data})
        todo.save().then(() => this.showSavedMessage('保存成功', 'success'), () => this.showSavedMessage('保存失败，网络连接出错', 'error'))
      } else {
        const todo = new Todo()
        const acl = new AV.ACL()

        acl.setReadAccess(AV.User.current(), true)
        acl.setWriteAccess(AV.User.current(), true)
        
        todo.setACL(acl)
        todo.set({data, username})
        todo.save().then(() => {
          this.showSavedMessage('保存成功', 'success')
          this.currentUser.hasSavedData = true
          this.currentUser.todoId = todo.id
        }, 
        () => this.showSavedMessage('保存失败，网络连接出错', 'error'))
      }
    },
    getFormData() {
      const query = new AV.Query('Todo')

      query.find().then(todoData => {
        console.log(todoData)
        let data = todoData[0]
        this.currentUser.hasSavedData = true
        this.currentUser.todoId = data.id
        this.$store.state.profile = JSON.parse(data.attributes.data)
      }, 
      () => console.log('获取数据失败'))
    },
    getInputData(value) {
      console.log(value.trim())
    },
    setUrl() {
      const host = window.location.host
      const username = this.currentUser.username
      this.url = `${host}/preview.html?username=${username}`
    },
    showSavedMessage(message, type) {
      this.$message({
        message: message,
        type: type,
        duration: 1000
      })
    },
    textSelected(event) {
      console.log(arguments)
      event.target.select()
    },
   submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.logIn(false)
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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

      a {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin-left: 10px;
        transition: .1s;
        border-radius: 20px;
        padding: 12px 23px;
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF;

        &:hover {
          background: #66b1ff;
          border-color: #66b1ff;
        }
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

        i {
          position: absolute;
          top: 12px;
          right: 12px;
          cursor: pointer;
        }
      }
    }
  }

}
</style>


