<template>
  <header class="header">
    <div class="wrap">
      <div class="logo">Resumer</div>
      <div class="btn-group">
        <!-- 显示用户名 -->
        <span v-if="isLogined" class="username">{{ currentUser.username }}</span>

        <!-- 登陆按钮 -->
        <el-button type="primary" round @click="openLoginPop" v-if="!isLogined">登陆</el-button>
        <el-button type="primary" round @click="openRegisterPop" v-if="!isLogined">注册</el-button>

        <!-- 登陆后的按钮 -->
        <el-button type="primary" round v-if="isLogined" key="logout" @click="logOut">退出登陆</el-button>
        <el-button type="primary" round v-if="isLogined" key="save" @click="saveFormData">保存</el-button>
        <a :href="`preview.html?username=${currentUser.username}`" v-if="isLogined" target="blank">预览</a>
        <!-- 预览地址链接 -->
        <el-popover ref="shareLink"
                    placement="bottom"
                    width="300"
                    trigger="click"
                    v-if="isLogined">
          <el-form  label="80px">
            <el-form-item label="复制以下链接：">
              <el-input v-model="url" @focus="textSelected($event)"></el-input>
            </el-form-item>
          </el-form>
        </el-popover>
        <el-button type="primary" round v-if="isLogined" key="shareLink" v-popover:shareLink>分享预览</el-button>
      </div>
      <transition name="el-fade-in-linear">
        <!-- 弹出层 -->
        <div class="layer-mask" v-show="shouldShowPop">
          <div class="layer-pop">
            <el-tabs v-model="activeName">
              <!-- 登陆表单 -->
              <el-tab-pane label="登陆" name="login">
                <el-form label-width="60px"
                         class="demo-ruleForm"
                         ref="loginForm"
                         :label-position="labelPosition"
                         :model="loginData"
                         :rules="rules1">
                  <el-form-item label="账号：" prop="username">
                    <el-input v-model="loginData.username" placeholder="请输入账号"></el-input>
                  </el-form-item>
                  <el-form-item label="密码：" prop="password" auto-complete="off">
                    <el-input type="password" v-model="loginData.password" placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm', 'login')">登陆</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>

              <!-- 注册表单 -->
              <el-tab-pane label="注册" name="signup">
                <el-form label-width="60px"
                         class="demo-ruleForm"
                         ref="signupForm"
                         :label-position="labelPosition" 
                         :model="signupData"
                         :rules="rules1">
                  <el-form-item label="账号：" prop="username">
                    <el-input v-model="signupData.username" placeholder="6-8位，接受大小写字母、数字和下划线"></el-input>
                  </el-form-item>
                  <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="signupData.password" placeholder="6-8位，接受大小写字母、数字和下划线"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('signupForm', 'signup')">注册</el-button>
                    <el-button @click="resetForm('signupForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
            <!-- 关闭按钮 -->
            <i class="el-icon-circle-close" @click="closePop"></i>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import AV from 'leancloud-storage'

