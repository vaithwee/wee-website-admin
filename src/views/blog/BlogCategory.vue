<template>
    <div style="height: 100%;" ref="table">
        <div style="text-align: left" ref="toolbar">
            <el-button type="primary" @click="dialogFormVisible = true">NEW</el-button>
        </div>
        <el-table
                :data="list"
                style="width: 100%;"
                :max-height="maxHeight + 'px'"
        >
            <el-table-column
                    fixed
                    prop="tid"
                    label="Category ID"
                    min-width="240">
            </el-table-column>

            <el-table-column
                    prop="name"
                    label="Category Name"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="Created Date"
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

        <el-dialog title="新增分类" :visible.sync="dialogFormVisible" center>
            <el-form :model="form">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCategoryWithName">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {addCategory} from "@/network/category";

    export default {
        name: "BlogCategory",
        data() {
            return {
                form: {
                    name: '',
                },
                formLabelWidth: '120px',
                dialogFormVisible: false,
                categoryName: null,
                list: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        tid: '1978123-fa321ft-12312-f123123-f123123'
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        tid: '1978123-fa321ft-12312-f123123-f123123'
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        tid: '1978123-fa321ft-12312-f123123-f123123'
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        tid: '1978123-fa321ft-12312-f123123-f123123'
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        tid: '1978123-fa321ft-12312-f123123-f123123'
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        tid: '1978123-fa321ft-12312-f123123-f123123'
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        tid: '1978123-fa321ft-12312-f123123-f123123'
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        tid: '1978123-fa321ft-12312-f123123-f123123'
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        tid: '1978123-fa321ft-12312-f123123-f123123'
                    },
                ],
                maxHeight: 2000
            }
        },
        created() {

        },
        mounted() {
            this.maxHeight = this.$refs.table.offsetHeight - this.$refs.toolbar.offsetHeight;
        },
        methods: {
            addCategoryWithName() {
                this.dialogFormVisible = false;
                addCategory(this.form.name).then(res => {
                    console.log(res);
                });
            }
        }
    }
</script>

<style scoped>

</style>
