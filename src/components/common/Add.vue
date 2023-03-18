<template>
    <div>
        <el-button class="add" type="primary" @click="emitAdd">
            +
        </el-button>
    </div>
</template>

<script setup lang='ts'>
import { defineEmits } from 'vue'
// 使用defineEmits创建名称，接受一个数组
const emit = defineEmits(['emitAdd'])

const emitAdd = () => {
    emit('emitAdd')
}
</script>

<style lang='scss' scoped>
.add {
    font-size: 30px;
    margin-right: 10px;
}
</style>