<template>
  <div style="height: 100%;">
    <table-view :data="data" @current-changed="refreshData" @size-changed="refreshSize">
      <template slot="tool-bar">
        <el-button @click="createDialogFormVisible = true" type="primary" size="medium">新建 <i
                class="el-icon-plus el-icon--right"/></el-button>
      </template>
      <template slot="table-content">
        <el-table-column
                fixed
                label="分类ID"
                align="center"
                prop="id"
                min-width="100">
        </el-table-column>

        <el-table-column
                label="分类名称"
                align="center"
                prop="name"
                min-width="150">
        </el-table-column>
        <el-table-column
                label="创建日期"
                prop="createDate"
                align="center"
                min-width="150">
          <template slot-scope="scope">
            {{dateToString(scope.row.createDate)}}
          </template>
        </el-table-column>
        <el-table-column
                label="更新日期"
                prop="updateDate"
                align="center"
                min-width="150">
          <template slot-scope="scope">
            {{dateToString(scope.row.updateDate)}}
          </template>
        </el-table-column>

        <el-table-column
                fixed="right"
                label="操作"
                align="center"
                width="150">
          <template slot-scope="scope" style="text-align: right">
            <el-button slot="reference" type="primary" size="mini" class="operation-button"
                       @click="editCategory(scope.row)">编辑
            </el-button>
            <delete-button @onConfirm="deleteCategoryWithID(scope.row.id, scope.$index)" class="operation-button"/>

          </template>
        </el-table-column>
      </template>
    </table-view>

    <category-edit-view :data="addForm" :visible="createDialogFormVisible" @cancel="createDialogFormVisible = false"
                        @save="addCategory"/>
    <category-edit-view :data="editForm" :visible="editDialogFormVisible" @cancel="editDialogFormVisible = false"
                        @save="updateCategory"/>

  </div>
</template>

<script>
  import CategoryAPI from "@/network/category_api";
  import common from "@/network/common";
  import TableView from "@/components/table/TableView";
  import DeleteButton from "@/components/button/DeleteButton";
  import DateUtil from "../../util/date_util";
  import CategoryEditView from "../../components/category/CategoryEditView";

  export default {
    name: "BlogCategory",
    components: {
      DeleteButton,
      TableView,
      CategoryEditView
    },
    data() {
      return {
        addForm: {
          name: '',
        },
        editForm: {
          id: null,
          name: '',
        },
        formLabelWidth: '120px',
        createDialogFormVisible: false,
        editDialogFormVisible: false,
        data: common.paging,
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        CategoryAPI.getCategoryList(this.data.currentPage, this.data.size).then(res => {
          console.log(res);
          this.data = res.data;
        });
      },
      refreshData(page) {
        this.data.currentPage = page - 1;
        this.getData();
      },
      refreshSize(size) {
        this.data.currentPage = 0;
        this.data.size = size;
        this.getData();
      },
      addCategory(cate) {
        console.log('save');
        this.addForm = cate;
        this.createDialogFormVisible = false;
        CategoryAPI.addCategory(this.addForm.name).then(res => {
          this.getData();
          this.$notify({
            title: '分类',
            message: '分类添加成功',
          });
        });
      },
      deleteCategoryWithID(id, index) {
        CategoryAPI.removeCategoryById(id).then(res => {
          this.$notify({
            title: '分类',
            message: '分类删除成功'
          });
          this.getData();
        });
      },
      editCategory(cate) {
        this.editForm = cate;
        this.editDialogFormVisible = true;
      },
      updateCategory(cate) {
        this.editForm = cate;
        this.editDialogFormVisible = false;
        CategoryAPI.updateCategory(this.editForm.id, this.editForm.name).then(res => {
          this.getData();
        });
      },
      dateToString(date) {
        return DateUtil.dateFormat('HH:mm:ss M月d日, YYYY', new Date(date));
      },

    }
  }
</script>

<style scoped>

</style>
