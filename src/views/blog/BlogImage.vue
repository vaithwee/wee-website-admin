<template>
  <div style="height: 100%;" ref="table">
    <div style="text-align: left;padding: 10px;" ref="toolbar">
      <el-button type="primary" size="medium" @click="createDialogFormVisible = true">上传<i class="el-icon-upload el-icon--right" /></el-button>
      <el-pagination style="float: right"
                     :page-size="pageModel.size"
                     :current-page="pageModel.currentPage"
                     :pager-count="pageModel.totalPage"
                     layout="prev, pager, next"
                     @current-change="pageValueChanged"
                     :total="pageModel.total">
      </el-pagination>
    </div>
    <el-table
            :data="list"
            :max-height="maxHeight + 'px'"
            border
            class="text-center"
    >
      <el-table-column
              fixed
              prop="id"
              label="id"
              align="center"
              width="100">
      </el-table-column>

      <el-table-column
              fixed
              label="预览"
              width="220"
              align="center"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.previewURL" fit="cover" style="width: 200px;height: 100px"/>
        </template>
      </el-table-column>

      <el-table-column
              prop="originalName"
              label="名称"
              align="center"
              min-width="180">
      </el-table-column>

      <el-table-column
              prop="name"
              label="自增名"
              align="center"
              min-width="360">
      </el-table-column>


      <el-table-column
              prop="key"
              label="标识"
              align="center"
              min-width="360"
      >
      </el-table-column>
      <el-table-column
              prop="contentType"
              label="文件类型"
              align="center"
              min-width="100"
      >
      </el-table-column>
      <el-table-column
              prop="length"
              label="文件长度"
              align="center"
              min-width="100"
      >
      </el-table-column>
      <el-table-column
              prop="width"
              label="宽度"
              align="center"
              min-width="100"
      >
      </el-table-column>
      <el-table-column
              prop="heigth"
              label="高度"
              align="center"
              min-width="100"
      >
      </el-table-column>
      <el-table-column
              align="center"
              label="操作"
              fixed="right"
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
        <el-button type="primary" @click="upload">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ImageAPI from "@/network/image_api";
  import common from "@/network/common";


  export default {
    name: "BlogImage",
    components: {},
    data() {
      return {
        formLabelWidth: "120px",
        list: [],
        maxHeight: 2000,
        page: common.page,
        size: common.size,
        form: {
          name: '',
          file: null,
        },
        file: null,
        createDialogFormVisible: false,
        pageModel: {
          size: 0,
          total: 0,
          currentPage: 0,
          totalPage: 0,
        },
      }
    },
    created() {
      ImageAPI.getImageList(this.page, this.size).then(res => {
        console.log(res.data);
        this.list = res.data.data;
        this.pageModel = res.data;
      });
    },
    mounted() {
      this.maxHeight = this.$refs.table.offsetHeight - this.$refs.toolbar.offsetHeight;
    },
    methods: {
      upload() {

        const file = this.$refs.fileInt.files[0];
        console.log(file);
        ImageAPI.upload(file, this.form.name).then(res => {
          this.createDialogFormVisible = false;
          if (res.result === true) {
            this.list.push(res.data);
          }
        })

      },
      pageValueChanged(page) {
        this.page = page - 1;
        ImageAPI.getImageList(this.page, this.size).then(res => {
          console.log(res.data);
          this.list = res.data.data;
          this.pageModel = res.data;
        });
      }
    }
  }
</script>

<style scoped>
  .text-center {
    text-align: center;
  }
</style>
