import { ElMessage } from 'element-plus';
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
        name: '登录',
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
router.beforeEach((to, from, next) => {
    console.log(to, from);
    if (to.name !== '登录') {
        if (window.sessionStorage.getItem("token")) {
            next()
        }
        else {
            ElMessage.error('请先登录！')
            router.push('/login')
        }
    }
    else {
        next()
    }
})


export default router
