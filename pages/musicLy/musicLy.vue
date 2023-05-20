<template>
	<view>
		<image class="bgcs" :src="backgroundImage"></image>
		<view class="LyTopMusic">
			<view class="textan">
				<view>
					{{ playList[playIndex].al.name}}
				</view>
				<view style="color: #ccc;">
					<text v-for="(item,index) in playList[playIndex].ar" :key="index">{{item.name}}{{playList[playIndex].ar.length-1==index?'':'/'}}</text>
				</view>
			</view>
			<!-- v-show="!LYSHOW" -->
			<view @click="showLY" class="shangx" :style="{opacity:LYSHOW==false?'1':'0'}" v-show="iMGISHOW">
				<image src="../../static/cz.png" mode="" :class="isPlay==false?'czActive':'cz'"></image>
				<view class="imgcd">
					<image class="imgcd001" src="../../static/cd.png" mode=""></image>
					<image class="imgcd002" :src="backgroundImage" mode=""
						:class="isPlay?'imgcd002paused':'imgcd002Play'"></image>
				</view>
			</view>
			<!-- v-show="LYSHOW" -->
			<scroll-view scroll-y="true" class="wzz" ref="musiclys" :scroll-top="localScrollTop">
				<view  @click="showLY" v-show="LYISHOW" >
					<text v-for="(item,index) in lyric" :key="index" class="txtsLRC" :class="{act:setduration*1000>=item.time && setduration*1000< item.pre}">
						{{item.lrc}}
					</text>
				</view>
			</scroll-view>
		</view>
		<view class="progress-box" @click="pro">
			<progress :percent="jidu" ref="rang" stroke-width="3" backgroundColor="#f4f4f4" activeColor="#b3b3b3" />
			<text class="y" :style="Yleft"></text>
		</view>
		<view class="footerMusic">
			<text class="iconfont" @click="sys">&#xe63c;</text>
			<text class="iconfont" v-if="isPlay" @click="isPlayANDpuaser">&#xe626;</text>
			<text class="iconfont" v-else @click="isPlayANDpuaser">&#xe629;</text>
			<text class="iconfont" @click="xyx">&#xe63e;</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from "vuex"
	export default {
		 onLoad() {
			this.Lrygc()
		},
		data() {
			return {
				reds: 'red',
				LYSHOW: false,
				jidu: 0,
				t: null,
				sW: uni.getSystemInfoSync().screenWidth, //获取当前屏幕宽度
				lyc: {},
				LYISHOW: false,
				iMGISHOW: true,
				localScrollTop:0,
			}
		},
		methods: {
			isPlayANDpuaser() {

				this.$nextTick(() => {
					if (!this.cnnuni) {
						this.Audio.src = 'https://music.163.com/song/media/outer/url?id=' + this.playList[this
								.playIndex]
							.id; //音频地址
					}
					if (this.isPlay) {

						// this.Audio.play(); //执行播放  
						let playPromise = this.Audio.play()
						if (playPromise !== undefined) {
							playPromise.then(() => {
								this.Audio.play()
							}).catch(() => {

							})
						}
						this.$store.commit('setIsPlay', false)
					} else {
						this.Audio.pause();
						this.$store.commit('setIsPlay', true)
					}
					this.Audio.onPlay(() => {
						this.$store.commit("setcnnuni", true)
					})
					this.Audio.onCanplay(() => {
						this.$store.commit("getduration", this.Audio.duration)
					})
				})
			},
			showLY() {
				this.LYSHOW = !this.LYSHOW
				if (this.LYSHOW) {
					setTimeout(() => {
						this.iMGISHOW = false
						this.LYISHOW = true
					}, 500)
				} else {
					this.LYISHOW = false
					this.iMGISHOW = true
				}
			},
			updatacurrentTime() {
				this.t = setInterval(() => {
					this.$store.commit("getSetduration", this.Audio.currentTime)
				}, 1000)
			},
			pro(e) {
				// console.log(e);
				this.Audio.src = 'https://music.163.com/song/media/outer/url?id=' + this.playList[this.playIndex]
					.id; //音频地址
				let jj = (this.sW - this.$refs.rang.$el.offsetWidth) / 2
				let w = e.detail.x - jj // 全部大小
				let bl = 100 //全部比例
				let bfb = parseInt(parseFloat(w / (parseFloat(this.sW - jj - jj))) * 100) // 所占百分比
				let pm = this.sW - jj - jj //当前进度条长度
				this.jidu = (pm * bfb / bl) / 3

				let pl = this.duration * this.jidu / 100 //播放总时长的百分之多少
				this.$store.commit("getSetduration", pl)
				this.Audio.seek(pl)
				this.Audio.play(); //执行播放
				this.$store.commit('setIsPlay', false)
				this.$store.commit("setcnnuni", true)
			},
			sys() {
				if (this.playIndex > 0) {
					this.$store.commit('setIndex', this.playIndex - 1)
				} else {
					this.$store.commit('setIndex', this.playList.length - 1)
				}
			},
			xyx() {
				if (this.playList.length > this.playIndex + 1) {
					this.$store.commit('setIndex', this.playIndex + 1)
				} else {
					this.$store.commit('setIndex', 0)
				}

			},
			async Lrygc(){
				let res = await this.$wyy({
					url: '/lyric?id=' + this.playList[this.playIndex].id
				})
				if (res.data.code == 200) {
					this.lyc = res.data.lrc
				}
			}
		},
		computed: {
			...mapState(['playList', 'isPlay', 'Audio', 'playIndex', 'cnnuni', 'duration', 'setduration']),
			...mapGetters(['getBackgroundImageUrl']),
			backgroundImage() {
				return this.getBackgroundImageUrl
			},

			Yleft() {
				return {
					left: this.jidu + '%'
				}
			},
			lyric() {
				let arr;
				if (this.lyc.lyric) {
					arr = this.lyc.lyric.split('\n').map((item) => {
						let min = item.slice(1, 3) //分
						let sec = item.slice(4, 6) //秒
						let mill = item.slice(7, 10) //毫秒
						let lrc = item.slice(11, item.length)
						let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
						if (isNaN(Number(mill))) {
							mill = item.slice(7, 9)
							lrc = item.slice(10, item.length)
							time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
						}
						return {
							min,
							sec,
							mill,
							lrc,
							time
						}
					})
					arr.forEach((item, i) => {
						if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
							item.pre = 100000
						} else {
							item.pre = arr[i + 1].time
						}
					})
				}
				return arr
			},
		},
		watch: {
			isPlay(news, lods) {
				if (!news) { // 我的按钮 为false的时候就是播放的时候
					this.updatacurrentTime()
				} else {
					clearInterval(this.t)
				}
			},
			setduration(news, old) {
				let txt = document.querySelector('.act')
				if(txt){
					if(txt.offsetTop>200){
						  // uni.pageScrollTo({
						  //   scrollTop: txt.offsetTop-250,
						  //   duration: 300
						  // })
						  this.localScrollTop=txt.offsetTop-200
				
	
					}
				}
				
				// console.log(txt);
				if (news < this.duration) {
					this.jidu = news / this.duration * 100
				} else {

					if (this.playList.length == this.playIndex) {
						this.$store.commit('setIndex', 0)
					} else {
						this.$store.commit('setIndex', this.playIndex + 1)

					}
					// this.$store.commit('setIsPlay', true)
				}
			},
			playIndex(news, old) {
				this.Lrygc()
				this.$store.commit('setIsPlay', true) //是否在播放
				this.$store.commit("setcnnuni", false)
				this.updatacurrentTime()
				this.Audio.src = ''
				if (!this.cnnuni) {
					this.Audio.src = 'https://music.163.com/song/media/outer/url?id=' + this.playList[news].id; //音频地址
				}
				// this.Audio.play(); //执行播放
				let playPromise = this.Audio.play()
				if (playPromise !== undefined) {
					playPromise.then(() => {
						this.Audio.play()
					}).catch(() => {

					})
				}
				this.$store.commit('setIsPlay', false)

				this.Audio.onPlay(() => {
						this.$store.commit("setcnnuni", true)
					}),
					this.Audio.onCanplay(() => {
						this.$store.commit("getduration", this.Audio.duration)
					})
			}
		}
	}
