<template>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <Menu></Menu>
            </el-aside>
            <el-main>
                <Main></Main>
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts" setup>
import Menu from '../components/admin/layout/Menu.vue'
import Main from '../components/admin/layout/Main.vue'
import Header from '../components/admin/layout/Header.vue'
</script>
<style lang="scss" scoped>
.el-header {
    box-shadow: inset 0px -1px 7px -3px rgb(168, 168, 168);
}

.el-container {


    .el-aside {
        height: calc(100vh - 60px);
    }

    .el-main {
        // box-shadow: 1px 2px 3px 4px #bdbdbd;
        // width: 100%;
        overflow-y: visible;
        border-left: 1px solid #e5e5e5;
    }
}
</style>