<template>
  <div style="width: 100%;">
    <h2>{{data.title}}</h2>
    <div>
      <el-tag style="margin: 5px" type="primary" v-for="tag in data.tags">{{tag.name}}</el-tag>
    </div>
<!--    <el-image :src="data.cover.originalURL" fit="cover" style="width: 100%" />-->
    <markdown   :initialValue="data.content"   theme="dark" style="width: 100%;height: 100%" />
  </div>
</template>

<script>
  import markdown from "@/components/markdown/preview"
  import ArticleAPI from "../../network/article_api";

  export default {
    name: "BlogArticlePreview",
    components: {
      markdown
    },
    data() {
      return {
        data: {
          content: '',
          tags:[],
        },
      }
    },
    created(){
      let id = this.$route.params.id;
      ArticleAPI.getArticleDetail(id).then(res => {
        this.data = res.data;
      })
      // this.data =  this.$route.query.data;
    }
  }
</script>

<style scoped>

</style>