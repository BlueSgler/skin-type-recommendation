<template>
    <el-row class="tac">
        <el-col>
            <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" active-text-color="#06a7ff">
                <el-menu-item :index="item.path" v-for="item in menuData" :key="item.id" @click="goto(item.path)">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.menuName }}</span>
                    </template>
                </el-menu-item>
            </el-menu>
        </el-col>

    </el-row>
</template>

<script lang="ts" setup>
import {
    Menu as IconMenu,
    Location,
    House,
    Share,
    User,
} from '@element-plus/icons-vue'
import { ref, shallowRef } from 'vue';

import router from '@/router';
const defaultActive = router.currentRoute.value.path // 获取当前路径，让menu正确显示

//菜单类型
type MenuType = {
    id: string,
    icon: any
    menuName: string
    path: string
}

const goto = (path: string) => {
    router.push(path)
}


const comId = shallowRef(Location)
//假数据，实际根据后端接口请求
const menuData: MenuType[] = [
    {
        id: '1',
        icon: House,
        menuName: '化妆品管理',
        path: '/admin/cosmetic',

    },
    {
        id: '2',
        icon: Share,
        menuName: '标签管理',
        path: '/admin/tag',
    },
    {
        id: '3',
        icon: User,
        menuName: '用户管理',
        path: '/admin/user',
    }
]

</script>

<style lang="scss" scoped>
.tac {
    width: 200px;
    background-color: #fff;
    transition: all .5s ease-in-out;

    .toggle-button {
        background-color: #fff;
        font-size: 10px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        letter-spacing: 0.2em;
        cursor: pointer;
    }

    .el-menu {
        border-right: none;
    }
}
</style>
