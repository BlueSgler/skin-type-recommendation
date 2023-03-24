<template>
    <div class="container">
        <div class="btn-group">
            <Add @click="addHandler"></Add>
            <Delete @emitDelete="deleteHandler"></Delete>
            <el-cascader :options="options" :props="props" clearable @change="handleChange" />
            <el-button @click="DoSearch">搜索</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="ID" prop="id" />
            <el-table-column label="名称" prop="name" />
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
        <div class="pag">
            <el-pagination background v-model:current-page="query.currentPage" :page-size="10"
                layout="total, prev, pager, next" :total="total" @current-change="handleCurrentChange" />
        </div>
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
                            :on-success="handleAvatarSuccess" :headers="header">
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
                        <div class="title">{{ item.name }}</div>
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
                    <div class="post-img">
                        <el-upload class="avatar-uploader" action="http://www.pymjl.com:8978/upload" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :headers="header">
                            <img v-if="editForm.cover" :src="editForm.cover" class="avatar" />
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
                    <div class="item" v-for="item in items">
                        <div class="title">{{ item.name }}</div>
                        <div class="options">
                            <span :class="[editForm.tagIdList.includes(subItem.id) ? 'active' : '', 'option']"
                                v-for="subItem in item.children" :key="subItem.id"
                                @click="active2(subItem.id)">{{ subItem.name }}
                            </span>
                        </div>
                    </div>

                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false">取消</el-button>
                    <el-button type="primary" @click="doEidtCometic">
                        保存
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getAllCometics, addCometic, updateCometic, deleteCometic, deleteArray, search } from '@/apis/cosmetic'
import { getAllRootTags, getTags } from '@/apis/tag';
import { InfoFilled } from '@element-plus/icons-vue'
import Add from '@/components/common/Add.vue'
import Delete from '@/components/common/Delete.vue'
import { ElMessage } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const props = { multiple: true }

/**
 * 获取化妆品的分页数据
 */
const query = ref({
    pageSize: 10,
    currentPage: 1,
    tagIdList: []

})

//化妆品总共的条数
const total = ref(0)

//级联选择器配置项类型
interface optionsType {
    value: string,
    label: string,
    children?: optionsType[]
}

//级联选择器配置项
const options = ref<optionsType[]>([])

const imageUrl = ref('')
const token = sessionStorage.getItem('token')
const header = {
    Authorization: 'Bearer ' + token
}

/**
 * 上传成功回调函数
 * @param response 响应数据
 * @param uploadFile 上传文件
 */
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

/**
 * 打开官网
 * @param url 官方售卖地址
 */
const gotoUrl = (url: string) => {
    window.open(url)
}

//标签类型
interface Tag {
    id: number
    name: string
    parentId: number
    isNeeded: number
    createTime: string
}

//标签树状结构类型
type Item = {
    children?: Item[],
    id: number
    name: string
    parentId: number
    isNeeded: number
    createTime: string
}

const items = ref<Item[]>([])

//表单类型
interface FormType {
    id?: number
    cover: string
    price: number
    name: string
    description: string,
    originalUrl: string,
    sourceWarehouse: string,
    brand: string,
    tagIdList: number[]
}

//添加化妆品表单
const addForm = ref<FormType>({
    cover: '',
    price: 0,
    name: '',
    description: '',
    originalUrl: '',
    sourceWarehouse: '',
    brand: '',
    tagIdList: []
})

//编辑化妆品表单
const editForm = ref<FormType>({
    id: undefined,
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

/**
 * 获取所有根标签并对数据进行树状结构处理
 */
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
        for (let i = 0; i < items.value.length; i++) {
            const res = await getTags(items.value[i].id, false)
            items.value[i].children = res.result
        }
        options.value = items.value.map((ele) => {
            const children = ele.children?.map((child) => {
                return {
                    value: String(child.id),
                    label: child.name
                }
            })
            return {
                value: String(ele.id),
                label: ele.name,
                children
            }
        })
    }
}
const selectedIds = ref<number[]>([])

