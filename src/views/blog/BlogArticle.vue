<template>
    <div style="height: 100%;" ref="table">
        <div style="text-align: left;padding: 10px;" ref="toolbar">
            <el-button type="primary" @click="$router.push('/blog/edit')">新建</el-button>
        </div>
        <el-table
                :data="list"
                style="width: 100%;"
                :max-height="maxHeight + 'px'"
                border
                >
            <el-table-column
                    fixed
                    prop="id"
                    label="id"
                    width="150">
            </el-table-column>

            <el-table-column
                    prop="category.name"
                    label="分类"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="内容"
                    width="300"
                    style="max-height: 200px"
            >
                <template slot-scope="scope" style="text-align: right">
                   <span>{{scope.row.content.substr(0, 100)}}</span>

                </template>
            </el-table-column>
            <el-table-column
                    prop="createDate"
                    label="创建时间"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="updateDate"
                    label="更新时间"
                    width="150">
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getArticleList} from "@/network/article";

    export default {
        name: "BlogArticle",
        data() {
            return {
                list: [],
                maxHeight: 2000
            }
        },
        created() {
            getArticleList(0, 20).then(res => {
               console.log(res);
               this.list = res.data;
            });
        },
        mounted() {
            this.maxHeight = this.$refs.table.offsetHeight - this.$refs.toolbar.offsetHeight;
        }
    }
</script>

<style scoped>

</style>
