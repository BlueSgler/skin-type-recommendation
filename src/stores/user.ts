import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('user', {
    state: () => ({
        userInfo: {
            nickName: ''
        },
        token: 'eyJhbGciOiJIUzI1NiJ9.eyJuaWNrTmFtZSI6ImJsZXIiLCJ1c2VySWQiOjQsImp0aSI6InRva2VuSWQiLCJpYXQiOjE2Nzg5MzQwMjcsImV4cCI6MTY3OTUzODgyN30.8-jqle8T_RorAFO33goJZq9Cf9uSxGtaunnRdIxMfCQ'
    }),
    getters: {

    },
    actions: {

    }
})