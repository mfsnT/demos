<template>
  <div id="app">
    <TopHeader></TopHeader>
    <main id="main">
      <div class="wrap">
        <Editor></Editor>
        <Preview></Preview>
      </div>
    </main>
    <router-view/>
  </div>
</template>

<script>
import Editor from './components/editor.vue'
import TopHeader from './components/TopHeader.vue'
import Preview from './components/Preview.vue'

export default {
  name: 'app',
  components: {
    TopHeader,
    Editor,
    Preview
  }
}
</script>

<style lang="less">
#main {
  height: calc(~"100vh - 80px");

  .wrap {
    display: flex;

    section {
      height: 100%;
      background-color: #fff;
    }
  }
}
</style>

