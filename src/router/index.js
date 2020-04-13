import VueRouter from "vue-router";
import Vue from 'vue'

Vue.use(VueRouter);

const BlogArticle = () => import('@/views/blog/BlogArticle');
const BlogEdit = () => import('@/views/blog/BlogEdit');
const BlogCategory = () => import('@/views/blog/BlogCategory');
const BlogTag = () => import('@/views/blog/BlogTag');
const BlogImage = () => import('@/views/blog/BlogImage');
const Blog = () => import('@/views/blog/Blog');
const Home = () => import('@/views/home/Home');
const Test = () => import('@/views/Test');
const blogArticlePreview = () => import('@/views/blog/BlogArticlePreview')

let routes = [
  {
    name: '首页',
    path: '/',
    component: Home
  },
  {
    name: '首页',
    path: '/home',
    component: Home
  },
  {
    name: '博客',
    path: '/blog',
    component: Blog,
    children: [
      {
        name: '文章',
        path: 'article',
        component: BlogArticle
      },
      {
        name: '编辑',
        path: 'edit',
        component: BlogEdit
      },
      {
        name: '分类',
        path: 'category',
        component: BlogCategory
      },
      {
        name: '标签',
        path: 'tag',
        component: BlogTag
      },
      {
        name: '图片',
        path: 'image',
        component: BlogImage
      },
      {
        name: "文字预览",
        path: 'preview',
        component: blogArticlePreview
      }
    ]
  },
  {
    name: 'test',
    path: '/test',
    component: Test
  },
  {
    path: '/login',
    component: Test
  }
];

let router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
