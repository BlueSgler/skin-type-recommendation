<template>
    <div class="container">
        <div class="title">
            <img src="@/assets/img/title.jpg" alt="">
        </div>
        <el-card class="box-card">
            <div class="item" v-for="item in questions" :key="item.id">
                <div class="question">
                    <span class="index">Q{{ item.id + 1 }}.</span>
                    <span class="content">{{ item.question }}</span>
                </div>
                <div :id="`group${item.id}`" class="answer-list">
                    <div class="answer" v-for="subItem in item.answer" :key="subItem.label">
                        <Radio v-model="answers[item.id].label" :label="subItem.answer" :value="subItem.label" />
                    </div>
                </div>
            </div>
            <div class="btn-box">
                <el-button type="primary" @click="getScore">填写完成，获取结果</el-button>
            </div>
        </el-card>
        <el-dialog v-model="dialogVisible" title="测试结果" width="30%">
            <span>肤质类型：{{ result.tag.name }}</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">重新测试</el-button>
                    <el-button type="primary" @click="goto">
                        返回上一页
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>

import { Ref, ref } from 'vue';
import Radio from '@/components/home/layout/Radio.vue';
import { score } from '@/apis/user'
import router from '@/router';

const result = ref()
const dialogVisible = ref(false)
const answers = ref<{ id: number, label: string }[]>([])
const questions = ref([
    {
        id: 0,
        question: '洗完脸后的2-3小时，不涂任何产品，在明亮的光线下照镜子，前额和脸颊部位:',
        answer: [
            {
                label: 'A',
                answer: 'A. 非常粗糙'
            },
            {
                label: 'B',
                answer: 'B. 仍有紧绷感'
            },
            {
                label: 'C',
                answer: 'C. 正常的润泽感而且在镜头中看不到反光'
            },
            {
                label: 'D',
                answer: 'D. 能看到反光'
            },
        ]
    },
    {
        id: 1,
        question: '在自己以往的照片中，脸是否显得光亮:',
        answer: [
            {
                label: 'A',
                answer: 'A. 从不，或从未意识到有这种情况'
            },
            {
                label: 'B',
                answer: 'B. 有时会'
            },
            {
                label: 'C',
                answer: 'C. 经常会'
            },
            {
                label: 'D',
                answer: 'D. 历来如此'
            },
        ]
    },
    {
        id: 2,
        question: '上妆或使用粉底，但是不用散粉之类，2-3小时后，妆容看起来:',
        answer: [
            {
                label: 'A',
                answer: 'A. 出现皮屑，结块'
            },
            {
                label: 'B',
                answer: 'B. 光滑'
            },
            {
                label: 'C',
                answer: 'C. 出现闪亮'
            },
            {
                label: 'D',
                answer: 'D. 出现条纹并且闪亮'
            },
            {
                label: 'E',
                answer: 'E. 我从不用粉底'
            },
        ]
    },
    {
        id: 3,
        question: '在干燥环境中，如果不用保湿或防晒产品，面部皮肤:',
        answer: [
            {
                label: 'A',
                answer: 'A. 感觉很干燥或刺痛'
            },
            {
                label: 'B',
                answer: 'B. 感觉紧绷'
            },
            {
                label: 'C',
                answer: 'C. 感觉正常'
            },
            {
                label: 'D',
                answer: 'D. 看起来有光亮,或从不觉得此时需要用保湿产品'
            },
            {
                label: 'E',
                answer: 'E. 不知道'
            },
        ]
    },
    {
        id: 4,
        question: '用有放大功能的化妆镜从脸上看到有多少大头针尖大小的毛孔:',
        answer: [
            {
                label: 'A',
                answer: 'A. 一个都没有'
            },
            {
                label: 'B',
                answer: 'B. T区有一些'
            },
            {
                label: 'C',
                answer: 'C. 很多'
            },
            {
                label: 'D',
                answer: 'D. 非常多'
            },
            {
                label: 'E',
                answer: 'E. 不知道'
            },
        ]
    },
    {
        id: 5,
        question: '如果描述自己的面部皮肤特征，你会选择:',
        answer: [
            {
                label: 'A',
                answer: 'A. 干性'
            },
            {
                label: 'B',
                answer: 'B. 中性'
            },
            {
                label: 'C',
                answer: 'C. 混合性'
            },
            {
                label: 'D',
                answer: 'D. 油性'
            },
        ]
    },
    {
        id: 6,
        question: '使用皂类洁面洗脸后，你觉得:',
        answer: [
            {
                label: 'A',
                answer: 'A. 感觉干燥，或有刺痛感'
            },
            {
                label: 'B',
                answer: 'B. 感觉有些干燥但无刺痛感'
            },
            {
                label: 'C',
                answer: 'C. 感觉没有异常'
            },
            {
                label: 'D',
                answer: 'D. 感到皮肤出油'
            },
            {
                label: 'E',
                answer: 'E. 从不使用皂类或其他泡泡类的洁面产品'
            },
        ]
    },
    {
        id: 7,
        question: '如果不使用保湿产品，你的脸觉得干吗:',
        answer: [
            {
                label: 'A',
                answer: 'A. 总是如此'
            },
            {
                label: 'B',
                answer: 'B. 有时会'
            },
            {
                label: 'C',
                answer: 'C. 很少'
            },
            {
                label: 'D',
                answer: 'D. 从不'
            },
        ]
    },
    {
        id: 8,
        question: '你脸上有阻塞的毛孔吗（黑头或白头）:',
        answer: [
            {
                label: 'A',
                answer: 'A. 从来没有'
            },
            {
                label: 'B',
                answer: 'B. 很少有'
            },
            {
                label: 'C',
                answer: 'C. 有时有'
            },
            {
                label: 'D',
                answer: 'D. 总是出现'
            },
        ]
    },
    {
        id: 9,
        question: '在不做任何护肤步骤的前提下，你的T区出油吗？',
        answer: [
            {
                label: 'A',
                answer: 'A. 从不'
            },
            {
                label: 'B',
                answer: 'B. 有时会'
            },
            {
                label: 'C',
                answer: 'C. 经常'
            },
            {
                label: 'D',
                answer: 'D. 总是'
            },
        ]
    }])
questions.value.forEach((item) => {
    answers.value.push({ id: item.id, label: '' })
    console.log(answers.value);

})

const getScore = async () => {
    console.log(answers.value);

    const res = await score({ answers: answers.value })
    if (res.succeed) {
        console.log(res);
        result.value = res.result
        console.log(result.value);
        dialogVisible.value = true
    }
}
const goto = () => {
    router.push('/chooseTags')
}
</script>

<style lang='scss' scoped>
.container {
    padding-bottom: 100px;
    min-height: 100vh;
    background-color: #c9dad0;

    .title {
        margin: 0 auto;
        width: 500px;

        img {
            width: 100%;
        }
    }

    .box-card {
        background-color: #efefef;
        margin: 0 400px;
        // background: url('@/assets/img/nabg.png') no-repeat;
        background-size: cover;

        .item {
            border-bottom: 1px dotted #000;
            padding: 10px;

            .question {

                .index {
                    font-size: 20px;
                    color: #6a8a78;
                }

                .content {

                    font-weight: bold;
                }
            }

            .answer-list {
                padding: 10px 0;
                display: flex;
                flex-wrap: wrap;

                .answer {
                    display: flex;
                    width: 50%;
                    margin: 10px 0;

                    .img-box {
                        width: 16px;
                        margin-right: 10px;

                        img {
                            width: 100%;
                        }
                    }
                }

            }
        }
    }

    .btn-box {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
}
</style>