<template>
    <div class="box">
        <div class="img-box">
            <img :src="usedImg" alt="" @click="change">
        </div>
        <div>{{ label }}</div>
    </div>
</template>

<script setup lang='ts'>
import img1 from '@/assets/img/unchecked.png'
import img2 from '@/assets/img/checked.png'
import { computed } from 'vue';

const emits = defineEmits(['update:modelValue'])
const props = defineProps<{
    modelValue: string,
    label: string,
    value: string
}>()
const change = () => {
    emits('update:modelValue', props.value)
}

const usedImg = computed(() => {
    if (props.value === props.modelValue) {
        return img2
    }
    return img1
})
</script>

<style lang='scss' scoped>
.box {
    display: flex;
}

.img-box {
    cursor: pointer;
    width: 16px;
    margin-right: 10px;

    img {
        width: 100%;
    }
}
</style>