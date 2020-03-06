<template>
  <div>
    <el-row :gutter="30">
      <el-col :sm="24" :xm="24" :md="12">
        <el-card>
          <div slot="header">
            <span>Home Info</span> <el-button type="primary">编辑</el-button>
          </div>
          <div>
            <el-form label-position="top" label-width="80px">
              <el-form-item label="封面">
                <el-image :src="this.info.info.cover.originalURL" fit="cover" style="height: 200px"/>
                <image-picker @sure="toHandleImageSelected"/>

              </el-form-item>
              <el-form-item label="欢迎词">
                <el-input type="text" :value="this.info.info.greeting"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">更新</el-button>
              </el-form-item>
            </el-form>


          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import HomeAPI from "../../network/home_api";
  import ImagePicker from "../../components/image/ImagePicker";

  export default {
    name: "Home",
    data() {
      return {
        info: null,
        images: []
      };
    },
    components: {
      ImagePicker

    },
    created() {
      HomeAPI.getInfo().then(res => {
        this.info = res.data;
      });
    },
    methods: {
      toHandleImageSelected(image) {
        this.info.info.cover = image;
      }
    },
    computed: {
      cover() {
        if (this.info.info.cover !== undefined) {
          return this.info.info.cover;
        }
        return null;
      }
    }
  }
</script>

<style scoped>

</style>
