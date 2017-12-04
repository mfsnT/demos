<template>
  <div id="preview-page">
    {{ profile.personalInformation.birthday }}
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

</style>

