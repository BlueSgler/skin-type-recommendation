<template>
    <div class="container" @click="goto">
        <div class="left-box">
            <span>首页</span>
        </div>
        <div class="right-box">
            <div class="avatar">
                <img :src="userInfo.avatar" alt="" @click="goToMy">
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
const goto = () => {
    router.push('/home')
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