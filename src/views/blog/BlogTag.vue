<template>
  <div style="height: 100%;">

    <table-view :data="data" @current-changed="refreshData" @size-changed="refreshSize">
      <template slot="tool-bar">
        <el-button type="primary" @click="createDialogFormVisible = true" size="medium">新建 <i
                class="el-icon-plus el-icon--right"/></el-button>
      </template>
      <template slot="table-content">
        <el-table-column
                fixed
                prop="id"
                label="标签ID"
                align="center"
                min-width="100">
        </el-table-column>

        <el-table-column
                prop="name"
                label="标签名称"
                align="center"
                min-width="150">
        </el-table-column>

        <el-table-column
                prop="type"
                label="标签类型"
                align="center"
                min-width="150">
        </el-table-column>

        <el-table-column
                prop="sort"
                label="标签排序"
                align="center"
                min-width="150">
        </el-table-column>
        <el-table-column
                prop="createDate"
                align="center"
                label="创建日期"
                min-width="150">
          <template slot-scope="scope">
            {{dateToString(scope.row.createDate)}}
          </template>
        </el-table-column>
        <el-table-column
                prop="updateDate"
                align="center"
                label="更新日期"
                min-width="150">
          <template slot-scope="scope">
            {{dateToString(scope.row.updateDate)}}
          </template>
        </el-table-column>

        <el-table-column
                fixed="right"
                label="操作"
                align="center"
                width="165">
          <template slot-scope="scope" style="text-align: right">
            <el-button slot="reference" type="primary" size="mini" style="margin: 5px;" @click="editTag(scope.row)">编辑
            </el-button>
            <delete-button @onConfirm="removeTag(scope.row.id, scope.$index)"/>

          </template>
        </el-table-column>
      </template>
    </table-view>


    <tag-edit-view :data="addForm" :visible="createDialogFormVisible" @save="addTag"
                   @cancel="createDialogFormVisible = false"/>
    <tag-edit-view :data="editForm" :visible="editDialogFormVisible" @save="updateTag"
                   @cancel="editDialogFormVisible = false"/>
  </div>


</template>

<script>
  import TagAPI from "@/network/tag_api";
  import common from "@/network/common";
  import TableView from "@/components/table/TableView";
  import DeleteButton from "@/components/button/DeleteButton";
  import TagEditView from "@/components/tag/TagEditView";

  export default {
    name: "BlogTag",
    components: {
      TagEditView,
      DeleteButton,
      TableView,
    },
    data() {
      return {
        formLabelWidth: '200px',
        createDialogFormVisible: false,
        editDialogFormVisible: false,
        addForm: {
          name: '',
          type: null,
          sort: 0,
        },
        editForm: {
          name: '',
          type: null,
          sort: 0,
          id: 0,
        },
        data: common.paging,

      }
    },

    created() {
      this.getData();
    },
    methods: {
      getData() {
        TagAPI.getTagList(this.data.currentPage, this.data.size).then(res => {
          this.data = res.data;
        });
      },
      refreshData(page) {
        this.data.currentPage = page - 1;
        this.getData();
      },
      refreshSize(size) {
        this.data.size = size;
        this.data.currentPage = 0;
        this.getData();
      },
      addTag(tag) {
        this.addForm = tag;
        this.createDialogFormVisible = false;
        TagAPI.addTag(this.addForm.name, this.addForm.type, this.addForm.sort).then(res => {
          this.getData();
        });
      },
      removeTag(id, index) {
        TagAPI.removeTag(id).then(res => {
          this.getData();
        });
      },
      editTag(tag) {
        this.editForm.id = tag.id;
        this.editForm.name = tag.name;
        this.editForm.sort = tag.sort;
        this.editForm.type = tag.type;
        this.editDialogFormVisible = true;
      },
      updateTag(tag) {
        this.editForm = tag;
        this.createDialogFormVisible = false;
        TagAPI.updateTag(this.editForm.id, this.editForm.name, this.editForm.type, this.editForm.sort).then(res => {
          this.editDialogFormVisible = false;
          this.getData();
        })
      },

      dateToString(date) {
        return this.$utility.date.format(new Date(date));
      }
    }
  }
</script>

<style scoped>

</style>
