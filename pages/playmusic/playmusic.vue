<template>
	<view v-if="musicList.code==200">
		<image class="qwebgc" :src="musicList.playlist.coverImgUrl" ></image>
		<view class="bgc">
			<view class="musicTop">
				<view class="musicTop_T">
					<image style="float: left;" :src="musicList.playlist.coverImgUrl " ></image>
					<view class="r">
						<view style="font-size: 15px; color: #fff;" >{{musicList.playlist.name}}</view>
						<view style="color: #fff;" >{{musicList.playlist.creator.nickname}}</view>
						<view >
							<uni-tag :text="item+'>'" style="background: transparent; border: 1px solid #fff; margin-right: 5px;" v-for="item in musicList.playlist.tags"></uni-tag>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="buttonbgc" v-if="musicList.code==200">
			<view class="musicTop">
				<view class="listTop">
					<text class="bof"></text>
					<text style="margin: 0 5px; font-size: 30rpx; font-weight: 700;">播放全部</text>
					<text>({{musicList.playlist.trackCount || ''}})</text>
				</view>
				<view class="music" v-for="(item,index) in musicList.playlist.tracks" :key="index" @click="plays(item)">
					<text class="index">{{index+1}}</text>
					<view class="musicname">
						<text class="name01">{{item.al.name}}</text>
						<view class="yss">
							<text class="name02" v-for="(n,index) in item.ar" :key="n.id">{{n.name}}{{item.ar.length-1==index?'':'/'}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<playmusic :bj='true' />
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				musicList:{}
			}
		},
		async onLoad(options) {
			if(options.id ==undefined){
				await uni.switchTab({
					url:"/pages/index/index"
				})
			}else{
				uni.showLoading({
					title:"加载中",
					mask:true
				})
				let res =await this.$wyy({
					url:`/playlist/detail?id=${options.id}`
				})
				
				if(res.data.code ==200){
					uni.hideLoading();
					this.$nextTick(()=>{
						this.musicList=res.data
					})
				}
			}
		},
		methods: {
				
			plays(item){
				console.log(item);
				this.$store.commit('setPlayList',item)
				console.log(this.isPlay);
			}
		},
			
		computed:{
			...mapState(['playList','playIndex','Audio','cnnuni','isPlay'])
		},
		watch:{
			playIndex(news,old){
				this.$store.commit('setIsPlay',true)  //是否在播放
				this.$store.commit("setcnnuni",false)	
				this.Audio.src=''
				if(!this.cnnuni){
					this.Audio.src = 'https://music.163.com/song/media/outer/url?id=' + this.playList[news].id; //音频地址
				}
				// this.Audio.load()
				let playPromise = this.Audio.play()
				if (playPromise !== undefined) {
				    playPromise.then(() => {
				        this.Audio.play()
				    }).catch(()=> {
				       
				    })
				}
				this.$store.commit('setIsPlay',false)
				
				this.Audio.onPlay(()=>{
					this.$store.commit("setcnnuni",true)
				})
				
				
			}
		}
	}
</script>

<style lang="scss">
	.qwebgc{
		width: 750rpx;
		height: 300px;
		filter: blur(15px);
		position: absolute;
	}
	.bgc{
		height: 300px;

		.musicTop{
			width: 700rpx;
			height: 200rpx;
			margin: 0 auto;
			padding-top: 20px;
			.musicTop_T{
				image{
					width: 200rpx;
					height: 200rpx;
					border-radius: 10px;
					margin-right: 15px;
				}
				.r{
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					view{
						position: relative;
						z-index: 99;
						margin-bottom: 5px;
					}
				}
			}
		}
	}
	
	.buttonbgc{
		position: relative;
		top: -10px;
		background: #fff;
		border-radius: 10px 10px 0 0;
		width: 750rpx;
		height:auto; 
		.musicTop{
			width: 700rpx;
			// height: 200rpx;
			margin: 0 auto;
			padding-bottom: 50px;
			.listTop{
				padding: 20px 0;
			}
			.music{
				// width: 750rpx;
				// height: 100rpx;
				padding: 10px 0;
				.index{
					float: left;
					margin-right: 50rpx;
					line-height: 39px;
					font-size: 16px;
					color: #b8b8b8;
				}
				.musicname{
					width: 500rpx;
					display: flex;
					flex-direction: column;
					.name01{
						font-size: 20px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.yss{
						display: flex;
						.name02{
							font-size: 12px;
							color: #b8b8b8;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}

				}
			}
			.bof{
				display: inline-block;
				width: 50rpx;
				height: 50rpx;
				background: red;
				border-radius: 50%;
				position: relative;
							vertical-align: middle;
				&:before{
					content: "";
					border: 8px solid transparent;
					border-left: 8px solid #fff;
					position: absolute;
					// top: 0;
					// left: 0;
					// bottom: 0;
					// right: 0;
					// margin: auto;
					left: 65%;
					top: 50%;
					transform: translate(-45%,-50%);
				}
			}
			}
	}
</style>
