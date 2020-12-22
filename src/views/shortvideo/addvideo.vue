<template>
    <div>
        <div id="0" class="condition-container">
            <el-card header="基本信息">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <div style="display: flex">
                        <div style="width: 50%">
                            <el-form-item label="标题" prop="title">
                                <el-input v-model="ruleForm.title" style="width: 217px" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="标签" prop="label">
                                <el-input v-model="ruleForm.label" style="width: 217px" clearable
                                          placeholder="多个标签用逗号隔开"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 50%">
                            <el-form-item label="内容类别" prop="type">
                                <el-select v-model="ruleForm.type" placeholder="请选择内容类别" clearable filterable>
                                    <el-option
                                            v-for="item in typeList"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </el-card>
        </div>
        <div style="margin-top: 20px" id="1" class="condition-container">
            <el-card header="上传视频">
                <div style="display: flex;margin-left: 20px">
                    <div style="width: 40%">
                        <el-upload
                                class="upload-demo"
                                ref="upload"
                                :action="fileUrl"
                                :headers="headers"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-success="videoImgSuccess"
                                :data="{fileType: filetype,}"
                                :auto-upload="false">
                            <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">
                                上传到服务器
                            </el-button>
                            <!--<div slot="tip" class="el-upload__tip" style="margin-top: 10px">只能上传jpg/png文件，且不超过500kb</div>-->
                        </el-upload>
                        <div style="margin-top: 100px;color: #757575">
                            <div style="margin-bottom: 20px">文件大小：<span v-if="upFileSize !== ''">{{upFileSize}}M</span>
                            </div>
                            <div style="margin-bottom: 20px">分辨率：<span v-if="upPower !== ''">{{upPower}}</span></div>
                            <div style="margin-bottom: 20px">视频时长：<span
                                    v-if="upVideoTime !== ''">{{upVideoTime}}秒</span></div>
                            <div style="margin-bottom: 20px">码率：<span v-if="upCode !== ''">{{upCode}}kbs</span></div>
                            <div style="margin-bottom: 20px">帧率：<span v-if="upFrame !== ''">{{upFrame}}FPs</span></div>
                        </div>
                    </div>
                    <div style="width: 60%">
                        <div style="width: 550px;"><!--v-if="sourceId !== ''"-->
                            <video-player class="video-player vjs-custom-skin" ref="videoPlayer1" :playsline="false"
                                          :options="playerOptions1"></video-player>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <div style="margin-top: 20px" id="2" class="condition-container">
            <el-card header="视频制作">
                <div style="display: flex" v-loading="loading">
                    <div style="width: 40%">
                        <div style="margin-left: 30px">
                            <div>
                                <span style="margin-right: 10px">码率</span>
                                <el-input style="width: 200px" v-model="bitRateKbs" type="number" clearable></el-input>
                            </div>
                            <div style="margin-top: 10px">
                                <span style="margin-right: 10px">帧率</span>
                                <el-input style="width: 200px" v-model="fps" type="number" clearable></el-input>
                                <el-button size="mini" style="margin-left: 20px" v-on:click="transForm()">视频转换
                                </el-button>
                            </div>
                        </div>
                        <div style="margin-left: 15px;color: #757575;margin-top: 70px">
                            <div style="margin-bottom: 20px">文件大小：<span
                                    v-if=" makeFileSize !== ''">{{makeFileSize}}M</span></div>
                            <div style="margin-bottom: 20px">分辨率：<span v-if=" makePower !== ''">{{makePower}}</span>
                            </div>
                            <div style="margin-bottom: 20px">视频时长：<span
                                    v-if=" makeVideoTime !== ''">{{makeVideoTime}}秒</span></div>
                            <div style="margin-bottom: 20px">码率：<span v-if=" makeCode !== ''">{{makeCode}}kbs</span>
                            </div>
                            <div style="margin-bottom: 20px">帧率：<span v-if=" makeFrame !== ''">{{makeFrame}}FPs</span>
                            </div>

                        </div>
                    </div>
                    <div style="width: 60%">
                        <div style="width: 550px;" v-if="makeId !== ''">
                            <video-player class="video-player vjs-custom-skin" ref="videoPlayer2" :playsline="false"
                                          :options="playerOptions2"></video-player>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <div style="margin-top: 20px" id="3" class="condition-container">
            <el-card header="视频水印">
                <div style="display: flex">
                    <div style="width: 40%">
                        <div style="margin-left: 20px;">
                            <div style="display: flex;">
                                <div style="width: 80px">LOGO</div>
                                <div>
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="fileUrl"
                                            :headers="headers"
                                            :show-file-list="false"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload"
                                            :data="{fileType: filetype,}">
                                        <img v-if="logoImg" :src="logoImg" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </div>
                            </div>
                            <div style="display: flex;margin-top: 30px">
                                <div style="width: 80px;">位置</div>
                                <div>
                                    <el-radio-group v-model="position">
                                        <el-radio :label="0">左上</el-radio>
                                        <el-radio :label="1">右上</el-radio>
                                        <el-radio :label="2">左下</el-radio>
                                        <el-radio :label="3">右下</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div style="margin-top: 120px">
                                <el-button v-on:click="addLogo()">增加水印</el-button>
                            </div>
                        </div>
                    </div>
                    <div style="width: 60%" v-loading="logoLoading">
                        <div style="width: 550px;" v-if="logoVideo == true">
                            <video-player class="video-player vjs-custom-skin" ref="videoPlayer3" :playsline="false"
                                          :options="playerOptions3"></video-player>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <div style="margin-top: 20px" id="4" class="condition-container">
            <el-card header="缩略图">
                <div style="display: flex;margin-left: 30px">
                    <div style="width: 30%">
                        <div>
                            <span style="margin-right: 10px">第几秒</span>
                            <el-input style="width: 170px" v-model="seek" type="number"></el-input>
                        </div>
                        <div style="margin-top: 70px">
                            <el-button v-on:click="getSLT()">提取</el-button>
                        </div>
                    </div>
                    <div style="display: flex">
                        <!--<img src="../../assets/logo.png" style="width: 120px;height: 120px">-->
                        <!--<el-image src="../../../assets/move_icon.png" fit="fill"></el-image>-->
                        <div style="text-align: center;margin-right: 30px" v-for="(item,index) in imgList" :key="index">
                            <div style="width: 100px;height: 100px;">
                                <div style="display: flex;justify-content: flex-end;width: 115px"><i
                                        class="el-icon-circle-close" v-on:click="delectImg(index)"></i></div>
                                <div style="line-height: 100px"><img :src="imgUrl+item" style="width: 100%"></div>
                            </div>
                            <div style="margin-top: 20px">
                                <el-radio-group v-model="iconid" @change="Radio(item)">
                                    <el-radio :label="item">封面</el-radio>
                                </el-radio-group>
                            </div>
                        </div>

                    </div>
                </div>
            </el-card>
        </div>


        <div style="margin-top: 20px" id="5" class="condition-container">
            <el-card header="视频切片">
                <div style="display: flex;margin-left: 30px">
                    <div style="width: 30%">
                        <div>
                            <span style="margin-right: 10px">按几秒切</span>
                            <el-input style="width: 170px" v-model="seek" type="number"></el-input>
                            <el-button style="margin-left: 10px">切片</el-button>
                        </div>
                        <div style="border: 1px solid #6f6f6f;margin-top: 10px;margin-right: 38px"
                             v-if="qpList.length > 0">
                            <el-menu
                                    :default-active="activeIndex"
                                    class="el-menu-vertical-demo"
                                    @select="handleSelect">
                                <el-menu-item v-for="(item,index) in qpList" :index="index">
                                    <span slot="title">导航二</span>
                                </el-menu-item>
                            </el-menu>
                        </div>

                    </div>
                    <div style="width: 70%">
                        <div style="width: 550px;" v-if="qpList.length > 0">
                            <video-player class="video-player vjs-custom-skin" ref="videoPlayer4" :playsline="false"
                                          :options="playerOptions4"></video-player>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>

        <div style=" position: fixed;top: 400px;right: 80px;">
            <div class="navigation">
                <ul>
                    <li style="line-height: 40px" :class="activeClass == 0 ? 'active':''" @click="getActive(0)">基本信息
                    </li>
                    <li style="line-height: 40px" :class="activeClass == 1 ? 'active':''" @click="getActive(1)">上传视频
                    </li>
                    <li style="line-height: 40px" :class="activeClass == 2 ? 'active':''" @click="getActive(2)">视频制作
                    </li>
                    <li style="line-height: 40px" :class="activeClass == 3 ? 'active':''" @click="getActive(3)">视频水印
                    </li>
                    <li style="line-height: 40px" :class="activeClass == 4 ? 'active':''" @click="getActive(4)">缩略图</li>
                    <li style="line-height: 40px" :class="activeClass == 5 ? 'active':''" @click="getActive(5)">视频切片
                    </li>
                </ul>
            </div>
            <div style="margin-top: 20px">
                <el-button v-on:click="add('ruleForm')" style="box-shadow: 1px 1px 15px #a1a1a1">保存</el-button>
                <el-button v-on:click="goBack()" style="box-shadow: 1px 1px 15px #a1a1a1">退出</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import http from 'utils/http'
    import Enum from 'utils/systemEnum';
    import serviceApi from 'services/ugc/index'
    import vipApi from 'services/vip/index'
    import settingApi from 'services/services/index'
    import pmsStorage from 'utils/storage/index'

    export default {

        data() {
            return {
                fileUrl: http.singleUploadUrl,
                headers: http.getUplaodHeaders(),
                filetype: Enum.fileType.video,
                videoUrl: http.downvideourl + '?fileid=',
                imgUrl: http.downfileurl + '?fileid=',
                fileList: [],
                ruleForm: {
                    title: "",
                    label: "",
                    type: ""
                },
                rules: {
                    type: [
                        {required: true, message: '请选择内容类别', trigger: 'change'}
                    ],
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'}
                    ],
                    label: [
                        {required: true, message: '请输入标签', trigger: 'blur'}
                    ],
                },
                typeList: [],
                iconid: "",
                fileList: [],
                activeClass: 0,
                logoImg: "",
                position: "",
                playerOptions1: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
                    autoplay: true, // //如果true,浏览器准备好时开始回放。
                    muted: true, // 默认情况下将会消除任何音频。
                    loop: true, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: 'application/x-mpegURL', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目  "application/x-mpegURL", //如果是直播的话  此处务必这样配置
                        // src: 'http://cdn.letv-cdn.com/2018/12/05/JOCeEEUuoteFrjCg/playlist.m3u8'// url地址
                        // type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: ''// url地址
                    }],
                    //15fd479b88c7c5c551042d847
                    hls: true, //如果是播放m3u8必须加（需注释掉techOrder,不然会有报错）
                    // techOrder: ['flash'], //播放rtmp必须加
                    poster: require('../../assets/logo.png'), // 你的封面地址 本地地址要加 require(）
                    width: document.documentElement.clientWidth, // 播放器宽度
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true // 全屏按钮
                    }
                },
                playerOptions2: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
                    autoplay: true, // 如果true,默认播放。
                    muted: true, // 默认情况下将会消除任何音频。
                    loop: true, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: ''// url地址
                    }],
                    poster: require('../../assets/logo.png'), // 你的封面地址 本地地址要加 require(）
                    width: document.documentElement.clientWidth, // 播放器宽度
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true // 全屏按钮
                    }
                },
                playerOptions3: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
                    autoplay: true, // 如果true,默认播放。
                    muted: true, // 默认情况下将会消除任何音频。
                    loop: true, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: ''// url地址 本地视频加require()
                    }],
                    poster: require('../../assets/logo.png'), // 你的封面地址 本地地址要加 require(）
                    width: document.documentElement.clientWidth, // 播放器宽度
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true // 全屏按钮
                    }
                },
                playerOptions4: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
                    autoplay: true, // 如果true,默认播放。
                    muted: true, // 默认情况下将会消除任何音频。
                    loop: true, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: ''// url地址 本地视频加require()
                        // type: 'rtmp/flv',
                    }],
                    poster: require('../../assets/logo.png'), // 你的封面地址 本地地址要加 require(）
                    width: document.documentElement.clientWidth, // 播放器宽度
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true // 全屏按钮
                    }
                },
                sltImg: "",
                disabled: false,
                upFileSize: '',
                upPower: '',
                upVideoTime: "",
                upCode: "",
                upFrame: "",
                makeFileSize: '',
                makePower: '',
                makeVideoTime: "",
                makeCode: "",
                makeFrame: "",
                sourceId: "",
                imgList: [],
                bannerList: [],
                videoSourceId: "",
                bitRateKbs: "",
                fps: '',
                makeId: "",
                logoId: "",
                logoVideo: false,
                loading: false,
                logoLoading: false,
                seve: false,
                seek: "",
                seeks: [],
                qpList: [],
                activeIndex: '1'
            }
        },
        // computed: {
        //     player() {
        //         return this.$refs.videoPlayer.player
        //     }
        // },
        created() {
            this.getChannelList();
            this.getLogo();
            this.getVideoM3u8();
        },
        methods: {

            getVideoM3u8() {
                let src = "";
                let xhr = new XMLHttpRequest();
                xhr.open('GET', `${window.GlobalConfig.baseUrl}/${http.file}/Video/GetM3u8`, true)
                xhr.responseType = 'blob';
                // xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
                xhr.setRequestHeader("Authorization", 'bearer ' + pmsStorage.getUserInfo().token);

                xhr.onload = function (e) {
                    if (this.status === 200) {
                        let blob = this.response;
                        // window.URL.revokeObjectURL(src);
                        src = window.URL.createObjectURL(blob);



                    }
                }
                xhr.send();
                setTimeout(() => {
                    this.$refs.videoPlayer1.options.sources[0].src = src;

                }, 200)


            },


            getChannelList(prop) {
                let option = {
                    data: prop
                        ? prop
                        : {
                            pageIndex: 1,
                            pageSize: 10,
                            order: "DESC"
                        },
                }

                vipApi.channelList(option).then((data) => {
                    this.typeList = data.dataList

                }).catch(() => {
                    this.loading = false
                })
            },
            Radio(row) {
                this.iconid = row
            },


            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            videoImgSuccess(response, res, file) {

                this.sourceId = response.data;

                setTimeout(() => {
                    this.$refs.videoPlayer1.options.sources[0].src = this.videoUrl + response.data
                }, 100)

                let option = {
                    data: {
                        fileid: response.data
                    }
                };
                serviceApi.videoDetail(option).then(res => {
                    this.upFileSize = res.length;
                    this.upPower = res.frameSize;
                    this.upVideoTime = res.totalSeconds;
                    this.upCode = res.bitRateKbs;
                    this.upFrame = res.fps;
                    this.bitRateKbs = res.bitRateKbs;
                    this.fps = res.fps;
                })
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            getActive(index) {

                this.activeClass = index
                let jump = document.querySelectorAll('.condition-container')
                jump[index].scrollIntoView({
                    block: 'start',// 上边框与视窗顶部平齐
                    behavior: 'smooth' // 平滑过渡
                })

            },
            handleAvatarSuccess(res, file) {
                this.logoImg = URL.createObjectURL(file.raw);
                console.log(res.data)
            },
            beforeAvatarUpload(file) {
                console.log(file)
            },

            add(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let option = {
                            data: {
                                sourceId: this.sourceId,
                                categoryName: this.ruleForm.type,
                                tags: this.ruleForm.label,
                                coverFileId: this.iconid,
                                title: this.ruleForm.title,
                            }

                        }

                        serviceApi.addVideo(option).then(res => {
                            this.seve = true;
                            this.goBack();

                        })
                    }
                });
            },
            goBack() {
                this.$router.push('/shortvideo/list');
            },
            delectImg(row) {
                console.log(row)
                this.imgList.splice(row, 1)
                this.iconid = this.imgList[0]
            },
            transForm() {//视频转换
                this.loading = true
                let option = {
                    data: {
                        bitRateKbs: Number(this.bitRateKbs),
                        fps: this.fps,
                        fileId: this.sourceId
                    }
                }
                serviceApi.transFormVideo(option).then(res => {
                    this.loading = false
                    this.makeFileSize = res.length;
                    this.makePower = res.frameSize;
                    this.makeVideoTime = res.totalSeconds;
                    this.makeCode = res.bitRateKbs;
                    this.makeFrame = res.fps;
                    this.makeId = res.fileId;
                    setTimeout(() => {
                        this.$refs.videoPlayer2.options.sources[0].src = this.videoUrl + this.sourceId
                    }, 100)
                });
            },
            getLogo() {
                settingApi.getsystemconfig().then(res => {
                    this.logoImg = this.imgUrl + res.watermarkLogo;
                    this.logoId = res.watermarkLogo
                })
            },
            addLogo() {
                this.logoLoading = true;
                let option = {
                    data: {
                        logo: this.logoId,
                        fileId: this.makeId,
                        position: this.position
                    }
                };
                serviceApi.videoLogo(option).then(res => {
                    this.logoVideo = true;
                    this.logoLoading = false;
                    setTimeout(() => {
                        this.$refs.videoPlayer3.options.sources[0].src = this.videoUrl + res.fileId
                    }, 100)
                })
            },
            getSLT() {
                this.seeks = [];
                this.seeks.push(Number(this.seek))
                let option = {
                    data: {
                        // fileId:this.sourceId,
                        fileId: '15fd884b28c7c5c6ac83ed8ad',
                        seeks: this.seeks
                    }
                }
                serviceApi.getManyThumbnail(option).then(res => {
                    // console.log(res)
                    this.imgList.push(res[0]);
                    this.iconid = this.imgList[0];

                })
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },

        beforeRouteLeave(to, from, next) {//导航离开该组件的对应路由时调用
            if (this.seve == false && this.sourceId !== '') {
                this.$confirm('项目未保存，确认离开?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    next()
                }).catch(() => {
                    next(false)
                });
            } else {
                next()
            }
        },

    }
</script>
<style scoped lang="scss">
    .navigation {
        background-color: white;
        width: 100px;
        text-align: center;
        border-radius: 10px;
        /*position: fixed;*/
        /*top: 400px;*/
        /*right: 80px;*/
        box-shadow: 2px 2px 15px #e8e8e8;
        cursor: pointer;
    }

    .active {
        color: #5B7FF1;
    }


    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        border: 1px dashed #a2a2a2;

    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }

    .sltAvatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        border: 1px dashed #a2a2a2;

    }

    .sltAvatar {
        width: 120px;
        height: 120px;
        display: block;
    }

    /deep/ .video-js .vjs-big-play-button {
        /*
         播放按钮换成圆形
        */
        height: 2em;
        width: 2em;
        line-height: 2em;
        border-radius: 1em;
    }

    /deep/ .el-menu {
        border-right: solid 0px #e6e6e6;

    }
</style>
