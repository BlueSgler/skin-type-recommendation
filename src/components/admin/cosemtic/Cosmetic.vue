<template>
    <div class="container">
        <div class="btn-group">
            <Add @click="addHandler"></Add>
            <Delete @emitDelete="deleteHandler"></Delete>
            <el-cascader :options="options" :props="props" clearable />
        </div>
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="ID" prop="id" />
            <el-table-column label="名称" prop="name" />
            <!-- <el-table-column label="描述" prop="description" /> -->
            <el-table-column label="品牌" prop="brand" />
            <el-table-column label="价格" prop="price" />
            <el-table-column label="标签" prop="tagVOList" width="200">
                <template #default="scope">
                    <div class="tags">
                        <span class="active option" v-for="item in scope.row.tagVOList"
                            :key="scope.row.tagVOList.id">{{ item.name }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="封面" prop="cover">
                <template #default="scope">
                    <div class="img">
                        <img :src="scope.row.cover" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="官网售卖链接" prop="originalUrl">
                <template #default=scope>
                    <el-link type="primary" @click="gotoUrl(scope.row.originalUrl)">{{ scope.row.originalUrl }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="货源地" prop="sourceWarehouse" />
            <el-table-column label="优先级" prop="score" />
            <el-table-column label="创建时间" prop="createTime" />
            <el-table-column label="更新时间" prop="updateTime" />
            <el-table-column align="right">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(scope.$index, scope.row)" :icon="InfoFilled" icon-color="#626AEF"
                        title="确定删除这个标签吗?">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogFormVisible" title="添加化妆品">
            <el-form :model="addForm">
                <el-form-item label="名称" label-width="140px">
                    <el-input v-model="addForm.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="描述" label-width="140px">
                    <el-input v-model="addForm.description" autocomplete="off" />
                </el-form-item>
                <el-form-item label="封面" label-width="140px">
                    <div class="post-img">
                        <el-upload class="avatar-uploader" action="http://www.pymjl.com:8978/upload" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :headers="header">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon" size="50">
                                <upload-filled />
                            </el-icon>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="价格" label-width="140px">
                    <el-input v-model="addForm.price" autocomplete="off" type="number" />
                </el-form-item>
                <el-form-item label="品牌" label-width="140px">
                    <el-input v-model="addForm.brand" autocomplete="off" />
                </el-form-item>
                <el-form-item label="官网售卖地址" label-width="140px">
                    <el-input v-model="addForm.originalUrl" autocomplete="off" />
                </el-form-item>
                <el-form-item label="货源仓库" label-width="140px">
                    <el-input v-model="addForm.sourceWarehouse" autocomplete="off" />
                </el-form-item>
                <el-form-item label="标签" label-width="140px">
                    <div class="item" v-for="item in items" :key="item.id">
                        <div class="title">主要成分</div>
                        <div class="options">
                            <span :class="[selectedIds.includes(subItem.id) ? 'active' : '', , 'option']"
                                v-for="subItem in item.children" :key="subItem.id"
                                @click="active(subItem.id)">{{ subItem.name }}</span>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="doAddCometic">
                        添加
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogFormVisible2" title="编辑化妆品">
            <el-form :model="editForm">
                <el-form-item label="名称" label-width="140px">
                    <el-input v-model="editForm.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="描述" label-width="140px">
                    <el-input v-model="editForm.description" autocomplete="off" />
                </el-form-item>
                <el-form-item label="封面" label-width="140px">
                    <div class="post-img" @click="selectImg">
                        <el-upload class="avatar-uploader" action="http://www.pymjl.com:8978/upload" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :headers="header">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon" size="50">
                                <upload-filled />
                            </el-icon>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="价格" label-width="140px">
                    <el-input v-model="editForm.price" autocomplete="off" type="number" />
                </el-form-item>
                <el-form-item label="品牌" label-width="140px">
                    <el-input v-model="editForm.brand" autocomplete="off" />
                </el-form-item>
                <el-form-item label="官网售卖地址" label-width="140px">
                    <el-input v-model="editForm.originalUrl" autocomplete="off" />
                </el-form-item>
                <el-form-item label="货源仓库" label-width="140px">
                    <el-input v-model="editForm.sourceWarehouse" autocomplete="off" />
                </el-form-item>
                <el-form-item label="标签" label-width="140px">
                    <div class="item" v-for="item in items2" :key="item.id">
                        <div class="title">主要成分</div>
                        <div class="options">
                            <span :class="[selectedIds.includes(subItem.id) ? 'active' : '', , 'option']"
                                v-for="subItem in item.children" :key="subItem.id"
                                @click="active(subItem.id)">{{ subItem.name }}</span>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="doAddCometic">
                        保存
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getAllCometics, getCometics, getCometicsDeTail, addCometic, updateCometic, deleteCometic, deleteArray, preference } from '../../../apis/cosmetic'
import { getAllRootTags, getTags } from '../../../apis/tag';
import { Search, InfoFilled, Edit } from '@element-plus/icons-vue'
import Add from '../../common/Add.vue'
import Delete from '../../common/Delete.vue'
import { ElMessage } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
const props = { multiple: true }

interface optionsType {
    value: string,
    label: string,
    children?: optionsType[]
}
const options = ref<optionsType[]>([])

const imageUrl = ref('')
const token = sessionStorage.getItem('token')
const header = {
    Authorization: 'Bearer ' + token
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    addForm.value.cover = response.result
    if (response.succeed) {
        ElMessage.success(response.message)
    } else {
        ElMessage.error(response.message)
    }

}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/png') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    }
    return true
}
const gotoUrl = (url: string) => {
    window.open(url)
}
interface Tag {
    id: number
    name: string
    // tagVOList: Array
    parentId: number
    isNeeded: number
    createTime: string
}
type Item = {
    children?: Item[],
    id: number
    name: string
    parentId: number
    isNeeded: number
    createTime: string
}
const items = ref<Item[]>([])
const items2 = ref<Item[]>([])
interface addFormType {
    cover: string
    price: number
    name: string
    description: string,
    originalUrl: string,
    sourceWarehouse: string,
    brand: string,
    tagIdList: number[]
}
const addForm = ref<addFormType>({
    cover: '',
    price: 0,
    name: 'test',
    description: 'test',
    originalUrl: 'test',
    sourceWarehouse: 'test',
    brand: 'test',
    tagIdList: []
})
const editForm = ref<addFormType>({
    cover: '',
    price: 0,
    name: '',
    description: '',
    originalUrl: '',
    sourceWarehouse: '',
    brand: '',
    tagIdList: []
})
const rootList = ref<Tag[]>([])
const DoGetAllTags = async () => {
    const res = await getAllRootTags(false)

    if (res.succeed) {
        rootList.value = res.result
        items.value = rootList.value.map((item) => {
            return {
                ...item,
                children: []
            }
        })

        items.value.forEach(async item => {
            const res = await getTags(item.id, false)
            item.children = res.result
        })
        console.log(items.value);
        // options.value = items.value.map((item) =>{
        //     return {
        //         value: item.id,
        //         label: item.name,
        //         children:item.children
        //     }
        // })


    }
}
const selectedIds = ref<number[]>([])
const active = (id: number) => {
    if (selectedIds.value.includes(id)) {
        selectedIds.value = selectedIds.value.filter(item => {
            return item != id
        })
    } else {
        selectedIds.value.push(id)
    }
    console.log(selectedIds.value);
    addForm.value.tagIdList = selectedIds.value
}

