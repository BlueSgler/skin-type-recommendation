<template>
    <div class="container">
        <div class="left-box">
            <span class="common" @click="goto('/home')">首页</span>
            <span class="common" v-if="userInfo.identity === 1" @click="goto('/admin')">管理</span>
        </div>
        <div class="right-box">
            <div class="avatar" @click="goToMy">
                <img :src="userInfo.avatar" alt="">
            </div>
            <div class="logout" @click="logout">退出</div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import router from '../../../router';
import { storeToRefs } from 'pinia'
import { useStore } from '../../../stores/user'
const store = useStore();
let { userInfo, token } = storeToRefs(store);
const goToMy = () => {
    router.push('/mine')
}
const logout = () => {
    console.log('logout');
    router.push('/login')
    sessionStorage.setItem('token', '')
    token.value = ''

}
const goto = (url: string) => {
    router.push(url)
}
</script>

<style lang='scss' scoped>
.container {
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-weight: bold;


    .left-box {
        // font-size: 22px;
        cursor: pointer;

        .common {
            margin-right: 10px;
        }
    }

    .right-box {
        display: flex;
        align-items: center;

        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid #fff;
            overflow: hidden;
            cursor: pointer;

            img {
                width: 100%;
            }
        }

        .name,
        .avatar {
            margin-right: 10px;
        }

        .logout {
            cursor: pointer;
        }
    }

}
</style>