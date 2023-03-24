<template>
    <div class="container">
        <div class="box">
            <el-image class="img" :src="data.cover" fit="fill">
            </el-image>
            <div class="info-box">
                <div class="common title">{{ data.name }}</div>
                <div class="common">{{ data.description }}</div>
                <div class="common">{{ data.price }}RMB</div>
                <div class="common">{{ data.brand }}</div>
                <div class="common ">
                    <el-image class="img2" :src="data.cover" fit="contain" />
                </div>
                <div class="common">货源地：{{ data.sourceWarehouse }}</div>
                <div class="tags common">
                    <div class="tag" v-for="item in data.tagVOList">{{ item.name }}</div>
                </div>
                <el-button type="primary" style="width:140px" @click="goto">前往官网地址</el-button>
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const data = ref({
    cover: '',
    name: '',
    price: undefined,
    description: '',
    originalUrl: '',
    sourceWarehouse: '',
    brand: '',
    tagVOList: [{ name: '' }]
})
data.value = JSON.parse(sessionStorage.getItem('cometic') as string)
console.log(data.value);
const goto = () => {
    window.open(data.value.originalUrl)
}

</script>

<style lang='scss' scoped>
.container {
    height: 100%;

    .box {
        height: calc(100% - 60px);
        padding: 100px 120px;
        display: flex;

        .img {
            min-width: 600px;
            height: 40%;
            min-height: 400px;
        }

        .info-box {
            display: flex;
            flex-direction: column;
            width: 50%;
            min-width: 600px;
            padding: 0 30px;

            .common {
                margin-bottom: 30px;
            }

            .title {
                font-size: 20px;
            }

            .img2 {
                width: 50px;
                height: 50px;
                border: 1px solid #d3d3d3;

            }

            .tags {
                display: flex;
                flex-wrap: wrap;
                .tag {
                    padding: 5px 10px;
                    margin-right: 10px;
                    border-radius: 20px;
                    background-color: #fef0f0;
                    color: #f8816c;
                    border: 1px solid #fab6b6;
                    margin-bottom: 5px;
                }
            }
        }
    }


}
</style>