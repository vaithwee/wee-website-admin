<template>
  <div>
    <el-popover
            placement="right"
            width="430" v-model="visible" @show="toShowImageList">
      <scroll style="width: 100%;height: 400px;">
        <el-row :gutter="10">
          <image-picker-item v-for="(item, index) in this.images"
                             :key="index"
                             :item="item"
                             :checked="isChecked(item)"
                             @checked="toHandleCheckedItem"/>
        </el-row>

      </scroll>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="sure">确定</el-button>
      </div>
      <el-button type="primary" slot="reference">更换</el-button>
    </el-popover>
  </div>
</template>

<script>
  import ImageAPI from "../../network/image_api";
  import Scroll from "../Scroll";
  import ImagePickerItem from "./ImagePickerItem";

  export default {
    name: "ImagePicker",
    components: {
      Scroll,
      ImagePickerItem,
    },
    data() {
      return {
        visible: false,
        images: [],
        currentCheckedItem: null,
      }
    },
    methods: {
      toShowImageList() {
        if (this.images.length === 0) {
          ImageAPI.getImageList(0, 20).then(res => {
            this.images = res.data;
          });
        }
      },
      toHandleCheckedItem(item) {
        console.log(item);
        this.currentCheckedItem = item;
      },
      isChecked(item) {
        if (this.currentCheckedItem === undefined || this.currentCheckedItem === null) {
          return false;
        }
        return this.currentCheckedItem.id === item.id;

      },
      cancel() {
        this.visible = false;
      },
      sure() {
        this.visible = false;
        this.$emit("sure", this.currentCheckedItem);
      }
    },
  }
</script>

<style scoped>

</style>