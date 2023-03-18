<template>
  <div class="container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID" prop="id" />
      <el-table-column label="邮箱" prop="username" />
      <el-table-column label="昵称" prop="nickname" />
      <el-table-column label="头像" prop="avatar">
        <template #default="scope">
          <div class="img">
            <img :src="scope.row.avatar" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="管理员" prop="identity">
        <template #default="scope">
          <el-switch v-model="scope.row.identity" @click="changeIdentity(scope.row)" :disabled="scope.row.identity" />
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="gender">
        <template #default="scope">
          <div>{{ scope.row.gender === 1 ? '男' : '女' }}</div>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="更新时间" prop="updateTime" />
      <el-table-column align="right">
        <template #default="scope">
          <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消"
            @confirm="handleDelete(scope.$index, scope.row)" :icon="InfoFilled" icon-color="#626AEF" title="确定删除这个用户吗?">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getUsers, addUser, deleteUser } from '../../../apis/User'
import { InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';

interface User {
  id: number
  username: string
  // tagVOList: Array
  nickname: string
  avatar: string
  identity: boolean
  gender: number
  createTime: string
  updateTime: string
}

const tableData = ref<User[]>([])
const DoGetUsers = async () => {
  const { data: res } = await getUsers('1', '100')
  if (res.succeed) {
    res.records.forEach((item: any) => {
      if (item.identity === 1) {
        item.identity = true
      } else {
        item.identity = false
      }
    });

    tableData.value = res.records
  } else {
    ElMessage.error(res.message)
  }


}
const changeIdentity = async (row: any) => {
  const { data: res } = await addUser(JSON.stringify(row.id))
  if (res.succeed) {
    ElMessage.success('添加管理员成功！')
  } else {
    ElMessage.error(res.message)
  }
}
const handleDelete = async (index: number, row: User) => {
  console.log(index, row)
  const { data: res } = await deleteUser(JSON.stringify(row.id))
  if (res.succeed) {
    ElMessage.success('删除成功！')
    DoGetUsers()
  } else {
    ElMessage.error(res.message)
  }
}


DoGetUsers()
</script>
<style lang='scss' scoped>
.container {
  width: 100%;
  height: calc(100vh - 60px);
}
</style>