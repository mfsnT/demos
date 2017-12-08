<template>
  <div id="preview-page" class="preview">
    <!-- 个人信息 -->
    <div class="preview-personalInformation">
      <p>姓名：{{ profile.personalInformation.name }}</p>
      <p>出生日期：{{ profile.personalInformation.birthday }}</p>
      <p>性别：{{ profile.personalInformation.sex }}</p>
      <p>目前状态：{{ profile.personalInformation.currentStatus }}</p>
      <p>工作年限：{{ profile.personalInformation.workingYears }}</p>
      <p>所在城市：{{ profile.personalInformation.liveCity }}</p>
      <p>期望城市：{{ profile.personalInformation.expectCity }}</p>
      <p>期望职位：{{ profile.personalInformation.expectPosition }}</p>
    </div>

    <!-- 工作情况 -->
    <div class="preview-work" v-if="profile.work.length > 0">
      <h2>工作经历</h2>
      <ul v-for="item in profile.work">
        <li>时间：{{ item.time }}</li>
        <li>公司：{{ item.company }}</li>
        <li>项目描述：{{ item.project }}</li>
      </ul>
    </div>

    <!-- 教育情况 -->
    <div class="preview-education" v-if="profile.education.length > 0">
      <h2>教育情况</h2>
      <ul v-for="item in profile.education">
        <li>时间：{{ item.time }}</li>
        <li>学校：{{ item.school }}</li>
        <li>学习情况：{{ item.situation }}</li>
      </ul>
    </div>

    <!-- 爱好 -->
    <div class="preview-hobbies" v-if="profile.hobbies.length > 0">
      <h2>爱好</h2>
      <ul>
        <li v-for="item in profile.hobbies">{{ item.hobby }}</li>
      </ul>
    </div>

    <!-- 获奖情况 -->
    <div class="preview-prize"  v-if="profile.prize.length > 0">
      <h2>获奖情况</h2>
      <ul v-for="item in profile.prize">
        <li>获奖名：{{ item.name }}</li>
        <li>获奖描述：{{ item.description }}</li>
      </ul>
    </div>

    <!-- 联系方式 -->
    <div class="preview-contact">
      <ul>
        <li>手机：{{ profile.contact.phone }}</li>
        <li>邮箱：{{ profile.contact.email }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import AV from 'leancloud-storage'

export default {
  name: 'app2',
  // 获取用户数据
  created() {
    const query = new AV.Query('Todo')
    const queryStr = window.location.search
    const index = queryStr.indexOf('=')
    const username = queryStr.substr(index + 1)

    query.contains('username', username)
    query.find().then(todoData => {
      if (todoData.length === 0) {
        return
      }

      let data = todoData[0]
      this.$store.commit('CHANGE_PROFILE', JSON.parse(data.attributes.data))
    }, err => console.log(err))
  },
  computed: {
    profile() {
      return this.$store.getters.getProfile
    }
  }
}
</script>

<style lang="less">
#preview-page {
  background-color: #fff;
  width: 1000px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 0 12px;
}
</style>