export default {
  data() {
    // 检查用户名的规则
    const checkUsername = (rule, value, callback) => {
      if (/^\s*$/.test(value)) {
        return callback(new Error('账号不能为空'))
      } else if (/\s+/g.test(value)) {
        return callback(new Error('账号中不能包含空字符'))
      } else if (/^\w{6,8}$/i.test(value)) {
        return callback()
      }

      return callback(new Error('账号格式出错'))

    }
    
    // 检查密码的规则
    const checkPassword = (rule, value, callback) => {
      if (/^\s*$/.test(value)) {
        return callback(new Error('密码不能为空'))
      } else if (/\s+/g.test(value)) {
        return callback(new Error('密码中不能包含空字符'))
      } else if (/^\w{6,8}$/i.test(value)) {
        return callback()
      }

      return callback(new Error('密码格式出错'))
    }

    return {
      isLogined: false,
      shouldShowPop: false,
      activeName: '',
      labelPosition: 'right',
      signupData: {
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
    // 打开登陆表单
    openLoginPop() {
      this.shouldShowPop = true
      this.activeName = 'login'
    },
    // 打开注册表单
    openRegisterPop() {
      this.shouldShowPop = true
      this.activeName = 'signup'
    },
    // 关闭弹出层
    closePop() {
      this.shouldShowPop = false
    },
    // 注册账号
    signUp() {
      const user = new AV.User()

      user.setUsername(this.signupData.username)
      user.setPassword(this.signupData.password)
      user.signUp().then(() => {
        this.loginData.username = this.signupData.username
        this.loginData.password = this.signupData.password
        this.showMessage('注册成功', 'success')

        setTimeout(() => this.logIn(true), 1000)
      }, () => this.showMessage('注册失败，网络连接出错', 'error'))
    },
    // 登陆账号
    logIn(isFirstTimeLogin) {
      AV.User.logIn(this.loginData.username, this.loginData.password).then(usermessage => {
                this.showMessage('登陆成功', 'success')

                setTimeout(() => {
                  this.closePop()
                  this.currentUser = this.getCurrentUser()
                  this.isLogined = true
                  this.setUrl()

                  if (isFirstTimeLogin) {
                    return
                  }

                  this.getFormData()
                }, 1000)
             }, () => this.showMessage('登陆失败，账号或密码错误', 'error'))
    },
    // 注销用户
    logOut() {
      AV.User.logOut()
      window.location.reload()
    },
    // 获取当前用户的信息
    getCurrentUser() {
      let {id, createdAt, attributes: {username}} = AV.User.current()
      return {id, createdAt, username, hasSavedData: false}
    },
    // 保存编辑数据
    saveFormData() {
      const Todo = AV.Object.extend('Todo')
      let data = JSON.stringify(this.$store.state.profile)
      let username = this.currentUser.username
      
      if (this.currentUser.hasSavedData) {
        const todo = AV.Object.createWithoutData('Todo', this.currentUser.todoId)

        todo.set({data})
        todo.save().then(() => this.showMessage('保存成功', 'success'), () => this.showMessage('保存失败，网络连接出错', 'error'))
      } else {
        const todo = new Todo()
        const acl = new AV.ACL()

        acl.setReadAccess(AV.User.current(), true)
        acl.setWriteAccess(AV.User.current(), true)

        todo.setACL(acl)
        todo.set({data, username})
        todo.save().then(() => {
          this.showMessage('保存成功', 'success')
          this.currentUser.hasSavedData = true
          this.currentUser.todoId = todo.id
        }, () => this.showMessage('保存失败，网络连接出错', 'error'))
      }
    },
    // 获得用户的数据
    getFormData() {
      const query = new AV.Query('Todo')

      query.find().then(todoData => {
        let data = todoData[0]

        this.currentUser.hasSavedData = todoData.length === 0 ? false : true
        this.currentUser.todoId = data.id
        this.$store.commit('CHANGE_PROFILE', JSON.parse(data.attributes.data))
      }, () => this.showMessage('获取数据失败', 'error'))
    },
    // 生成预览页面的url
    setUrl() {
      const host = window.location.host
      const path = window.location.pathname.match(/\/?[\w/]*\/{1}/)[0]
      const username = this.currentUser.username
      this.url = `${host}${path}preview.html?username=${username}`
    },
    // 自定义提示信息
    showMessage(message, type) {
      this.$message({
        message,
        type,
        duration: 1000
      })
    },
    // 选中文本
    textSelected(event) {
      event.target.select()
    },
    // 提交表单
    submitForm(formName, formType) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formType === 'login') {
            this.logIn(false)
          } else if (formType === 'signup') {
            this.signUp()
          }
        } else {
          return false
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
    
    // 按钮组
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
        margin: 0 10px;
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
    
    // 弹出层
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
        padding: 18px 18px 0 18px;
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


