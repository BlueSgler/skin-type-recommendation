<template>
    <div style="margin-right: 10px;">
        <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消" @confirm="emitDelete(); handleDelete()"
            icon-color="#626AEF" title="确定删除这个标签吗?">
            <template #reference>
                <el-button type="danger">
                    批量删除
                </el-button>
            </template>
        </el-popconfirm>
    </div>
</template>

<script setup lang='ts'>
import { defineEmits } from 'vue'
// 使用defineEmits创建名称，接受一个数组
const emit = defineEmits(['emitDelete'])
const emitDelete = () => {
    emit('emitDelete')
}
const handleDelete = () => {

}
</script>

<style lang='scss' scoped></style>