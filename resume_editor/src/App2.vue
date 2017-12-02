<template>
  <div id="preview-page">
    {{ profile.personalInformation.birthday }}
  </div>
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
  name: 'app2',
  data() {
    return {
      profile: null
    }
  },
  created() {
    const query = new AV.Query('Todo')
    const queryStr = window.location.search
    let index = queryStr.indexOf('=')
    const username = queryStr.substr(index + 1)
    query.contains('username', username)
    query.find().then(todoData => {
      let data = todoData[0]
      console.log(data)
      this.profile = JSON.parse(data.attributes.data)
      console.log(this.profile)
    }, err => console.log(err))
  }
}
</script>

<style lang="less">

</style>

