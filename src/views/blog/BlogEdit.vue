<template>
  <div>
    <el-form v-model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-image v-if="form.cover != null" :src="form.cover.previewURL"/>
        <image-picker @sure="toHandleImagePicker">
          <div slot="default">
            <el-button type="primary" size="mini">选取</el-button>
          </div>
        </image-picker>

      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.type" placeholder="请选择分类">
          <el-option v-for="c in categories" :label="c.name" :value="c.id" :key="c.id">

          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-checkbox-group v-model="form.tags">
          <el-checkbox :value="t.id" :label="t.id" size="mini" name="tags" v-for="t in tags" :key="t.id" border
                       @change="tagsChanged">{{t.name}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="内容">
        <markdown-pro ref="markdown" v-model="form.content" @on-ready="markdownReady" @on-upload-image="uploadImage"/>
      </el-form-item>
      <el-button type="primary" @click="postArticle">提交</el-button>
    </el-form>
  </div>
</template>

<script>
  import CategoryAPI from "@/network/category_api";
  import ArticleAPI from "@/network/article_api";
  import TagAPI from "@/network/tag_api";
  import ImageAPI from "@/network/image_api";

  import {MarkdownPro} from 'vue-meditor';
  import ImagePicker from "@/components/image/ImagePicker";

  export default {
    name: "BlogEdit",
    data() {
      return {
        form: {
          title: '',
          type: null,
          tags: [],
          content: '',
          cover: null,
          id: undefined,
        },
        categories: [],
        tags: [],
        images: [],
        mk: null,
        originalData:null,
      }
    },
    created() {

      let id = this.$route.query.id;
      if (id !== undefined) {
        ArticleAPI.getArticleDetail(id).then(res => {
          this.originalData = res.data;
          this.form.id = id;
          this.form.title = res.data.title;
          this.form.content = res.data.content;
          this.form.type = res.data.category.id;
          let tags = res.data.tags;
          if (tags.length > 0) {
            for (let index = 0; index < tags.length; ++index) {
              this.form.tags.push(tags[index].id);
            }
          }
          this.form.cover = res.data.cover;
        });
      }

      CategoryAPI.getCategoryList(0, 200).then(res => {
        this.categories = res.data.data;
      });

      TagAPI.getTagList(0, 200).then(res => {
        this.tags = res.data.data;
      });

      ImageAPI.getImageList(0, 200).then(res => {
        this.images = res.data.data;
      });
    },
    components: {
      ImagePicker,
      MarkdownPro,
    },
    methods: {
      postArticle() {
        if (this.form.id !== undefined) {
          ArticleAPI.updateArticle(this.form.id, this.form.title, this.form.content, this.form.tags, this.form.type, this.form.cover.id).then(res => {
            console.log(res);
          })
        } else {
          ArticleAPI.postArticle(this.form.title, this.form.content, this.form.tags, this.form.type, this.form.cover.id).then(res => {
            console.log(res);
          })
        }

      },
      tagsChanged(item) {
        console.log(item);
      },
      toHandleImagePicker(val) {
        this.form.cover = val;
      },
      uploadImage(image) {
        console.log('upload');
        ImageAPI.mkupload(image, null).then(res => {
          this.mk.insertContent("![image](" + res.data.originalURL + ")");
        })
      },
      markdownReady(mk) {
        console.log('markdownReady');
        console.log(mk);
        this.mk = mk;
      }
    }
  }
</script>

<style scoped>

</style>
