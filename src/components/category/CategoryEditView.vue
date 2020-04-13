<template>
  <el-dialog :visible.sync="visible" width="600px" center :title="data.id > 0 ? '编辑分类' : '新增分类'">

    <el-form :model="data">
      <el-form-item label-width="100px" label="分类ID" v-if="data.id > 0">
        <el-input autocomplete="off" v-model="data.id" disabled/>
      </el-form-item>

      <el-form-item label-width="100px" label="分类名称">
        <el-input autocomplete="off" v-model="data.name"/>
      </el-form-item>
    </el-form>
    <div class="dialog-footer" slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button @click="save" type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "CategoryEditView",
    props: {
      visible: {
        type: Boolean,
        default() {
          return false;
        }
      },
      data: {
        type: Object,
        default() {
          return {
            name: '',
            id: null,
          }
        }
      }
    },
    methods: {
      save() {
        this.$emit('save', this.data);
      },
      cancel() {
        this.$emit('cancel');
      }
    }
  }
</script>

<style scoped>

</style>