interface Cometic {
    id: number
    name: string
    // tagVOList: Array
    description: string
    brand: string
    price: string
    cover: string
    sourceWarehouse: string
    originalUrl: string
    tagVOList: Tag[]
    score: number
    createTime: string
    updateTime: string
}
const dialogFormVisible = ref(false)
const dialogFormVisible2 = ref(false)


const tableData = ref<Cometic[]>([])

const handleEdit = (row: any) => {
    dialogFormVisible2.value = true
    editForm.value.price = row.price
    editForm.value.name = row.name
    editForm.value.description = row.description
    editForm.value.originalUrl = row.originalUrl
    editForm.value.sourceWarehouse = row.sourceWarehouse
    editForm.value.brand = row.brand
    editForm.value.tagIdList = row.tagIdList
    imageUrl.value = row.cover
    items2.value = row.tagIdList
    console.log(editForm.value);

}
const multipleSelection = ref<number[]>([])
const handleSelectionChange = async (val: Cometic[]) => {
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
        DoGetAllCometics()
    }
}

const search = ref('')
const doSeach = async () => {
    const res = await getCometics(JSON.parse(search.value))
    if (res.succeed) {
        tableData.value = res.result
    }
}
const DoGetAllCometics = async () => {
    const res = await getAllCometics({
        pageSize: 10,
        currentPage: 1
    }, false)
    console.log(res, 'res');
    if (res.succeed) {
        tableData.value = res.result.records
    } else {
        ElMessage.error(res.message)
    }


}
const handleDelete = async (index: number, row: Tag) => {
    console.log(index, row)
    const res = await deleteCometic(JSON.stringify(row.id))
    if (res.succeed) {
        DoGetAllCometics()
    }
}

const addHandler = () => {
    dialogFormVisible.value = !dialogFormVisible.value

}

const doAddCometic = async () => {
    const res = await addCometic(addForm.value)
    if (res.succeed) {
        dialogFormVisible.value = false
        DoGetAllCometics()
    }
}

DoGetAllCometics()
DoGetAllTags()
</script>
<style lang='scss' scoped>
.container {
    width: 100%;
    height: calc(100vh - 60px);

    .btn-group {
        display: flex;
    }

    .img {
        width: 60px;

        img {
            width: 100%;
        }
    }

    .post-img {
        width: 100px;
        height: 100px;
        border: 1px solid rgb(220, 223, 230);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
        }

        .el-icon--upload {
            width: 100%;
        }
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
    }

    .option {
        padding: 0 10px;
        border-radius: 6px;
        border: 1px solid #fab6b6;
        margin-right: 14px;
        color: #f8816c;
        cursor: pointer;
    }

    .active {
        background-color: #fef0f0;
    }

    .item {
        width: 100%;
        padding: 10px;
        border: 1px solid rgb(220, 223, 230);
        border-radius: 10px;
        margin-bottom: 10px;



    }
}
</style>