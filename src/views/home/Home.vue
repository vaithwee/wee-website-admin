<template>
  <div>
    <el-row :gutter="30">
      <el-col :sm="24" :xm="24" :md="12" v-if="info">
        <el-card>
          <div slot="header">
            <span>Home Info</span>
            <el-button class="home-info-edit-button" type="text" :class="{'button-hidden':isHomeInfoEdit}"  @click="toOpenHomeInfoEdit">编辑</el-button>
          </div>
          <div>
            <el-form label-position="top" label-width="80px">
              <el-form-item label="封面">
                <el-image :src="this.cover.originalURL" fit="cover" style="height: 200px"/>
                <image-picker @sure="toHandleImageSelected" :hidden="!isHomeInfoEdit">
                  <el-button size="mini" type="primary">选择</el-button>
                </image-picker>

              </el-form-item>
              <el-form-item label="欢迎词">
                <el-input type="text" :value="greeting" :class="{'button-hidden':!isHomeInfoEdit}"  @input="toHandleGreetingInput" />
                <div :hidden="isHomeInfoEdit" v-html="greeting"></div>
              </el-form-item>
              <el-form-item :hidden="!isHomeInfoEdit" style="text-align: right">
                <el-button size="mini" @click="toCancelHomeInfoEdit" >取消</el-button>
                <el-button size="mini" type="primary" @click="toUpdateHomeInfo" >更新</el-button>
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
        images: [],
        isHomeInfoEdit: false,
        homeInfoForm: {
          id: null,
          cover: null,
          greeting: null,
        },
      };
    },
    components: {
      ImagePicker

    },
    created() {
      HomeAPI.getInfo().then(res => {
        this.info = res.data.info;
        this.homeInfoForm.greeting = this.info.greeting;
        this.homeInfoForm.id = this.info.id;
      });
    },
    methods: {
      toHandleImageSelected(image) {
        this.homeInfoForm.cover = image;
      },
      toOpenHomeInfoEdit() {
        this.isHomeInfoEdit = true;
      },
      toCancelHomeInfoEdit() {
        this.isHomeInfoEdit = false;
        this.homeInfoForm.cover = null;
      },
      toUpdateHomeInfo() {
        this.isHomeInfoEdit = false;
        if (this.homeInfoForm.cover === null) {
          this.homeInfoForm.cover = this.info.cover;
        }
        HomeAPI.updateHomeInfo(this.homeInfoForm.id, this.homeInfoForm.cover.id, this.homeInfoForm.greeting).then(res => {
          this.info = res.data;
        });
      },
      toHandleGreetingInput(value) {
        this.homeInfoForm.greeting = value;
      }
    },
    computed: {
      cover() {
        if (this.homeInfoForm.cover !== null) {
          return this.homeInfoForm.cover;
        } else if ( this.info.cover !== null) {
          return this.info.cover;
        } else  {
          return null;
        }
      },
      greeting() {
        if (this.isHomeInfoEdit) {
          return this.homeInfoForm.greeting;
        } else  {
          return this.info.greeting;
        }
      }
    }
  }
</script>

<style scoped>
.home-info-edit-button {
  float: right;
  padding: 3px 0
}

  .button-hidden {
    display: none;
  }
</style>
