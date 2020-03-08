<template>
  <div>
    <el-button type="primary"
               size="small"
               icon="el-icon-arrow-left"
               @click="toChangePage(page.currentPage - 1)"
               :disabled="page.currentPage===0">上一页</el-button>
    <el-button type="primary"
               size="small"
               v-for="item in page.totalPage"
               :key="item"
               :autofocus="page.currentPage===item-1"
               @click="toChangePage(item-1)"
               plain>{{item}}
    </el-button>
    <el-button
        type="primary"
        size="small"
        @click="toChangePage(page.currentPage + 1)"
        :disabled="page.currentPage===page.totalPage-1">下一页<i
        class="el-icon-arrow-right el-icon--right"></i></el-button>
  </div>
</template>

<script>
  export default {
    name: "PageBar",
    props: {
      page: {
        type: Object,
        default() {
          return null;
        }
      }
    },
    data() {
      return {
        arr: 10,
      }
    },
    methods: {
      toChangePage(page) {
        this.$emit("valueChanged", page);
      }
    }
  }
</script>

<style scoped>

</style>
