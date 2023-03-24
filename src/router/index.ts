import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw, Router } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/chooseTags',
        component: () => import('../views/chooseTags.vue'),

    },
    {
        path: '/navigation',
        component: () => import('../views/navigation.vue'),

    },
    {
        path: '/home',
        component: () => import('../views/home.vue'),

    },
    {
        path: '/detail',
        component: () => import('../views/detail.vue'),

    },
    {
        path: '/mine',
        component: () => import('../views/mine.vue'),

    },
    {
        path: '/login',
        component: () => import('../views/login.vue'),
    },
    {
        path: '/admin',
        component: () => import('../views/admin.vue'),
        children: [
            {
                path: '',
                redirect: (to) => {
                    return to.path + '/cosmetic'
                }
            },
            {
                path: 'cosmetic',
                component: () => import('../components/admin/cosemtic/Cosmetic.vue'),
                name: '主页'
            },
            {
                path: 'tag',
                component: () => import('../components/admin/tag/Tag.vue'),
                name: '标签'
            },
            // {
            //     path: 'lala',
            //     component: () => import('../components/admin/tag/AddTag.vue'),
            //     name: '添加标签'
            // },
            {
                path: 'user',
                component: () => import('../components/admin/user/User.vue'),
                name: '用户'
            },

        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 前置路由守卫
// router.beforeEach((to, from, next) => {
//     console.log(to, from);
//     if (to.name === '主页' || to.name === "设备管理" || to.name === '修理记录' || to.name === "报废记录" || to.name === "购买申请" || to.name === "申请表") {
//         if (window.sessionStorage.getItem("token")) {
//             next()
//         }
//         else {
//             confirm("请先登录！")
//         }
//     }
//     else {
//         next()
//     }
// })


export default router
