<template>
  <div style="height: 100%;" ref="table">
    <div style="text-align: left;padding: 10px;" ref="toolbar">
      <el-button type="primary" size="medium" @click="createDialogFormVisible = true">上传<i
          class="el-icon-upload el-icon--right"/></el-button>
      <el-pagination style="float: right"
                     background
                     :page-size="pageModel.size"
                     :current-page="pageModel.currentPage+1"
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
          prop="id"
          label="id"
          align="center"
          width="100">
      </el-table-column>

      <el-table-column
          label="预览"
          width="220"
          align="center"
      >
        <template slot-scope="scope">
          <a :href="scope.row.originalURL" target="_blank">
            <el-image :src="scope.row.previewURL" fit="cover" style="width: 180px;height: 100px"/>
          </a>
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
          prop="height"
          label="高度"
          align="center"
          min-width="100"
      >
      </el-table-column>
      <el-table-column
          prop="createDate"
          label="上传时间"
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
          <el-popconfirm
              title="确定删除吗？"
              icon-color="red"
              @onConfirm="toDeleteImage(scope.row.id, index)"
          >
            <el-button slot="reference" type="danger" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="新增图片" :visible.sync="createDialogFormVisible" width="600px" style="" center>
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="如不填写, 将使用默认名称"/>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <input ref="fileInt" type="file"/>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createDialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="upload" :loading="loading" size="small">{{loading ? '上传中' : '确 定'}}</el-button>
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
        formLabelWidth: "100px",
        list: [],
        maxHeight: 2000,
        page: common.page,
        size: common.size,
        form: {
          name: '',
          file: null,
        },
        file: null,
        visible: true,
        createDialogFormVisible: false,
        pageModel: {
          size: 0,
          total: 0,
          currentPage: 0,
          totalPage: 0,
        },
        loading: false,
        imgs: ['http://image.vaith.xyz/1f98147c-50c0-4036-aabd-d2dc8c50ada7?e=1586421187&token=jkQxatRbEmkgdq6t2nFPi_TOdl6_1yRBboSJXC2M:BLOOthZNrJSa4biM50Vt-N_qNTo='],
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
        this.loading = true;
        const file = this.$refs.fileInt.files[0];
        console.log(file);
        ImageAPI.upload(file, this.form.name).then(res => {
          this.createDialogFormVisible = false;
          this.loading = false;
          if (res.result === true) {
            this.list.unshift(res.data);
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
      },
      toDeleteImage(id, index) {
        ImageAPI.remove(id).then(res => {
          if (res.result === true) {
            this.list.splice(index, 1);
          }
        })
      }
    }
  }
</script>

<style scoped>
  .text-center {
    text-align: center;
    /*max-height: 100%;*/
  }

  .image-list-table {
    height: var(--wwa-max-table-height);
  }
</style>
