<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <Main></Main>
            </el-main>
        </el-container>
    </div>
</template>


<script setup lang='ts'>
import Header from '@/components/home/layout/Header.vue'
import Main from '@/components/home/layout/Main.vue'
</script>

<style lang='scss' scoped>
.common-layout {
    min-height: 100vh;

    .el-header {
        background-color: #f9c8c4;
    }
}
</style>