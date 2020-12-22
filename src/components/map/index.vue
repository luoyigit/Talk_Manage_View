<template>
    <div class="my-confirm" v-show="iSShow">
        <div class="contain">
            <div class="contain2">
                <div style="width: 70%">
                    <div style="padding: 10px;position: fixed;z-index: 9999;display: flex;align-items: center">
                        <div>关键词：</div>
                        <div>
                            <el-input v-model="keyword" style="border-radius: 10px;"></el-input>
                        </div>
                    </div>

                    <baidu-map
                            class="bm-view"
                            :center="center"
                            :zoom="zoom"
                            @ready="handler"
                            @click="getClickInfo"
                            @moving="syncCenterAndZoom"
                            @moveend="syncCenterAndZoom"
                            @zoomend="syncCenterAndZoom">
                        <div style="height: 400px;overflow: auto;width: 300px" v-if="keyword">
                            <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location" :zoom="zoom"></bm-local-search>
                        </div>
                        <bm-marker :position="center"></bm-marker>
                    </baidu-map>

                </div>
                <div>
                    <div style="display: flex;justify-content: flex-end">
                        <el-button icon="el-icon-close" style="border: 0" v-on:click="close()"></el-button>
                    </div>

                    <div style="display: flex;align-items: center;height: 80%;">
                        <div>
                            <div class="lng_lat">
                                <div class="lng">
                                    <div style="padding-right: 10px">经度</div>
                                    <el-input style="width: 70%" v-model="center.lng"></el-input>
                                </div>
                                <div style="display: flex;align-items: center">
                                    <div style="padding-right: 10px">纬度</div>
                                    <el-input style="width: 70%" v-model="center.lat"></el-input>
                                </div>
                            </div>
                            <div style="display: flex;align-items: center;margin-top: 20px">
                                <div style="padding-right: 10px; padding-left: 20px;">地址</div>
                                <el-input style="width: 81%" v-model="address"></el-input>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: flex-end;margin-right: 30px">
                        <el-button v-on:click="confirm()">确定</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BMap from 'vue-baidu-map'

    export default {
        name: "vue-baidu-map",
        props: ["isShow"],
        data() {
            return {
                center: {lng: 0, lat: 0},
                zoom: 15,
                iSShow: true,
                keyword: "",
                BMap: "",
                longitude: "",
                latitude: "",
                address: "",
                location:''
            }
        },
        created() {


        },
        watch: {
            isShow: function (newVal, oldVal) {

                this.iSShow = newVal

                // this.cData = newVal;  //newVal即是chartData
                // this.drawChart();
            },

            // isShow(val){
            //     alert(val)
            //     this.iSShow = val
            // }
        },
        mounted() {

        },
        methods: {


            getcity() {
                this.$nextTick(function () {
                    var th = this
                    // 创建Map实例
                    var map = new th.BMap.Map('allmap')
                    // 初始化地图,设置中心点坐标，
                    // var point = new BMap.Point(th.latitude,th.longitude) // 创建点坐标，
                    // map.centerAndZoom(point, 15)
                    map.enableScrollWheelZoom()

                    var ac = new th.BMap.Autocomplete( // 建立一个自动完成的对象
                        {
                            'input': 'suggestId',
                            'location': map
                        })
                    var myValue
                    ac.addEventListener('onconfirm', function (e) { // 鼠标点击下拉列表后的事件
                        var _value = e.item.value //获取点击的条目
                        myValue = _value.province + _value.city + _value.district + _value.street + _value.business //地址拼接赋给一个变量
                        th.city = myValue //将地址赋给data中的city
                        // console.log(th.city)
                        setPlace()
                    })

                    // console.log(ac.pc.input)
                    function setPlace() {
                        map.clearOverlays() // 清除地图上所有覆盖物
                        function myFun() {
                            th.userlocation = local.getResults().getPoi(0).point // 获取第一个智能搜索的结果
                            map.centerAndZoom(th.userlocation, 18)
                            map.addOverlay(new th.BMap.Marker(th.userlocation)) // 添加标注
                        }

                        var local = new th.BMap.LocalSearch(map, { // 智能搜索
                            onSearchComplete: myFun
                        })
                        local.search(myValue)

                        // 测试输出坐标（指的是输入框最后确定地点的经纬度）
                        map.addEventListener('click', function (e) {
                            // 经度
                            console.log(th.userlocation.lng)
                            // 纬度
                            console.log(th.userlocation.lat)
                        })
                    }
                },)
            },


            // 点击定位-定位到当前位置
            fixedPos() {
                const _this = this
                const geolocation = new BMap.Geolocation()

                // this.confirmLoading = true
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        _this.handleMarker(_this, r.point)
                        let myGeo = new BMap.Geocoder()
                        myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function (result) {
                            _this.confirmLoading = false
                            if (result) {
                                _this.latitude = result.point.lat
                                _this.longitude = result.point.lng

                            }
                        })

                    } else {
                        _this.$message.error('failed' + this.getStatus())
                    }
                })
            },
            //百度地图初始化（这个一定要！否则地图回加载不出来）
            handler({BMap, map}) {
                const that = this;
                that.BMap = BMap;

                map.enableScrollWheelZoom(true); //开启滚轮缩放
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        // that.center.lng = r.longitude;
                        // that.center.lat = r.latitude;
                        that.zoom = 15
                        const pointBak = new BMap.Point(  r.longitude,  r.latitude);
                        const convertor = new BMap.Convertor();
                        convertor.translate([pointBak], 1, 5,function(resPoint) {
                            if (resPoint && resPoint.points && resPoint.points.length > 0) {
                                that.center.lng = resPoint.points[0].lng;
                                that.center.lat = resPoint.points[0].lat;
                            }
                        })
                        that.getAddress()
                    } else {
                        alert("failed" + this.getStatus());
                    }
                });
            },






            //点击获取到当前经纬度
            getClickInfo(e) {

                const that = this;
                console.log(e.point.lng);

                console.log(e.point.lat);
                that.center.lng = e.point.lng;
                that.center.lat = e.point.lat;
                that.getAddress()
                // let points = new that.BMap.Point(that.center.lng, that.center.lat);
                // //用当前定位的经纬度查找省市区街道等信息
                // let gc = new this.BMap.Geocoder();
                // gc.getLocation(points, function (rs) {
                //     console.log(rs.address)
                //     // this.address = rs.address;//地址信息
                //     that.address = rs.address
                //
                // });

            },
            //双向绑定经纬度以及缩放尺寸
            syncCenterAndZoom(e) {
                const that = this;
                const {lng, lat} = e.target.getCenter();
                that.center.lng = lng;
                that.center.lat = lat;
                that.zoom = e.target.getZoom();
                setTimeout(()=>{
                    this.getAddress()
                },100)


            },

            getAddress() {
                const that = this;
                let points = new that.BMap.Point(that.center.lng, that.center.lat);
                //用当前定位的经纬度查找省市区街道等信息
                let gc = new that.BMap.Geocoder();
                gc.getLocation(points, function (rs) {
                    // this.address = rs.address;//地址信息
                    that.address = rs.address
                    console.log(rs)

                });
            },
            confirm() {

                this.iSShow = false
                let option = {
                    iSShow: this.iSShow,
                    lng: this.center.lng,
                    lat: this.center.lat,
                    address: this.address
                }
                this.$emit('mapData', option)
            },
            close() {
                this.iSShow = false;
                let option = {
                    iSShow: this.iSShow,
                }
                this.$emit('mapData', option)
            }
        }
    }
</script>

<style scoped lang="scss">
    .bm-view {
        width: 100%;
        height: 400px;
        display: flex;

    }

    .my-confirm {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 998;
        /* 这里防止当用户长按屏幕，出现的黑色背景色块，以及 iPhone 横平时字体的缩放问题 */
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);


    }

    .contain {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%
    }

    .contain2 {
        background-color: white;
        width: 50%;
        display: flex;
    }

    .lng_lat {
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .lng {
        display: flex;
        align-items: center;
        padding-left: 20px;
    }

    /deep/ .el-input--small .el-input__inner {

        width: 100% !important;
    }

</style>