/**
 * 激活添加表单标签
 * @param id 标签id
 */
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

/**
 * 激活编辑表单标签
 * @param id 标签id
 */
const active2 = (id: number) => {
    if (editForm.value.tagIdList.includes(id)) {
        editForm.value.tagIdList = editForm.value.tagIdList.filter(item => {
            return item != id
        })
    } else {
        editForm.value.tagIdList.push(id)
    }
}

//化妆品类型
interface Cometic {
    id: number
    name: string
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

//对话框是否显示
const dialogFormVisible = ref(false)
const dialogFormVisible2 = ref(false)

//化妆品数据
const tableData = ref<Cometic[]>([])

/**
 * 点击编辑按钮对行数据进行预处理
 * @param row 行数据
 */
const handleEdit = (row: any) => {
    editForm.value.price = row.price
    editForm.value.name = row.name
    editForm.value.description = row.description
    editForm.value.originalUrl = row.originalUrl
    editForm.value.sourceWarehouse = row.sourceWarehouse
    editForm.value.brand = row.brand
    editForm.value.id = row.id
    editForm.value.cover = row.cover
    editForm.value.tagIdList = row.tagVOList.map((tag: Tag) => {
        return tag.id
    })
    imageUrl.value = row.cover
    dialogFormVisible2.value = true

}

const multipleSelection = ref<number[]>([])

/**
 * 多选
 * @param val 
 */
const handleSelectionChange = async (val: Cometic[]) => {
    multipleSelection.value = []
    val.forEach(item => {
        if (multipleSelection.value.indexOf(item.id) == -1) {
            multipleSelection.value.push(item.id)
        }
    })
}

//批量删除
const deleteHandler = async () => {
    const res = await deleteArray(multipleSelection.value)
    if (res.succeed) {
        multipleSelection.value = []
        DoGetAllCometics()
    }
}

/**
 * 获取所有化妆品，根据偏好优先推荐
 */
const DoGetAllCometics = async () => {

    const res = await getAllCometics(query.value, false)
    if (res.succeed) {
        tableData.value = res.result.records
        total.value = res.result.total
    } else {
        ElMessage.error(res.message)
    }
}

/**
 * 根据标签数组查询化妆品
 */
const DoSearch = async () => {
    const res = await search(query.value)
    if (res.succeed) {
        tableData.value = res.result.records
        total.value = res.result.total
    } else {
        ElMessage.error(res.message)
    }
}

/**
 * 根据id删除化妆品
 * @param index 
 * @param row 
 */
const handleDelete = async (index: number, row: Tag) => {
    const res = await deleteCometic(JSON.stringify(row.id))
    if (res.succeed) {
        DoGetAllCometics()
    }
}

/**
 * 打开添加化妆品的对话框
 */
const addHandler = () => {
    dialogFormVisible.value = !dialogFormVisible.value

}

/**
 * 添加化妆品
 */
const doAddCometic = async () => {
    const res = await addCometic(addForm.value)
    if (res.succeed) {
        dialogFormVisible.value = false
        DoGetAllCometics()
    }
}

/**
 * 编辑化妆品
 */
const doEidtCometic = async () => {
    const res = await updateCometic(editForm.value)
    if (res.succeed) {
        dialogFormVisible2.value = false
        DoGetAllCometics()
    }
}

/**
 * 改变当前页数重写获取化妆品列表
 * @param val 
 */
const handleCurrentChange = (val: number) => {
    query.value.currentPage = val
    DoGetAllCometics()
}

/**
 * 点击级联选择器
 * @param value 
 */
const handleChange = (value: any) => {
    query.value.tagIdList = value.map((item: any) => {
        return JSON.parse(item[1])
    })

}

DoGetAllCometics()
DoGetAllTags()
</script>
<style lang='scss' scoped>
.container {
    width: 100%;
    position: relative;

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

    .pag {
        width: 100%;
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
}
</style>