<template>
    <div id="map" class="map">
    </div>
</template>

<script src="https://webapi.amap.com/loca?v=1.3.2&key=37a3fd50dee86a0ebf48322f0d3e434a"></script>
<script>

import axios from 'axios';
import AMap from 'vue-amap';
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
  name: 'carInfo',
  mounted() {
    axios.get('api/message/getPositions').then(res=>{
        this.citys=res.data;
        AMapLoader.load({
            "key": "37a3fd50dee86a0ebf48322f0d3e434a", // 申请好的Web端开发者Key，首次调用 load 时必填
            "version": "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            "plugins": [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等

            "Loca": { // 是否加载 Loca， 缺省不加载
                "version": '1.3.2' // Loca 版本，缺省 1.3.2
            },
        }).then((AMap) => {
            var map = new AMap.Map('map',{
                mapStyle: 'amap://styles/db9efe6a1745ac24b7269b862f359536',
                zoom: 4.5,
                center: [119.198, 26.05942]            
            });
            var layer = new Loca.ScatterPointLayer({
                map: map
            });
            layer.setData(JSON.parse(this.citys.substr(12)), {
                lnglat: 'lnglat'   // 指定坐标数据的来源，数据格式: 经度在前，维度在后，数组格式。
            });

            // 配置样式
            layer.setOptions({
                unit: 'px',
                style: {
                    radius: 8,     // 圆形半径，单位像素
                    color: '#14B4C9', // 填充颜色
                    borderWidth: 0.5,   // 边框宽度
                    borderColor: '#14B4C9'  // 边框颜色
                }
            });

            layer.render();
        }).catch(e => {
            console.log(e);
        });        
    })


  },
  data(){
    return{
        citys:null
    }    
  }
}
</script>
<style scoped>
    .map{
        width: -webkit-fill-available;
        height: 700px;
        position: relative;
        margin-left: 300px;
        margin-top: 60px;
        }
</style>