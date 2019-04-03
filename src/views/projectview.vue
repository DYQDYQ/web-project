<template>
  <div class="projectview">
    <div class="content">
      <div class="content-left">
        <div class="left-top">
          <div class="title" style="width:100%;"><p>项目描述</p></div>
          <div style="height:calc(100% - 100px);overflow: auto;margin:20px;border:1px solid #d9d9d9;padding:10px;border-radius:10px;">项目简介项目简介项目简介</div>
        </div>
        <div class="left-bottom" id="left-bottom"></div>
      </div>
      <div class="content-right">
        <div class="table-content" style="text-align: center">
          <table class="tbclass" id="introtable"  >
            <tr class="tb_line">
              <td class="line_o" style="width: 12%;" colspan="3">工程名称</td>
              <td class="line_t">智慧建筑平台</td>
              <td class="line_o">工程地址</td>
              <td class="line_t">上海市图书馆</td>
            </tr>
            <tr class="tb_line">
              <td class="line_o" style="width: 12%;" colspan="3">基层单位</td>
              <td class="line_t">智慧建筑平台</td>
              <td class="line_o">项目经理</td>
              <td class="line_t">上海市图书馆</td>
            </tr>
            <tr class="tb_line">
              <td class="line_o" style="width: 12%;" colspan="3">工程编号</td>
              <td class="line_t">智慧建筑平台</td>
              <td class="line_o">建设单位</td>
              <td class="line_t">上海市图书馆</td>
            </tr>
            <tr class="tb_line">
              <td class="line_o" style="width: 12%;" colspan="3">开工日期</td>
              <td class="line_t">智慧建筑平台</td>
              <td class="line_o">计划竣工日期</td>
              <td class="line_t">上海市图书馆</td>
            </tr>
            <tr class="tb_line">
              <td class="line_o" style="width: 12%;" colspan="3">结构设计单位</td>
              <td class="line_t">智慧建筑平台</td>
              <td class="line_o">围护设计单位</td>
              <td class="line_t">上海市图书馆</td>
            </tr>
            <tr class="tb_line">
              <td class="line_o" style="width: 12%;" colspan="3">建筑面积(m2)</td>
              <td class="line_t">智慧建筑平台</td>
              <td class="line_o">地下建筑面积(m2)</td>
              <td class="line_t">上海市图书馆</td>
            </tr>
            <tr class="tb_line">
              <td class="line_o" style="width: 12%;" colspan="3">建筑物总高度(m)</td>
              <td class="line_t">智慧建筑平台</td>
              <td class="line_o" >地上层数/层高(m)</td>
              <td class="line_t">上海市图书馆</td>
            </tr>
            <tr class="tb_line">
              <td class="line_o" style="width: 12%;" colspan="3">地下层数(m)</td>
              <td class="line_t">智慧建筑平台</td>
              <td class="line_o">工程占地面积(m2)</td>
              <td class="line_t">上海市图书馆</td>
            </tr>
            <tr class="tb_line">
              <td class="line_o" style="width: 12%;" colspan="3">土层特征</td>
              <td class="line_t" colspan="3">上海市图书馆</td>
            </tr>
            <tr class="tb_line">
              <td class="linerowspan" rowspan="2">围护结构</td>
              <td class="line_o" style="width: 12%;" colspan="2">围护结构类型</td>
              <td class="line_t" colspan="3">1212</td>
            </tr>
            <tr class="tb_line">
              <td class="line_o" style="width: 12%;" colspan="2">围护桩长(m)</td>
              <td class="line_t" >1212</td>
              <td class="line_o">支撑形式</td>
              <td class="line_t">1212</td>
            </tr>
            <tr class="tb_line">
              <td class="linerowspan" rowspan="4">地基及基础</td>
              <td class="line_o" style="width: 12%;" colspan="2">基坑面积(m2)</td>
              <td class="line_t" >1212</td>
              <td class="line_o">最深挖土深度(m)</td>
              <td class="line_t">112</td>
            </tr>
            <tr class="tb_line">
              <td class="line_o" style="width: 12%;" colspan="2">平均挖土深度</td>
              <td class="line_t" colspan="3">1212</td>
            </tr>
            <tr class="tb_line">
              <td style="width: 2%;color:#333333;background-color:#F4F9FF;" rowspan="2">桩基</td>
              <td class="line_o" style="width: 12%;">桩基类别</td>
              <td class="line_t" >1212</td>
              <td class="line_o">长度/节数</td>
              <td class="line_t">1212</td>
            </tr>
            <tr class="tb_line">
              <td class="line_o" style="width: 12%;">桩设计承载力</td>
              <td class="line_t" colspan="3">1212</td>
            </tr>
            <tr class="tb_line">
              <td class="line_o" style="width: 12%;" colspan="3">结构类型(上部结构)</td>
              <td class="line_t" >1212</td>
              <td class="line_o">结构最大跨度(m)</td>
              <td class="line_t">1212</td>
            </tr>
            <tr class="tb_line">
              <td class="line_o" style="width: 12%;" colspan="3">质量目标</td>
              <td class="line_t">1212</td>
              <td class="line_o">安全目标</td>
              <td class="line_t">1212</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  // import $ from 'jquery'
  export default {
      name: 'projectview',
      data(){
          return{
              projectname:'1212',
              markers:[],
          }
      },
      methods:{
          poiwhere(where){
              console.log(where)
              let that = this;
              var newresult = null;
              AMap.service(["AMap.PlaceSearch"],function () {
                  var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                      city:"",
                  })
                  placeSearch.search(where,function (status,result){
                      if(status == "complete" && result.poiList.pois.length) {
                          newresult = result.poiList.pois[0];
                          that.markerin(newresult);
                      }
                  })
              })
          },
          markerin(newlist) {
              var that = this;
              if(this.markers.length) {
                  for(var j = 0;j<this.markers.length;j++) {
                      this.map.remove(this.markers[j]);
                  }
                  this.markers = [];
              }

              var marker = new AMap.Marker({
                  position: [newlist.location.lng,newlist.location.lat],
              });
              that.map.setCenter(marker.getPosition());
              var infoWindow = new AMap.InfoWindow({
                  isCustom:true,
                  offset: new AMap.Pixel(10,-30)
              });
              marker.setMap(this.map);
              this.markers.push(marker);
              that.map.setZoom(16);
              infoWindow.setContent(that.createInfoWindow('智慧建筑平台','上海市图书馆'));
              infoWindow.open(that.map, marker.getPosition());
          },
          createInfoWindow(title, content){
              var that = this;
              let Id = title;
              var info = document.createElement("div");
              info.className = "info";
              var top = document.createElement("div");
              var titleD = document.createElement("div");
              top.className = "info-top";
              titleD.innerHTML = title;
              top.appendChild(titleD);
              info.appendChild(top);
              var middle = document.createElement("div");
              var middlein = document.createElement("div");
              middlein.className = "middleone";
              var middlein = document.createElement("div");
              middlein.className = "middleone";
              middlein.innerHTML = "<span class='middlec'>地址： "+"<span style = 'font-weight:normal'>" +content+"</span>"+"</span>";
              middle.appendChild(middlein);
              middle.className = "info-middle";
              info.appendChild(middle);
              return info;
          }
      },
      mounted(){
          let that = this;
          //为地图指定容器
          that.$nextTick(function () {
              that.map = new AMap.Map('left-bottom',{
                  resizeEnable: true,
              })
          })
          that.poiwhere('上海市图书馆');
      },
  }
