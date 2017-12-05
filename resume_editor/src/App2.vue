<template>
  <div id="preview-page">
    <div class="preview-personalInformation">
      <h2>{{ profile.personalInformation.name }}</h2>
      <p>{{ profile.personalInformation.birthday }}</p>
      <p>{{ profile.personalInformation.sex }}</p>
      <p>{{ profile.personalInformation.currentStatus }}</p>
      <p>{{ profile.personalInformation.workingYears }}</p>
      <p>{{ profile.personalInformation.liveCity }}</p>
      <p>{{ profile.personalInformation.expectCity }}</p>
      <p>{{ profile.personalInformation.expectPosition }}</p>
    </div>
    <div class="preview-work">
      <ul v-for="item in profile.work">
        <li>{{ item.time }}</li>
        <li>{{ item.project }}</li>
      </ul>
    </div>
    <div class="preview-education">
      <ul v-for="item in profile.education">
        <li>{{ item.time }}</li>
        <li>{{ item.situation }}</li>
      </ul>
    </div>
    <div class="preview-hobbies">
      <ul>
        <li v-for="item in profile.hobbies">{{ item.hobby }}</li>
      </ul>
    </div>
    <div class="preview-prize">
      <ul v-for="item in profile.prize">
        <li>{{ item.name }}</li>
        <li>{{ item.description }}</li>
      </ul>
    </div>
    <div class="preview-contact">
      <ul>
        <li>{{ profile.contact.phone }}</li>
        <li>{{ profile.contact.email }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import AV from 'leancloud-storage'

export default {
  name: 'app2',
  created() {
    const query = new AV.Query('Todo')
    const queryStr = window.location.search
    let index = queryStr.indexOf('=')
    const username = queryStr.substr(index + 1)
    query.contains('username', username)
    query.find().then(todoData => {
      if (todoData.length === 0) {
        return
      }

      let data = todoData[0]
      this.$store.commit('CHANGE_PROFILE', JSON.parse(data.attributes.data))
      console.log(this.$store.state.profile)
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
  height: 100vh;
  overflow: auto;

  li,
  p {
    white-space: pre-line;
    word-break: break-all;
  }
}
</style>

