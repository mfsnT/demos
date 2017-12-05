<template>
  <section class="preview">
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
  </section>
</template>

<script>

export default {
  computed: {
    profile() {
      return this.$store.getters.getProfile
    }
  }
}
</script>

<style lang="less">
.preview {
  width: 740px;
  overflow: auto;

  li,
  p {
    white-space: pre-line;
    word-break: break-all;
  }
}
</style>