</script>
<style>
  .projectview {padding: 22px;background-color: #dae3ef;height: calc(100% - 100px);}
  .projectview .content {width:100%;height:100%;background-color: #ffffff}
  .projectview .content-left {width:43%;height:100%;float:left;box-shadow: 0px 0px 10px #ddd;padding:5px 5px 0px 5px;}
  .projectview .content-right {width:57%;height:100%;float:right;padding:5px;box-shadow: 0px 0px 10px #ddd;}
  .projectview .left-top {height: 40%;min-height:150px;width: 100%;margin-bottom: 10px;box-shadow: 0px 0px 10px #ddd;padding: 0px;text-align: left}
  .projectview .left-bottom {height:calc(60% - 10px);min-height:calc(60% - 150px);width: 100%;box-shadow: 0px 0px 10px #ddd;}
  .projectview .title {height:60px;line-height:60px;font-weight:700;padding-left:10px;font-size:15px;border-bottom: 1px solid #eeeeee;}
  .projectview #introtable {width:100%;height:100%;}
  tr:nth-child(odd) {background-color:#F4F9FF;}
  .projectview .table-content {width:100%;height:100%;overflow-y: auto;}
  .projectview .tb_line {width: 100%;height: 30px;}
  .projectview .line_o {font-weight:600;width: 20%;height: 30px;padding: 0px 18px;color: #333333;font-size:13px}
  .projectview .line_t {width: 30%;color:#333333a6;font-size:13px;}
  .projectview .linerowspan {width: 6%;text-align: center;color:#333333;font-weight:600;background-color:#F4F9FF;}
  /*地图提示框*/
  .projectview .info{width: 250px;height: auto;border: 1px solid #cdcbcb;border-radius: 10px;padding: 5px 0px 10px 0px;background-color: #ffffff;}
  .projectview .info:after{content: "";width: 20px;height: 20px;display: block;position: absolute;background: url("http://webapi.amap.com/images/sharp.png") no-repeat;background-size: 100% auto;left: calc(50% - 10px);bottom: -18px;}
  .projectview .info-top{text-align: left;font-size: 16px;height: 30px;line-height: 30px;font-weight: 800;display: -webkit-box;overflow: hidden;text-overflow:ellipsis;-webkit-line-clamp:1;margin-bottom: 5px;-webkit-box-orient: vertical;border-bottom: 1px solid #cdcbcb;padding: 0px 10px;}
  .projectview .info-middle {text-align: left;font-size: 12px;color: #333232;height: 36px;overflow-y: auto;padding: 0px 10px;}
</style>