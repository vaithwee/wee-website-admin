<template>
  <div style="height: 100%;" >
    <table-view :data="data" @current-changed="refreshData" @size-changed="refreshSize">
      <template slot="tool-bar">
        <el-button type="primary" @click="$router.push('/blog/edit')" size="medium">新建<i class="el-icon-plus el-icon--right"/></el-button>
      </template>
      <template slot="table-content">
        <el-table-column
                fixed
                prop="id"
                align="center"
                label="id"
                min-width="150">
        </el-table-column>

        <el-table-column
                prop="title"
                align="center"
                label="标题"
                min-width="150">
        </el-table-column>

        <el-table-column
                prop="category.name"
                align="center"
                label="分类"
                min-width="150">
        </el-table-column>

        <el-table-column
                align="center"
                label="标签"
                min-width="150">
          <template slot-scope="scope">
            <el-tag style="margin: 5px;" v-for="tag in scope.row.tags" :key="tag.id">{{tag.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
                prop="content"
                align="center"
                label="内容"
                min-width="300"
                style="max-height: 200px"
        >
          <template slot-scope="scope">
            <span>{{scope.row.content.substr(0, 100)}}</span>
          </template>
        </el-table-column>
        <el-table-column
                prop="createDate"
                align="center"
                label="创建时间"
                min-width="150">
          <template slot-scope="scope">
            {{formatDateString(scope.row.createDate)}}
          </template>
        </el-table-column>
        <el-table-column
                prop="updateDate"
                align="center"
                label="更新时间"
                min-width="150">
          <template slot-scope="scope">
            {{formatDateString(scope.row.updateDate)}}
          </template>
        </el-table-column>

        <el-table-column
                fixed="right"
                align="center"
                label="操作"
                width="240">
          <template slot-scope="scope">
            <el-button type="primary" @click="previewArticle(scope.row)" size="mini">查看</el-button>
            <el-button type="warning" @click="$router.push({path: '/blog/edit', query: {id: scope.row.id}})" size="mini" >编辑</el-button>
            <delete-button @onConfirm="removeArticle(scope.row.id)" />
          </template>
        </el-table-column>
      </template>
    </table-view>
  </div>
</template>

<script>
  import ArticleAPI from "@/network/article_api";
  import TableView from "../../components/table/TableView";
  import common from "@/network/common";
  import DeleteButton from '@/components/button/DeleteButton';

  export default {
    name: "BlogArticle",
    components: {
      TableView,
      DeleteButton
    },
    data() {
      return {
        data: common.paging,
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        ArticleAPI.getArticleList(this.data.currentPage, this.data.size).then(res => {
          console.log(res);
          this.data = res.data;
        });
      },
      refreshData(page) {
        page = page - 1;
        ArticleAPI.getArticleList(page, this.data.size).then(res => {
          console.log(res);
          this.data = res.data;
        });
      },
      refreshSize(size) {
        this.data.size = size;
        this.data.currentPage = 0;
        this.getData();
      },
      formatDateString(date) {
        return this.$utility.date.format( new Date(date));
      },
      previewArticle(article) {
        console.log(article);
        this.$router.push('/blog/preview/' + article.id);
      },
      removeArticle(id) {
        ArticleAPI.removeArticle(id).then(res => {
          this.getData();
        })
      }
    }
  }
</script>

<style scoped>

</style>
