<template>
  <div class="container">
    <div class="btn-group">
      <Add @click="addHandler"></Add>
      <Delete @emitDelete="deleteHandler"></Delete>
    </div>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="ID" prop="id" />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="父ID" prop="parentId" />
      <el-table-column label="需要" prop="isNeeded">
        <template #default="scope">
          <span>{{ scope.row.isNeeded === 1 ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="根据父级id查询子标签">
            <template #append>
              <el-button @click="doSeach" :icon="Search" />
            </template></el-input>

        </template>
        <template #default="scope">
          <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消"
            @confirm="handleDelete(scope.$index, scope.row)" :icon="InfoFilled" icon-color="#626AEF" title="确定删除这个标签吗?">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="addForm">
        <el-form-item label="标签名称" label-width="140px">
          <el-input v-model="addForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="父级id(根标签:-1)" label-width="140px">
          <el-input v-model="addForm.parentId" autocomplete="off" type="number" />
        </el-form-item>
        <el-form-item label="是否需要" label-width="140px">
          <el-select v-model="addForm.isNeeded" placeholder="请选择">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="doAddTag">
            添加
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getAllRootTags, getTags, addTag, deleteTag, deleteArray } from '../../../apis/tag'
import { Search, InfoFilled } from '@element-plus/icons-vue'
import Add from '../../common/Add.vue'
import Delete from '../../common/Delete.vue'
import { ElMessage } from 'element-plus';

interface Tag {
  id: number
  name: string
  // tagVOList: Array
  parentId: number
  isNeeded: number
  createTime: string
}
const dialogFormVisible = ref(false)
const addForm = ref({
  name: '',
  parentId: null,
  isNeeded: null,
})
const tableData = ref<Tag[]>([])
const multipleSelection = ref<number[]>([])
const handleSelectionChange = async (val: Tag[]) => {
  console.log(val, 'val');
  multipleSelection.value = []
  val.forEach(item => {
    if (multipleSelection.value.indexOf(item.id) == -1) {
      multipleSelection.value.push(item.id)
    }

  })
  console.log(multipleSelection.value, 'shuzu');


}

//批量删除
const deleteHandler = async () => {

  const res = await deleteArray(multipleSelection.value)
  if (res.succeed) {
    multipleSelection.value = []
    DoGetAllTags()
  }
}

const search = ref('')
const doSeach = async () => {
  const res = await getTags(JSON.parse(search.value),false)
  if (res.succeed) {
    tableData.value = res.result
  }
}
const DoGetAllTags = async () => {
  const res = await getAllRootTags(false)
  console.log(res, 'tags');
  if (res.succeed) {
    tableData.value = res.result
  } 

}
const handleDelete = async (index: number, row: Tag) => {
  console.log(index, row)
  const res = await deleteTag(JSON.stringify(row.id))
  if (res.succeed) {
    DoGetAllTags()
  }
}

const addHandler = () => {
  dialogFormVisible.value = !dialogFormVisible.value

}

const doAddTag = async () => {
  const res = await addTag(addForm.value)
  if (res.succeed) {
    dialogFormVisible.value = false
    DoGetAllTags()

  }
}

DoGetAllTags()
</script>
<style lang='scss' scoped>
.container {
  width: 100%;
  height: calc(100vh - 60px);

  .btn-group {
    display: flex;
  }
}
</style>