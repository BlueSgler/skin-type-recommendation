<template>
    <el-row class="tac">
        <el-col>
            <el-menu :default-active="activePath" class="el-menu-vertical-demo" active-text-color="#06a7ff">
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
import { useRouter } from 'vue-router';
// import {
//     getUserInfoApi
// } from '@/apis/mine'
const router = useRouter()




//菜单类型
type MenuType = {
    id: string,
    icon: any
    menuName: string
    path: string
}

//激活路径
let activePath = ref<string | null>('')
const goto = (path: string) => {
    saveNavState(path)
    router.push(path)
}

const initPath = () => {
    //从本地获取激活状态

    if (window.sessionStorage.getItem('activePath') === null) {
        activePath.value = '/admin/cosmetic'
    } else {

        activePath.value = window.sessionStorage.getItem('activePath')
        console.log('jererj', activePath.value);
    }
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



// 保存激活路径到本地
const saveNavState = (activePath: string | null) => {
    window.sessionStorage.setItem('activePath', activePath as string)
}
initPath()
// getRole()

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
