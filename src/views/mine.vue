<template>
  <div class="container">
    <div class="content">
      <div class="avater">
        <img :src="userInfo.avatar" alt="">
      </div>
      <div class="info-box">
        <div class="item">
          <el-button :icon="Edit" @click="dialogFormVisible = !dialogFormVisible">昵称：{{ userInfo.nickname }}</el-button>
        </div>
        <div class="item">
          <el-button :icon="Edit" @click="dialogFormVisible2 = !dialogFormVisible2">密码：******</el-button>
        </div>
      </div>
      <div class="btn-box">
        <el-button type="primary" @click="goto">重新选择偏好</el-button>
        <el-button type="danger">注销账号</el-button>

      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="编辑昵称">
      <el-form :model="nameForm">
        <el-form-item label="昵称" label-width="140px">
          <el-input v-model="nameForm.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="DoUpdateNick">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogFormVisible2" title="修改密码">
      <el-form :model="passwordForm">
        <el-form-item label="新密码" label-width="140px">
          <el-input type="password" v-model="passwordForm.password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取消</el-button>
          <el-button type="primary" @click="DoUpdatePassword">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { Edit } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useStore } from '../stores/user'
import router from '../router';
import { updatePassword, updateNick, getUserInfo } from '../apis/user'
import { ElMessage } from 'element-plus';
const store = useStore();
let { userInfo } = storeToRefs(store);
const dialogFormVisible = ref(false)
const nameForm = ref({
  name: userInfo.value.nickname
})
const dialogFormVisible2 = ref(false)
const passwordForm = ref({
  password: '******'
})
const DoUpdateNick = async () => {
  const res = await updateNick(nameForm.value.name)
  if (res.succeed) {
    ElMessage.success('修改成功!')
    DogetUserInfo()
    dialogFormVisible.value = false
  } else {
    ElMessage.error(res.message)
  }
}

const DoUpdatePassword = async () => {
  const res = await updatePassword(passwordForm.value.password)
  if (res.succeed) {
    ElMessage.success('修改成功!')
    dialogFormVisible2.value = false
  } else {
    ElMessage.error(res.message)
  }
}
const DogetUserInfo = async () => {
  const res = await getUserInfo()
  if (res.succeed) {
    userInfo.value = res.result
  } else {
    ElMessage.error(res.message)
  }
}
const goto = () => {
  router.push('/chooseTags')
}
</script>

<style lang='scss' scoped>
.container {
  background: url('../assets/img/bg.jpg') no-repeat;
  background-size: cover;
  min-height: 100vh;
  padding: 100px 300px;

  .content {

    .avater {
      margin: 0 auto;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid #e1e5e8;
      overflow: hidden;

      img {
        width: 100%;
      }
    }

    .info-box {
      display: flex;
      flex-wrap: wrap;
      margin-top: 50px;

      .item {
        display: flex;
        flex: 1;

        .el-button {
          width: 100%;
        }
      }
    }

    .btn-box {
      margin-top: 50px;
      text-align: center;
    }
  }
}
</style>