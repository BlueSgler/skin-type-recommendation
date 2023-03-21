<template>
  <div class="container">
    <div class="main">
      <Title></Title>
      <Content></Content>
    </div>
  </div>
</template>

<script setup lang='ts'>
import Title from '../components/navigation/Title.vue'
import Content from '../components/navigation/Content.vue'


</script>

<style lang='scss' scoped>
.container {
  background: url('../assets/img/bg.jpg') no-repeat;
  background-size: contain;
  min-height: 100vh;

  .main {
    background-color: #fff;
    margin: 100px 300px;
    padding-bottom: 100px;
  }
}
</style>