import VueRouter from "vue-router";
import Vue from 'vue'

Vue.use(VueRouter);

const BlogArticle = () => import('@/views/blog/BlogArticle');
const Blog = () => import('@/views/blog/Blog');
const Test = () => import('@/views/Test');

let routes = [
    {
        path: '/',
        redirect: '/blog/article'
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
