import VueRouter from "vue-router";
import Vue from 'vue'

Vue.use(VueRouter);

const BlogArticle = () => import('@/views/blog/BlogArticle');
const BlogEdit = () => import('@/views/blog/BlogEdit');
const BlogCategory = () => import('@/views/blog/BlogCategory');
const Blog = () => import('@/views/blog/Blog');
const Home = () => import('@/views/home/Home');
const Test = () => import('@/views/Test');

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        name: 'blog',
        path: '/blog',
        component: Blog,
        children: [
            {
                name:'博客 文章',
                path: 'article',
                component: BlogArticle
            },
            {
                name: '博客 编辑',
                path: 'edit',
                component: BlogEdit
            },
            {
                name: '博客 分类',
                path: 'category',
                component: BlogCategory
            }
        ]
    },
    {
        name: 'test',
        path: '/test',
        component: Test
    }
];

let router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
