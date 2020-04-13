<template>
  <div style="height: 100%;">
    <table-view :data="data" @current-changed="refreshData" @size-changed="refreshSize">
      <template slot="tool-bar">
        <el-button type="primary" size="medium" @click="createDialogFormVisible = true">上传 <i
                class="el-icon-upload el-icon--right"/></el-button>
      </template>
      <template slot="table-content">
        <el-table-column
                prop="id"
                label="id"
                fixed
                align="center"
                width="100">
        </el-table-column>

        <el-table-column
                label="预览"
                fixed
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
                prop="server.text"
                label="服务器"
                align="center"
                min-width="100"
        >
        </el-table-column>
        <el-table-column
                prop="bucket.text"
                label="空间"
                align="center"
                min-width="100"
        >
        </el-table-column>
        <el-table-column
                prop="type.text"
                label="访问控制"
                align="center"
                min-width="100"
        >
        </el-table-column>
        <el-table-column
                label="上传时间"
                align="center"
                min-width="200"
        >
          <template slot-scope="scope">
            <span>{{dateToString(scope.row.createDate)}}</span>
          </template>
        </el-table-column>
        <el-table-column
                align="center"
                label="操作"
                fixed="right"
                width="150">
          <template slot-scope="scope">
            <delete-button @onConfirm="deleteImage(scope.row.id)"/>
          </template>
        </el-table-column>
      </template>
    </table-view>

    <el-dialog title="新增图片" :visible.sync="createDialogFormVisible" width="600px" style="" center>
      <el-form :model="form">
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="form.name" autocomplete="off" placeholder="如不填写, 将使用默认名称"/>
        </el-form-item>
        <el-form-item label="图片" label-width="100px">
          <input ref="fileInt" type="file"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createDialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="uploadImage" :loading="loading" size="small">{{loading ? '上传中' : '确 定'}}
        </el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import ImageAPI from "@/network/image_api";
  import common from "@/network/common";
  import DateUtil from "../../util/date_util";
  import TableView from "@/components/table/TableView";
  import DeleteButton from "@/components/button/DeleteButton";

  export default {
    name: "BlogImage",
    components: {
      TableView,
      DeleteButton
    },
    data() {
      return {
        //table data
        data: {
          size: common.size,
          total: 0,
          currentPage: 0,
          totalPage: 0,
          data: []
        },
        //form data
        form: {
          name: '',
        },

        createDialogFormVisible: false,
        loading: false,
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        ImageAPI.getImageList(this.data.currentPage, this.data.size).then(res => {
          this.data = res.data;
        });
      },
      refreshData(page) {
        page = page - 1;
        ImageAPI.getImageList(page, this.data.size).then(res => {
          this.data = res.data;
        });
      },
      refreshSize(size) {
        this.data.size = size;
        this.data.currentPage = 0;
        this.getData();
      },
      uploadImage() {
        this.loading = true;
        const file = this.$refs.fileInt.files[0];
        ImageAPI.upload(file, this.form.name).then(res => {
          this.createDialogFormVisible = false;
          this.loading = false;
          this.getData();
          this.$notify({title: '提示', message: '上传成功!', type: 'success'});
        })
      },
      deleteImage(id) {
        ImageAPI.remove(id).then(res => {
          this.getData();
          this.$notify({title: '提示', message: '删除成功!', type: 'success'});

        })
      },
      dateToString(date) {
        return DateUtil.dateFormat('HH:mm:ss M月d日, YYYY', new Date(date));
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
