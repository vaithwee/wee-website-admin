<template>
    <div>
        <el-form v-model="form" label-width="80px">
            <el-form-item label="标题" >
                <el-input v-model="form.name" ></el-input>
            </el-form-item>
            <el-form-item label="分类" >
                <el-select v-model="form.type" placeholder="请选择分类" >
                    <el-option v-for="c in categories" :label="c.name" :value="c.id" :key="c.id">

                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签">
                <el-checkbox-group v-model="form.tags">
                    <el-checkbox :label="t.name" :value="t.id" name="tags" v-for="t in tags" :key="t.id"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="内容">
                <markdown-editer />
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import {getCategoryList} from "@/network/category";
    import {getTagList} from "@/network/tag";

    import MarkdownEditer from "@/components/markdown/index"
    export default {
        name: "BlogEdit",
        data() {
            return {
                form: {
                    name: '',
                    type: null,
                    tags:[]
                },
                categories: [],
                tags: [],
            }
        },
        created() {
            getCategoryList(0, 200).then(res => {
                this.categories = res.data;
            });

            getTagList(0, 200).then(res => {
                this.tags = res.data;
            })
        },
        components: {
            MarkdownEditer,
        }
    }
</script>

<style scoped>

</style>
