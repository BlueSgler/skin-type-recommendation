<template>
    <div class="container">
        <div class="box">
            <div class="item" v-for="item in data" :key="item?.id" @click="goItem(item.id)">
                <el-image class="img" :src="item.cover" fit="fill">
                </el-image>
                <div class="description">
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onUnmounted, ref } from 'vue';
import { getAllCometics } from '@/apis/cosmetic'
import { ElMessage } from 'element-plus';
import router from '@/router';


const query = ref({
    currentPage: 1,
    pageSize: 15
})

const data = ref([{
    id: undefined,
    name: '',
    cover: ''

}])

const total = ref(0)
const goItem = (id: any) => {

    let obj = data.value.find((item) => {
        return item.id === id
    })
    console.log(obj);
    sessionStorage.setItem('cometic', JSON.stringify(obj))
    router.push('/detail')

}
const doGetAllCometics = async () => {
    if (query.value.currentPage > total.value / 15 + 1) {
        ElMessage.success('没有更多了')
        return
    }
    const res = await getAllCometics(query.value, false)
    if (res.succeed) {
        data.value = [...data.value, ...res.result.records]
        total.value = res.result.total
    }
}
const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};
const debouncedDoGetAllCometics = debounce(doGetAllCometics, 500);
const scroll = (ev: Event) => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 20)) {

        query.value.currentPage = query.value.currentPage + 1

        debouncedDoGetAllCometics();
    }
}
window.addEventListener('scroll', scroll)

onUnmounted(() => {
    window.removeEventListener('scroll', scroll)
})

doGetAllCometics()
</script>

<style lang='scss' scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // height: calc(100vh - 60px);
}

.box {
    padding: 10px 2vw;
    display: flex;
    flex-wrap: wrap;

    .item {
        text-align: center;
        width: 19.5%;
        min-width: 10%;
        padding: 10px;
        height: 16vw;
        min-height: 14vw;
        overflow: hidden;
        margin-bottom: 20px;
        cursor: pointer;

        .img {
            border-radius: 10px;
            width: 100%;
            height: 80%;
        }

        .description {
            padding: 4px 10px;
            word-break: break-all;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}

.bottom-box {
    display: flex;
    justify-content: center;

}
</style>