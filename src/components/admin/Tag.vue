<template>
  <div class="container">
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column label="ID" prop="id" />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="父ID" prop="parentId" />
      <el-table-column label="需要" prop="isNeeded" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { getAllRootTags } from '../../apis/tag'

interface Tag {
  id: number
  name: string
  // tagVOList: Array
  parentId: number
  isNeeded: number
  createTime: string
}
const tableData = ref<Tag[]>([])
const search = ref('')
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const DoGetAllTags = async () => {
  const { data: res } = await getAllRootTags()
  console.log(res, 'tags');
  if (res.succeed) {
    tableData.value = res.result
  }


}
const handleEdit = (index: number, row: Tag) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: Tag) => {
  console.log(index, row)
}



DoGetAllTags()
</script>
<style lang='scss' scoped>
.container {
  width: 100%;
  height: calc(100vh - 60px);
}
</style>