<template>
  <div class="add-swiper-demo">
      <el-form :model="formData">
          <el-form-item label="轮播图标题" >
              <el-input v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="轮播图书籍">                                       <!-- @change 事件点击以后拿到一个框 -->
             <el-select v-model="formData.category" @change="categoryChange">   <!-- 将caregoryData中的数据遍历渲染到这里面 -->
                <el-option v-for="(item , index) in categoryData"               
                :key="index"
                :label="item.title"
                :value="item._id"
                >       
                </el-option>
             </el-select>

            <div class="book-item clearfix" v-if="getBookItem[0]">
              <div class="img-warp">
                  <img :src="getBookItem[0].img" >
              </div>
              <div class="book-desc">
                <div class="title">
                    标题 ： {{getBookItem[0].title}}
                </div>
                <div class="author">
                    作者 ： {{getBookItem[0].author}}
                </div>
              </div>
            </div>
              
          </el-form-item>
      </el-form>
      
      <el-dialog title="书籍列表" :visible.sync="isShowDialog">
  <el-table :data="bookData">
    <el-table-column property="title" label="书名" width="150"></el-table-column>
    <el-table-column property="name" label="书籍头图" width="120"> 
       <template slot-scope="scope">
           <img :src="scope.row.img" class="img-item">
       </template>
    </el-table-column>
    <el-table-column property="author" label="作者"></el-table-column>
    <el-table-column  label="操作 ">
        <template slot-scope="scope">
            <el-button type="primary" size="samll" @click="handleAddBook(scope.row._id)">
                添加图书
            </el-button>
        </template>
    </el-table-column>
  </el-table>
</el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        title: "",
        img: "",
        book: "",
        index: "",
        category: ""    //分类的Id
      },
      categoryData: [],   //这个是分类的选项
      bookData: [],
      bookCount: 0, //做一下分页
      isShowDialog: false
    };
  },
  methods: {
    //  获取所有的分类数据
    getCategory(){
      this.$axios.get('/category').then(res =>{
        // console.log(res)  
        this.categoryData = res.data      //将数据放到categoryData里面
      })
    },
    // categoryData() {}  
    getBookData() {
      this.$axios.get(`/category/${this.formData.category}/books`).then(res => {
        console.log(res)
        this.bookData = res.data.books;
        this.bookCount = res.count;
      });
    },
    categoryChange() {
      this.isShowDialog = true;
      this.getBookData();
    },
    handleAddBook(id){
        this.isShowDialog = false;
        this.formData.book = id
    }
  },
  created() {
    this.getCategory();  //在钩子函数中执行getCategory()这个方法
  },
  computed:{
    getBookItem(){
      if(this.formData.book ){ // 如果有值则用户已经选择了一本书
        return this.bookData.filter(item => item._id == this.formData.book)
      }else{
        return []
      }
    }
  }
   
};
</script>

<style scoped lang="scss">
.book-item{
  border-radius: 10px;
  margin-top: 50px;
  width: 430px;
  padding: 15px;
  border: 1px solid #999;
  background: #f1f1f1;
  .img-warp{
    float: left;
    width: 100px;
    height: 120px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .book-desc {
    float: left;
    margin-left: 20px;
    .title {
      color: #333;
      font-weight: 700;
      font-size: 15px;
    }
    .author {
      color: #555
    }
  }
}
</style>