<template>
    <div class="content">
        <div class="item" v-for="item in items" :key="item.id">
            <div class="parent-tag">
                {{ item.name }}
            </div>
            <div class="child-list" v-if="item?.children?.length">
                <div :class="[selectedIds.includes(subitem.id) ? 'active' : '', 'child-item']"
                    v-for="subitem in item.children" @click="active(subitem.id)">{{ subitem.name }}
                </div>
            </div>
            <div class="empty child-list" v-else>
                暂无数据
            </div>
        </div>
        <div class="btn-box">
            <el-button type="primary" @click="DoPreference">填写完成，开始体验！</el-button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

import { ElMessage, TagProps } from 'element-plus'
import { getAllRootTags, getTags, preference } from '../../apis/tag';
import router from '../../router';

type Item = {
    children?: Item[],
    id: number
    name: string
    // tagVOList: Array
    parentId: number
    isNeeded: number
    createTime: string
}



const items = ref<Item[]>([])

interface Tag {
    id: number
    name: string
    // tagVOList: Array
    parentId: number
    isNeeded: number
    createTime: string
}
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
            const res = await getTags(item.id,false)
            item.children = res.result
        })

    } else {
        ElMessage.error(res.message)
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
}
const DoPreference = async () => {
    const res = await preference({ tagIdList: selectedIds.value })
    if (res.succeed) {
        router.push('/home')
    } else {
        ElMessage.error(res.message)
    }
}
DoGetAllTags()

</script>

<style lang='scss' scoped>
.content {
    padding: 10px 50px;

    .item {
        border-radius: 10px;
        border: 1px solid #dcdfe6;
        margin: 10px 0;
    }


    .parent-tag {
        padding: 10px;
        font-weight: 600;
        border-bottom: 1px solid #dcdfe6;
    }

    .child-list {
        padding: 10px;
        display: flex;
        justify-content: start;

        .child-item {
            border: 1px solid #fab6b6;
            padding: 4px 10px;
            border-radius: 15px;
            margin-right: 14px;
            color: #f8816c;
            cursor: pointer;

        }

        .active {
            background-color: #fef0f0;
        }
    }

    .empty {
        color: #919baf
    }

    .btn-box {
        margin-top: 30px;
        display: flex;
        justify-content: end;
    }
}
</style>