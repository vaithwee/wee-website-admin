<template>
  <el-popconfirm
      title="确定删除吗？"
      icon-color="red"
      @onConfirm="onConfirm"
  >
    <el-button slot="reference" type="danger" size="mini" style="margin: 10px">删除</el-button>
  </el-popconfirm>
</template>

<script>
  export default {
    name: "DeleteButton",
    methods: {
      onConfirm() {
        this.$emit('onConfirm');
      }
    }
  }
</script>

<style scoped>

</style>
