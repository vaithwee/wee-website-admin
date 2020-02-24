<template>
    <div style="height: 100%;" ref="table">
        <div style="text-align: left;padding: 10px;" ref="toolbar">
            <el-button type="primary" @click="createDialogFormVisible = true">新建</el-button>
        </div>
        <el-table
                :data="list"
                style="width: auto;"
                :max-height="maxHeight + 'px'"
                border
        >
            <el-table-column
                    fixed
                    prop="id"
                    label="分类ID"
                    width="100">
            </el-table-column>

            <el-table-column
                    prop="name"
                    label="分类名称"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="createDate"
                    label="创建日期"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="updateDate"
                    label="更新日期"
                    width="150">
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    min-width="100"
                    width="auto" >
                <template slot-scope="scope" style="text-align: right">
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button @click="deleteCategoryWithID(scope.row.id, scope.$index)" type="text" size="small">删除</el-button>

                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新增分类" :visible.sync="createDialogFormVisible" center>
            <el-form :model="form">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCategoryWithName">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import CategoryAPI from "@/network/category_api";
    import common from "@/network/common";

    export default {
        name: "BlogCategory",
        data() {
            return {
                form: {
                    name: '',
                },
                formLabelWidth: '120px',
                createDialogFormVisible: false,
                categoryName: null,
                list: [],
                maxHeight: 2000,
                page: common.page,
                size: common.size
            }
        },
        created() {
           this.initData();
        },
        mounted() {
            this.maxHeight = this.$refs.table.offsetHeight - this.$refs.toolbar.offsetHeight;
        },
        methods: {
            initData() {
                this.page = common.page;
                this.size = common.size;
                CategoryAPI.getCategoryList(this.page, this.size).then(res => {
                    console.log(res);
                    this.list = res.data;
                });
            },
            addCategoryWithName() {
                this.createDialogFormVisible = false;
                CategoryAPI.addCategory(this.form.name).then(res => {
                    if (res.result === false) {
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                        });
                    } else  {
                        this.$notify({
                           title: '分类',
                            message: '分类添加成功',
                        });
                        this.list.push(res.data);
                    }
                });
            },
            deleteCategoryWithID(id, index) {
                CategoryAPI.removeCategoryById(id).then(res => {
                   if (res.result === true) {
                       this.$notify({
                           title: '分类',
                           message: '分类删除成功'
                       });
                       this.list.splice(index, 1);
                   }
                });
            },

        }
    }
</script>

<style scoped>

</style>
