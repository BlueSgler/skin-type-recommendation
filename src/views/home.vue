<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>


<script setup lang='ts'>
import Header from '../components/home/layout/Header.vue'
</script>

<style lang='scss' scoped>
.common-layout {
    min-height: 100vh;
    background-color: pink;

    // .el-container {
    //     min-width: 100vh;
    //     background-color: pink;
    // }
}
</style>