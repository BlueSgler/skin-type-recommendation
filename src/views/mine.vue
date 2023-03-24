<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <UserInfo></UserInfo>
      </el-main>
    </el-container>
    <footer></footer>
  </div>
</template>

<script setup lang='ts'>
import Header from '@/components/home/layout/Header.vue'
import UserInfo from '@/components/home/mine/UserInfo.vue'

</script>

<style lang='scss' scoped>
.common-layout {
  min-height: 100vh;
  position: relative;

  .el-header {
    background-color: #f9c8c4;
  }

  footer {
    position: absolute;
    width: 100%;
    height: 120px;
    background-color: #f8d7d4;
    bottom: 0;

  }

}
</style>