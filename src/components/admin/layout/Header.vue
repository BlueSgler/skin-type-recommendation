<template>
    <div class="container">
        <div class="left-box" @click="goto">
            美妆推荐后台管理
        </div>
        <div class="right-box">
            <div class="avatar">
                <img :src="userInfo.avatar" alt="">
            </div>
            <div class="name">{{ userInfo.nickname }}</div>
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
const logout = () => {
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

    .left-box {
        font-size: 22px;
        cursor: pointer;
    }

    .right-box {
        display: flex;
        align-items: center;

        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;

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