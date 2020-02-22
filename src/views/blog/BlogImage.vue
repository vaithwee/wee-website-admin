<template>
    <div style="height: 100%;" ref="table">
        <div style="text-align: left;padding: 10px;" ref="toolbar">
            <el-button type="primary" @click="createDialogFormVisible = true">新建</el-button>
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
                    width="100">
            </el-table-column>

            <el-table-column
                    fixed
                    label="预览"
                    width="100">
                <template slot-scope="scope">
                   <el-image :src="scope.row.previewURL"></el-image>
                </template>
            </el-table-column>

            <el-table-column
                    prop="name"
                    label="文件名"
                    width="360">
            </el-table-column>
            <el-table-column
                    prop="key"
                    label="标识"
                    width="360"
            >
            </el-table-column>
            <el-table-column
                    prop="contentType"
                    label="文件类型"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="length"
                    label="文件长度"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="width"
                    label="宽度"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="heigth"
                    label="高度"
                    width="150"
            >
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

        <el-dialog title="新增图片" :visible.sync="createDialogFormVisible" center>
            <el-form :model="form">
                <el-form-item label="图片名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片名称" :label-width="formLabelWidth">
                    <input ref="fileInt" type="file"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="upload" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getImageList, upload} from "@/network/image";
    import common from "@/network/common";


    export default {
        name: "BlogImage",
        data() {
            return {
                formLabelWidth: "120px",
                list: [],
                maxHeight: 2000,
                page: common.page,
                size: common.size,
                form: {
                    name:'',
                    file:null,
                },
                file:null,
                createDialogFormVisible: false
            }
        },
        created() {
            getImageList(this.page, this.size).then(res => {
                console.log(res.data);
                this.list = res.data;
            });
        },
        mounted() {
            this.maxHeight = this.$refs.table.offsetHeight - this.$refs.toolbar.offsetHeight;
        },
        methods: {
            upload() {

                const file = this.$refs.fileInt.files[0];
                console.log(file);
                upload(file, '123123').then(res => {
                    this.createDialogFormVisible = false;
                    if (res.result === true) {
                        this.list.push(res.data);
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>
