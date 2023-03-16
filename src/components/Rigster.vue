
<template>
    <!-- 注册盒子 -->

    <div class="register-form">
        <!-- 标题盒子 -->
        <div class="title-box">
            <h1>注册</h1>
        </div>
        <!-- 输入框盒子 -->
        <el-form ref="registerFormRef" :model="registerForm" :rules="rules" label-with="5px">
            <el-form-item prop="username" label=" ">
                <el-input type="text" placeholder="邮箱" :suffix-icon="Message" v-model="registerForm.username" />
            </el-form-item>
            <el-form-item prop="nickname" label=" ">
                <el-input type="text" placeholder="昵称" :suffix-icon="User" v-model="registerForm.nickname" />
            </el-form-item>
            <el-form-item prop="gengder" label=" " class="gender" style="position:relative;height: 30px;">
                <div class="title"
                    style="position:absolute;z-index: 2;color: black; top:11px; left:10px; font-size: 14px; color:#a8abb2;margin-right: 20px;">
                    性别</div>
                <el-radio-group v-model="registerForm.gender" class="margin">
                    <el-radio :label="0" size="large">女</el-radio>
                    <el-radio :label="1" size="large">男</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item prop="password" label=" ">
                <el-input type="password" placeholder="密码" :suffix-icon="Lock" v-model="registerForm.password" />
            </el-form-item>
            <el-form-item prop="confirmPassword" label=" ">
                <el-input type="password" placeholder="确认密码" :suffix-icon="Lock" v-model="registerForm.confirmPassword" />
            </el-form-item>
            <el-form-item prop="verifyCode" label=" ">
                <el-input type="text" placeholder="验证码" v-model="registerForm.code" class="imgcode">
                    <template #append>
                        <img :src="imageCode" class="img" alt="" @click="doGetImgeCode">
                    </template>
                </el-input>

            </el-form-item>
            <el-form-item prop="verifyCode" label=" ">
                <el-input type="text" placeholder="邮箱验证码" v-model="registerForm.verifyCode" class="input-with-select">
                    <template #append>
                        <div @click="doSentCode">发送</div>
                    </template>
                </el-input>

            </el-form-item>
        </el-form>
        <!-- 按钮盒子 -->
        <div class="btn-box">
            <button @click="doRegister">注册</button>
            <!-- 绑定点击事件 -->
            <p @click="swicher.mySwitch">已有账号?去登录</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, Ref } from 'vue'
import { Lock, User, Message } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ElForm } from 'element-plus';
import { swicher } from '../utils/mySwitch'
import { getImageCode, sentCode, register } from '../apis/login'
const randomString = ref('')
const imageCode = ref<string>('')
const generateRandomString = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
const doGetImgeCode = async () => {
    randomString.value = generateRandomString(5)
    try {
        const res = await getImageCode(randomString.value)
        console.log(res, 'here====================>');
        if (res.data) {
            const blob = new Blob([res.data])
            console.log(blob.type, '=>type');

            const url = URL.createObjectURL(blob)
            imageCode.value = url
            console.log(url)
        }

    } catch (error) {
        console.error(error)
    }
}
const registerForm = reactive({
    username: '3032964348',
    password: '1234564',
    confirmPassword: '1234564',
    gender: 0,
    nickname: 'bler',
    avatar: '',
    verifyCode: 'efef',
    code: '123'
})
const registerFormRef: Ref<typeof ElForm | undefined> = ref();
const rules = reactive({
    username: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        // { min: 3, max: 5, message: '长度应该在3~5个字符之间', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '长度应该大于6', trigger: 'blur' },
    ],
    confirmPassword: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        { min: 6, message: '长度应该大于6', trigger: 'blur' },
    ],
    nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        // { min: 6, message: '长度应该大于6', trigger: 'blur' },
    ],
    verifyCode: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
    ]
})
const doSentCode = async () => {
    const res = await sentCode(randomString.value, registerForm.code, registerForm.username)
    console.log(res);

}
const doRegister = () => {
    registerFormRef.value?.validate(async (valid: boolean) => {
        if (valid && registerForm.password === registerForm.confirmPassword) {
            console.log(registerForm);
            let newRegisterForm: any = { ...registerForm }
            delete newRegisterForm.confirmPassword
            delete newRegisterForm.code
            console.log(newRegisterForm);
            const res = await register(newRegisterForm)
            console.log(res);




        } else {
            return
        }
    })
}
doGetImgeCode()
onMounted(() => {

})

</script>

<style scoped>
.margin {
    margin-left: 60px;
}

/* 登录和注册盒子 */
.login-form,
.register-form {
    flex: 1;
    height: 100%;
}

/* 标题盒子 */
.title-box {
    height: 220px;
    line-height: 300px;
}

/* 标题 */
.title-box h1 {
    text-align: center;
    color: white;
    /* 禁止选中 */
    user-select: none;
    letter-spacing: 5px;
    text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

/* 输入框盒子 */
.el-form {
    height: 250px;
    display: flex;
    /* 纵向布局 */
    flex-direction: column;
    justify-content: space-around;
    /* 水平居中 */
    align-items: center;
}

.el-form-item {
    width: 65%;
}

.input-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
}

.imgcode {
    background-color: #fff;
}

.img {
    width: 90px;
    height: 30px;
}

:deep(.el-form-item__error) {
    font-size: 14px;
    color: rgb(250, 101, 101);
}

:deep(.el-input-group__append:nth-child(0)) {
    background-color: #fff;
}


/* 输入框 */
input {
    /* width: 60%; */
    height: 40px;
    margin-bottom: 20px;
    text-indent: 10px;
    border: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 120px;
    /* 增加磨砂质感 */
    backdrop-filter: blur(10px);
}

input:focus {
    /* 光标颜色 */
    color: #b0cfe9;
}

/* 聚焦时隐藏文字 */
input:focus::placeholder {
    opacity: 0;
}

/* 按钮盒子 */
.btn-box {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

/* 按钮 */
button {
    width: 100px;
    height: 30px;
    margin: 0 7px;
    line-height: 30px;
    border: none;
    border-radius: 4px;
    background-color: #69b3f0;
    color: white;
}

/* 按钮悬停时 */
button:hover {
    /* 鼠标小手 */
    cursor: pointer;
    /* 透明度 */
    opacity: 0.8;
}

/* 按钮文字 */
.btn-box p {
    height: 30px;
    line-height: 30px;
    /* 禁止选中 */
    user-select: none;
    font-size: 14px;
    color: white;
}

.btn-box p:hover {
    cursor: pointer;
    border-bottom: 1px solid white;
}
</style>
