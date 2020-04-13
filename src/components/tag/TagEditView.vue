<template>
  <el-dialog :title="data.id>0?'编辑标签':'新增标签'" :visible.sync="visible" width="600px" center>
    <el-form :model="data">
      <el-form-item label="标签ID" label-width="100px" v-if="data.id>0">
        <el-input v-model="data.id" auto-complete="off" disabled/>
      </el-form-item>
      <el-form-item label="标签名称" label-width="100px">
        <el-input v-model="data.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="标签类型" label-width="100px">
        <el-select v-model="data.type" placeholder="请选择标签类型">
          <el-option label="普通" value="1"/>
          <el-option label="推荐" value="2"/>
          <el-option label="热" value="3"/>
          <el-option label="严肃" value="4"/>
        </el-select>
      </el-form-item>
      <el-form-item label="标签排序" label-width="100px">
        <el-input v-model="data.sort" auto-complete="off"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "TagEditView",
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
            type: null,
            sort: 0,
            id: null,
          };
        },
      }
    },
    methods: {
      save() {
        this.$emit("save", this.data);
      },
      cancel() {
        this.$emit("cancel", this.data);
      }
    }
  }
</script>

<style scoped>

</style>
