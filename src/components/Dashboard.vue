<template>
  <el-row>
    <!--导航面包屑-->
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="iconfont icon-home"></i><span style="margin-left: 5px">首页</span></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24">
      <el-row class="botCont">
        <el-col :span="12">
          <div id="chartColumn" style="height: 400px"></div>
        </el-col>
        <el-col :span="12">
          <div id="chartBar" style="height: 400px"></div>
        </el-col>
        <el-col :span="12">
          <div id="chartLine" style="height:400px;"></div>
        </el-col>
        <el-col :span="12">
          <div id="chartPie" style="height: 400px"></div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "dashboard",
    data() {
      return {
        chartColumn: null,
        chartBar: null,
        chartLine: null,
        chartPie: null
      };
    },
    mounted() {
      // 初始化echarts实例
      this.chartColumn = echarts.init(document.getElementById('chartColumn'));
      this.chartBar = echarts.init(document.getElementById('chartBar'));
      this.chartLine = echarts.init(document.getElementById('chartLine'));
      this.chartPie = echarts.init(document.getElementById('chartPie'));

      this.chartColumn.setOption({
        title: { text: '及格数' },
        tooltip: {},
        xAxis: {
          data: ["语文", "数学", "英语", "物理", "化学", "生物"]
        },
        yAxis: {},
        series: [{
          name: '科目',
          type: 'bar',
          data: [30, 20, 36, 10, 10, 20]
        }]
      });

      this.chartBar.setOption({
        title: {
          text: '及格率对比'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2017年', '2018年']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['生物', '化学', '物理', '英语', '数学', '语文']
        },
        series: [
          {
            name: '2017年',
            type: 'bar',
            data: [22, 15, 15, 30, 19, 25]
          },
          {
            name: '2018年',
            type: 'bar',
            data: [20, 10, 10, 36, 20, 30]
          }
        ]
      });

      this.chartLine.setOption({
        title: {
          text: '平均分'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['平均分走势']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '平均分',
            type: 'line',
            stack: '总量',
            data: [450, 470, 436, 531, 499, 536, 560]
          }
        ]
      });

      this.chartPie.setOption({
        title: {
          text: '分数占比',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['200-300', '300-400', '400-500', '500-600', '600-700']
        },
        series: [
          {
            name: '占比',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 20, name: '200-300' },
              { value: 30, name: '300-400' },
              { value: 45, name: '400-500' },
              { value: 25, name: '500-600' },
              { value: 15, name: '600-700' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    }
  }
</script>

<style scoped lang="scss">
  .botCont{
    .el-col{
      padding: 30px 20px;
    }
  }
</style>
