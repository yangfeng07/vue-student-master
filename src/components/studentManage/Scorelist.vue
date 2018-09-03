<template>
  <el-row>
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i><span style="margin-left: 5px">学生管理</span></el-breadcrumb-item>
        <el-breadcrumb-item>学生成绩</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <!--中间内容-->
    <el-col :span="24" v-loading="loading" element-loading-text="拼命加载中">
      <!--搜索工具-->
      <el-col :span="24">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input placeholder="学生" v-model="filters.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showAddDialog">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--成绩列表-->
      <el-table @selection-change="handleSelectionChange" :data="scoreList" style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="chinese" label="语文" sortable></el-table-column>
        <el-table-column prop="math" label="数学" sortable></el-table-column>
        <el-table-column prop="english" label="英语" sortable></el-table-column>
        <el-table-column prop="physics" label="物理" sortable></el-table-column>
        <el-table-column prop="chemistry" label="化学" sortable></el-table-column>
        <el-table-column prop="biology" label="生物" sortable></el-table-column>
        <el-table-column prop="total_score" label="总分" sortable></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="small" @click="showEditDialog(scope.$index,scope.row)">修改</el-button>
            <el-button type="danger" @click="deleteScore(scope.$index,scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页按钮-->
      <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="batchDelete" :disabled="this.sels.length===0">批量删除</el-button>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>

      <!--修改界面-->
      <el-dialog title="修改" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="语文" prop="chinese">
            <el-input v-model="editForm.chinese" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="数学" prop="math">
            <el-input v-model="editForm.math" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="英语" prop="english">
            <el-input v-model="editForm.english" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="物理" prop="physics">
            <el-input v-model="editForm.physics" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="化学" prop="chemistry">
            <el-input v-model="editForm.chemistry" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="生物" prop="biology">
            <el-input v-model="editForm.biology" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit">提交</el-button>
        </div>
      </el-dialog>

      <!--新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="语文" prop="chinese">
            <el-input v-model="addForm.chinese" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="数学" prop="math">
            <el-input v-model="addForm.math" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="英语" prop="english">
            <el-input v-model="addForm.english" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="物理" prop="physics">
            <el-input v-model="addForm.physics" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="化学" prop="chemistry">
            <el-input v-model="addForm.chemistry" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="生物" prop="biology">
            <el-input v-model="addForm.biology" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit">提交</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
  import API from '../../api/student';
  export default {
    name: "list",
    data() {
      return {
        filters: {
          name: ''
        },
        loading: false,
        scoreList: [],
        total: 0,
        page: 1,
        sels: [],
        // 修改界面相关数据
        editFormVisible: false,//编辑界面是否显示
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          chinese: [
            {required: true, message: '请输入语文分数', trigger: 'blur'}
          ],
          math: [
            {required: true, message: '请输入数学分数', trigger: 'blur'}
          ],
          english: [
            {required: true, message: '请输入英语分数', trigger: 'blur'}
          ],
          physics: [
            {required: true, message: '请输入物理分数', trigger: 'blur'}
          ],
          chemistry: [
            {required: true, message: '请输入化学分数', trigger: 'blur'}
          ],
          biology: [
            {required: true, message: '请输入生物分数', trigger: 'blur'}
          ]
        },
        editForm: {
          name: '',
          chinese: '',
          math: '',
          english: '',
          physics: '',
          chemistry: '',
          biology: ''
        },
        // 新增界面数据
        addFormVisible: false,//新增界面是否显示
        addFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          chinese: [
            {required: true, message: '请输入语文分数', trigger: 'blur'}
          ],
          math: [
            {required: true, message: '请输入数学分数', trigger: 'blur'}
          ],
          english: [
            {required: true, message: '请输入英语分数', trigger: 'blur'}
          ],
          physics: [
            {required: true, message: '请输入物理分数', trigger: 'blur'}
          ],
          chemistry: [
            {required: true, message: '请输入化学分数', trigger: 'blur'}
          ],
          biology: [
            {required: true, message: '请输入生物分数', trigger: 'blur'}
          ]
        },
        addForm: {
          name: '',
          chinese: '',
          math: '',
          english: '',
          physics: '',
          chemistry: '',
          biology: ''
        },
      }
    },
    methods: {
      // 分页查询
      handleCurrentChange(val){
        this.page = val;
        this.search();
      },
      // 页面首页
      handleSearch(){
        this.page = 1;
        this.search();
      },
      // 条件查询
      search(){
        let that = this;
        let loginParams = {vname: '%'+that.filters.name+'%',page: (that.page-1)*10,limit: 10};
        that.loading = true;
        API.findscoreList(loginParams).then(data => {
          that.loading = false;
          if(data[0]){
            for(var i=0;i<data.length;i++){
              data[i].total_score = data[i].chinese+data[i].math+data[i].english+data[i].physics+data[i].chemistry+data[i].biology;
            }
            that.scoreList = data;
            that.total = data[0].count;
          }else{
            that.$message.error({showClose: true, message: '请求失败', duration: 2000});
          }
        }).catch(function (error) {
          that.loading = false;
          that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        })
      },
      // 显示编辑界面
      showEditDialog(index,row){
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      // 编辑数据提交
      editSubmit(){
        let that = this;
        this.$refs.editForm.validate((valid)=> {
          if(valid){
            this.loading = true;
            let updateParams = Object.assign({}, this.editForm);
            API.updatescoreList(updateParams).then(data => {
              that.loading = false;
              if(data){
                that.$message.success({showClose: true, message: '修改成功', duration: 2000});
                that.editFormVisible = false;
                that.search();
              }else{
                that.$message.error({showClose: true, message: '修改失败', duration: 2000});
              }
            }).catch((error)=>{
              that.loading = false;
              that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
            })
          }
        })
      },
      // 新增界面显示
      showAddDialog(){
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          chinese: '',
          math: '',
          english: '',
          physics: '',
          chemistry: '',
          biology: ''
        };
      },
      // 新增数据提交
      addSubmit() {
        let that = this;
        this.$refs.addForm.validate((valid) =>{
          if(valid){
            that.loading = true;
            let addParams = Object.assign({}, this.addForm);
            API.addscoreList(addParams).then(data=>{
              that.loading = false;
              if(data){
                that.$message.success({showClose: true, message: '添加成功', duration: 2000});
                that.addFormVisible = false;
                that.search();
              }else{
                that.$message.error({showClose: true, message: '添加失败', duration: 2000});
              }
            }).catch((error)=>{
              that.loading = false;
              that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
            })
          }
        })
      },
      // 单个删除
      deleteScore(index,row) {
        let that = this;
        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(()=>{
          that.loading = true;
          API.deletescoreList(row).then(data=>{
            that.loading = false;
            if(data){
              that.$message.success({showClose: true, message: '删除成功', duration: 1500});
              that.search();
            }else{
              that.$message.error({showClose: true, message: '删除失败', duration: 1500});
            }
          }).catch((error)=>{
            that.loading = false;
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          })
        })
      },
      // 批量删除
      handleSelectionChange(val){
        this.sels = val;
      },
      batchDelete() {
        let that = this;
        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(()=>{
          that.loading = true;
          let maxNum = that.sels.length-1;
          for(var i=0;i<that.sels.length;i++){
            API.deletescoreList(that.sels[i]).then(data=>{
              that.loading = false;
              if (data&&i==maxNum) {
                that.$message.success({showClose: true, message: '删除成功', duration: 1500});
                that.search();
              }
            })
          }
        })

      }
    },
    created() {
      this.handleSearch()
    }
  }
</script>

<style scoped lang="scss">
  .toolbar{
    margin-top: 10px;
  }
</style>
