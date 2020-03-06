<template>
  <el-col class="image-picker-item" :span="6" >
    <div class="image-picker-item-image" @click="handleClick">
      <el-image class="image-picker-item-image-el" :src="item.previewURL" fit="cover"/>
    </div>
    <div class="image-picker-item-check" :hidden="!checked" >
      <img src="../../assets/image_picker_checked.png"/>
    </div>

  </el-col>
</template>

<script>
  export default {
    name: "ImagePickerItem",
    props: {
      item: null,
      checked: {
        type: Boolean,
        default() {
          return false;
        }
      },
    },
    data() {
      return {
        isChecked : this.checked
      }
    },
    methods: {
      handleClick() {
        console.log("click");
        // this.isChecked = !this.isChecked;
        this.$emit("checked", this.item);
      }

    }
  }
</script>

<style scoped>
  .image-picker-item {
    height: 100px;
    margin-bottom: 10px;
  }

  .image-picker-item-image {
    height: 100px;
    width: 100px;
  }

  .image-picker-item-image-el {
    width: 100px;
    height: 100px;
  }

  .image-picker-item-check {
    background-color: rgba(0,0,0, 0.25);
    height: 100px;
    width: 100px;
    position:relative;
    top: 0;
    left: 0;
    right: 0;
    margin-top: -100px;
    z-index: 99;
  }

  .image-picker-item-check img {
    position: relative;
    margin-top: 72px;
    margin-left: 5px;
  }
</style>