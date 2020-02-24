<template>
    <div>
        <el-form v-model="form" label-width="80px">
            <el-form-item label="标题" >
                <el-input v-model="form.title" ></el-input>
            </el-form-item>
            <el-form-item label="分类" >
                <el-select v-model="form.type" placeholder="请选择分类" >
                    <el-option v-for="c in categories" :label="c.name" :value="c.id" :key="c.id">

                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签">
                <el-checkbox-group v-model="form.tags" >
                    <el-checkbox  :value="t.id" :label="t.id"  size="mini" name="tags" v-for="t in tags" :key="t.id" border @change="tagsChanged" >{{t.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="内容">
                <markdown-editer @input="contentDidChanged" />
            </el-form-item>
            <el-button type="primary" @click="postArticle">提交</el-button>
        </el-form>
    </div>
</template>

<script>
    import CategoryAPI from "@/network/category_api";
    import ArticleAPI from "@/network/article_api";
    import TagAPI from "@/network/tag_api";

    import MarkdownEditer from "@/components/markdown/index"
    export default {
        name: "BlogEdit",
        data() {
            return {
                form: {
                    title: '',
                    type: null,
                    tags:[],
                    content: null,
                },
                categories: [],
                tags: [],
            }
        },
        created() {
            CategoryAPI.getCategoryList(0, 200).then(res => {
                this.categories = res.data;
            });

            TagAPI.getTagList(0, 200).then(res => {
                this.tags = res.data;
            })
        },
        components: {
            MarkdownEditer,
        },
        methods: {
            contentDidChanged(conent) {
                this.form.content = conent;
            },
            postArticle() {
               ArticleAPI.postArticle(this.form.title, this.form.content, this.form.tags, this.form.type).then(res => {
                    console.log(res);
                })
            },
            tagsChanged(item) {
                console.log(item);
            }
        }
    }
</script>

<style scoped>

</style>
