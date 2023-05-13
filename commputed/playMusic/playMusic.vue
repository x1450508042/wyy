<template>
	<view class="footerM" :style="bj==true?jl:''">
		<view class="musicz">

			<image :src="playList[playIndex].al.picUrl" @click="ToLy"></image>
			<view class="yicyc">
				<text style="font-weight: 700;">{{playList[playIndex].al.name}}</text>
				<text style="color: #6d6d6d; margin: 0 5px;">-</text>
				<text style="color: #6d6d6d;" v-for="(item,index) in playList[playIndex].ar"
					:key="index">{{item.name}}{{playList[playIndex].ar.length-1==index?'':'/'}} </text>
			</view>
			<view class="fr iconfont" @click="playAndstop" v-if="isPlay">
				&#xe626;
			</view>
			<view class="fr iconfont" @click="playAndstop" v-else>
				&#xe629;
			</view>
		</view>
	</view>
</template>

<script>
	// const Audio = uni.createInnerAudioContext();
	import {
		mapState
	} from 'vuex'
	export default {
		props:['bj'],
		data() {
			return {
				t:null
			}
		},
		methods: {
			playAndstop() {

				// Audio.autoplay = true;
					
				if(!this.cnnuni){
					this.Audio.src = 'https://music.163.com/song/media/outer/url?id=' + this.playList[this.playIndex].id; //音频地址
				}
				
				if (this.isPlay) {
					
					// this.Audio.play(); //执行播放  
					let playPromise = this.Audio.play()
					if (playPromise !== undefined) {
					    playPromise.then(() => {
					        this.Audio.play()
					    }).catch(()=> {
					       
					    })
					}
					this.$store.commit('setIsPlay',false)
				} else {
					this.Audio.pause(); 
					this.$store.commit('setIsPlay',true)
				}
				this.Audio.onPlay(()=>{
					this.$store.commit("setcnnuni",true)
				})
				
			},
			ToLy(){
				uni.navigateTo({
					url:"/pages/musicLy/musicLy"
				})
			},
			updatacurrentTime() {
				this.t = setInterval(() => {
					this.$store.commit("getSetduration", this.Audio.currentTime)
				}, 1000)
			}
		},
		computed: {
			...mapState(['playList', 'name','isPlay','Audio','playIndex','cnnuni']),
			jl(){
				return {
					bottom:0
				}
			}
		},
		watch:{
			isPlay(news, lods) {
				if (!news) { // 我的按钮 为false的时候就是播放的时候
					this.updatacurrentTime()
				} else {
					clearInterval(this.t)
				}
			}
		}
	}
</script>

<style lang="scss">
	.footerM {
		width: 750rpx;
		box-shadow: -6px 6px 7px 5px;
		background: rgb(247, 247, 250);
		position: fixed;
		// #ifdef H5
		bottom: 50px;
		// #endif
		//	#ifdef MP-WEIXIN
		bottom: 0;

		//#endif
		.musicz {
			width: 700rpx;
			height: 50px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.yicyc{
				width: 450rpx;
				display: inline-block;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			image {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				// vertical-align: middle;
			}

			text {
				display: inline-block;
				height: 50px;
				line-height: 50px;
			}

			.fr {
				float: right;
				width: 30px;
				height: 30px;
				text-align: center;
				line-height: 30px;
				font-size: 25px;
			}
		}
	}
</style>