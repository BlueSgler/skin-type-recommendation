<script setup lang="ts">
console.log(import.meta.env, '======>env')
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}

/* 去除input的轮廓 */
input {
  outline: none;
}
</style>
