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
                    label="标签ID"
                    width="100">
            </el-table-column>

            <el-table-column
                    prop="name"
                    label="标签名称"
                    width="150">
            </el-table-column>

            <el-table-column
                    prop="type"
                    label="标签类型"
                    width="150">
            </el-table-column>

            <el-table-column
                    prop="sort"
                    label="标签排序"
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
                    <el-button @click="removeTag(scope.row.id, scope.$index)" type="text" size="small">删除</el-button>

                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新增标签" :visible.sync="createDialogFormVisible" center>
            <el-form :model="form">
                <el-form-item label="标签名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="标签类型" :label-width="formLabelWidth">
                    <el-select v-model="form.type" placeholder="请选择标签类型">
                        <el-option label="普通" value="1"></el-option>
                        <el-option label="推荐" value="2"></el-option>
                        <el-option label="热" value="3"></el-option>
                        <el-option label="严肃" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签排序" :label-width="formLabelWidth">
                    <el-input v-model="form.order" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTag">确 定</el-button>
            </div>
        </el-dialog>
    </div>


</template>

<script>
    import TagAPI from "@/network/tag_api";
    import common from "@/network/common";

    export default {
        name: "BlogTag",
        data() {
            return {
                formLabelWidth: '200px',
                createDialogFormVisible: false,
                form: {
                    name: '',
                    type: null,
                    order: 0,
                },
                list:[],
                page: common.page,
                size: common.size,
                maxHeight: 2000,
            }
        },
        mounted() {
            this.maxHeight = this.$refs.table.offsetHeight - this.$refs.toolbar.offsetHeight;
        },
        created() {
            TagAPI.getTagList(this.page, this.size).then(res => {
               this.list = res.data;
            });
        },
        methods: {
            addTag() {
                this.createDialogFormVisible = false;
                TagAPI.addTag(this.form.name, this.form.type, this.form.order).then(res => {
                    console.log(res);
                });
            },
            removeTag(id, index) {
                this.$confirm('此操作将永久删除此标签, 是否继续', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    TagAPI.removeTag(id).then(res => {
                        if (res.result === true) {
                            this.list.splice(index, 1);
                        }
                    });
                })
            }
        }
    }
</script>

<style scoped>

</style>
