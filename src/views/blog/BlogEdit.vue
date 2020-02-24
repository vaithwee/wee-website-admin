<template>
    <div>
        <el-form v-model="form" label-width="80px">
            <el-form-item label="标题" >
                <el-input v-model="form.title" ></el-input>
            </el-form-item>
            <el-form-item label="封面" >
                <el-image v-if="form.cover != null" :src="form.cover.previewURL"></el-image>
                <el-popover
                        placement="right"
                        width="320"

                        trigger="click">
                    <el-table :data="images"
                              highlight-current-row
                              @current-change="handleCurrentChange"
                    >
                        <el-table-column width="120" property="previewURL" label="日期" >
                            <template slot-scope="scope">
                                <el-image :src="scope.row.previewURL"></el-image>
                            </template>
                        </el-table-column>
                        <el-table-column width="100" property="id" label="名称"></el-table-column>
                        <el-table-column width="50" property="width" label="宽度"></el-table-column>
                        <el-table-column width="50" property="heigth" label="高度"></el-table-column>
                    </el-table>
                    <el-button slot="reference">点击选取</el-button>
                </el-popover>
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
    import ImageAPI from "@/network/image_api";

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
                    cover:null
                },
                categories: [],
                tags: [],
                images: [],
            }
        },
        created() {
            CategoryAPI.getCategoryList(0, 200).then(res => {
                this.categories = res.data;
            });

            TagAPI.getTagList(0, 200).then(res => {
                this.tags = res.data;
            });

            ImageAPI.getImageList(0, 200).then(res => {
                this.images = res.data;
            });
        },
        components: {
            MarkdownEditer,
        },
        methods: {
            contentDidChanged(conent) {
                this.form.content = conent;
            },
            postArticle() {
               ArticleAPI.postArticle(this.form.title, this.form.content, this.form.tags, this.form.type, this.form.cover.id).then(res => {
                    console.log(res);
                })
            },
            tagsChanged(item) {
                console.log(item);
            },
            handleCurrentChange(val) {
                this.form.cover = val;
            }
        }
    }
</script>

<style scoped>

</style>