</script>

<style lang="scss">
	.bgcs {
		width: 750rpx;
		height: 94vh;
		position: absolute;
		filter: blur(15px);
	}

	.LyTopMusic {
		width: 750rpx;
		height: 94vh;
		position: relative;
		z-index: 3;

		.shangx {
			height: 900rpx;
			opacity: 1;
			transition: all 0.5s;
		}

		.textan {
			height: 100rpx;

			view {
				width: 200rpx;
				height: 45rpx;
				line-height: 45rpx;
				color: #fff;
				margin: 0 auto;
				text-align: center;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.wzz {
			width: 700rpx;
			height: 830rpx;
			// overflow:hidden;
			margin: 0 auto;
			text-align: center;

			.act {
				font-size: 30rpx;
				color: #fff !important;
			}

			.txtsLRC {
				display: block;
				color: #c5c5c5;
				margin: 20rpx 0;
			}
		}

		.cz {
			width: 150rpx;
			height: 230rpx;
			position: absolute;
			left: 50%;
			transform-origin: 0 0; //偏移点
			transform: rotate(0deg);
			transition: all 1s;
			z-index: 99;
		}

		.czActive {
			width: 150rpx;
			height: 230rpx;
			position: absolute;
			left: 50%;
			transform-origin: 0 0; //偏移点
			transform: rotate(15deg);
			transition: all 1s;
			z-index: 99;
		}

		.imgcd {
			position: relative;
			top: 200rpx;
			left: 50%;
			transform: translate(-50%, 0);
			width: 480rpx;
			height: 480rpx;

			.imgcd001 {
				width: 480rpx;
				height: 480rpx;

			}

			.imgcd002 {
				position: absolute;
				width: 300rpx;
				height: 300rpx;
				// left: 45px;
				// top: 45px;
				top: 19%;
				left: 19%;
				// top: 50%;
				border-radius: 50%;
				animation: zqq 10s linear infinite;
			}

			.imgcd002Play {
				animation-play-state: running;
			}

			.imgcd002paused {
				animation-play-state: paused;
			}
		}

	}

	@keyframes zqq {
		0% {
			transform: rotateZ(0deg);
		}

		100% {
			transform: rotateZ(360deg);
		}
	}

	.footerMusic {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translate(-50%, 0);
		z-index: 99;

		text {
			margin: 0 10px;
			font-size: 30px;
		}
	}

	.progress-box {
		width: 600rpx;
		height: 3px;
		position: relative;
		bottom: 80px;
		left: 50%;
		transform: translate(-50%, 0);
		z-index: 999;

		.y {
			display: inline-block;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background: #fff;
			position: absolute;
			top: -3px;
		}
	}
</style>