
<template>
  <!-- 登录盒子 -->
  <div class="login-form">
    <!-- 标题盒子 -->
    <div class="title-box">
      <h1>登录</h1>
    </div>
    <!-- 输入框盒子 -->
    <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-with="5px">
      <el-form-item prop="username" label=" ">
        <el-input type="text" placeholder="邮箱" :suffix-icon="User" v-model="loginForm.username" />
      </el-form-item>
      <el-form-item prop="password" label=" ">
        <el-input type="password" placeholder="密码" :suffix-icon="Lock" v-model="loginForm.password" />
      </el-form-item>
      <el-form-item prop="code" label=" ">
        <el-input type="text" placeholder="验证码" v-model="loginForm.code" class="imgcode">
          <template #append>
            <img :src="imageCode" class="img" alt="" @click="doGetImgeCode">
          </template>
        </el-input>

      </el-form-item>
      <el-form-item prop="verifyCode" label=" ">
        <el-input type="text" placeholder="邮箱验证码" v-model="loginForm.verifyCode" class="input-with-select">
          <template #append>
            <div class="send" @click="doSentCode">发送</div>
          </template>
        </el-input>

      </el-form-item>
    </el-form>
    <!-- 按钮盒子 -->
    <div class="btn-box">
      <button @click="doLogin">登录</button>
      <!-- 绑定点击事件 -->
      <p @click="swicher.mySwitch">没有账号?去注册</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, Ref } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ElForm } from 'element-plus';
import { swicher } from '../utils/mySwitch'
import { getImageCode, login, sentCode } from '../apis/login'
import { getUserInfo } from '../apis/user'
import { storeToRefs } from 'pinia'
import { useStore } from '../stores/user'
import router from '../router';
const store = useStore();
let { token, userInfo } = storeToRefs(store);
const imageCode = ref('')
const randomString = ref('')
const loginForm = reactive({
  username: '',
  password: '123456',
  verifyCode: '',
  code: ''
})
const loginFormRef: Ref<typeof ElForm | undefined> = ref();
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '长度应该大于6', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { min: 6, message: '长度应该大于6', trigger: 'blur' },
  ],
  verifyCode: [
    { required: true, message: '请输入邮箱验证码', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ],
})
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
  console.log('lalal');

  randomString.value = generateRandomString(5)
  try {
    const res = await getImageCode(randomString.value)
    console.log(res, 'here====================>');
    if (res) {
      const blob = new Blob([res as any], { type: 'image/png' })
      console.log(blob.type, '=>type');

      const url = URL.createObjectURL(blob)
      imageCode.value = url
      console.log(url)
    }

  } catch (error) {
    console.error(error)
  }
}
const doSentCode = async () => {
  const res = await sentCode(randomString.value, loginForm.code, loginForm.username, '发送邮箱验证码，请注意查收!')
  console.log(res);

}
const doLogin = () => {
  loginFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {

      const newLoginForm: any = { ...loginForm }
      delete newLoginForm.code
      const res = await login(newLoginForm)
      console.log(res, '=====>here')

      if (res.succeed) {

        sessionStorage.setItem('token', res.result)
        token.value = res.result
        DogetUserInfo()
        if (localStorage.getItem('first')) {
          router.push('/home')
        } else {
          localStorage.setItem('first', '1')
          router.push('/chooseTags')

        }
      }

    } else {
      return
    }
  })
}
const DogetUserInfo = async () => {
  const res = await getUserInfo()
  if (res.succeed) {
    userInfo.value = res.result
  } else {
    ElMessage.error(res.message)
  }
}
doGetImgeCode()
onMounted(() => {

})

</script>

<style scoped>
.send {
  cursor: pointer;
}

/* 登录和注册盒子 */
.login-form,
.register-form {
  flex: 1;
  height: 100%;
}

/* 标题盒子 */
.title-box {
  height: 300px;
  line-height: 500px;
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
  height: 200px;
  display: flex;
  /* 纵向布局 */
  flex-direction: column;
  justify-content: space-around;
  /* 水平居中 */
  align-items: center;
}

.el-form-item {
  width: 65%;
  /* margin-bottom: 24px; */
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

/* 输入框 */
input {
  /* width: 60%; */
  height: 40px;
  margin-bottom: 20px !important;
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
