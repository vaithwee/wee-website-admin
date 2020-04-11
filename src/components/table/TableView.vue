<template>
  <div style="height: 100%;" ref="table">
    <div style="text-align: left;padding: 10px;" ref="toolbar">
      <slot name="tool-bar"></slot>
      <el-pagination style="float: right"
                     background
                     :page-size="data.size"
                     :current-page="data.currentPage+1"
                     :pager-count="5"
                     layout="prev, pager, next, sizes, total"
                     @current-change="currentChanged"
                     @size-change="sizeChanged"
                     :total="data.total">
      </el-pagination>
    </div>
    <el-table
        :data="data.data"
        :max-height="maxHeight + 'px'"
        border
        class="text-center"
    >
      <slot name="table-content"></slot>
    </el-table>
  </div>
</template>

<script>
  import common from "@/network/common";
  export default {
    name: "TableView",
    props: {
      data: {
        type: Object,
        default() {
          return {

          }
        }
      }
    },
    data() {
      return {
        maxHeight:2000,
      };
    },
    methods: {
      currentChanged(current) {
        this.$emit("current-changed", current);
      },
      sizeChanged(size) {
        this.$emit("size-changed", size);
      }
    },
    mounted() {
      this.maxHeight = this.$refs.table.offsetHeight - this.$refs.toolbar.offsetHeight;
    },
  }
</script>

<style scoped>

</style>
