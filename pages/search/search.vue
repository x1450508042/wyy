<template>
	<view>
		<view class="top">
			<input type="text" class="inp" v-model="text" @input="dianj" >
		</view>
		<view class="buttonbgc">
			<view class="musicTop">
				<view class="listTop">
					<text class="bof"></text>
					<text style="margin: 0 5px; font-size: 30rpx; font-weight: 700;">播放全部</text>
					<!-- <text>({{musicList.playlist.trackCount || ''}})</text> -->
				</view>
				<view class="music" v-for="(item,index) in musicList" :key="index" @click="plays(item)">
					<text class="index">{{index+1}}</text>
					<view class="musicname">
						<text class="name01">{{item.album.name}}</text>
						<view class="yss">
							<text class="name02" v-for="(n,index) in item.artists" :key="n.id">{{n.name}}{{item.artists.length-1==index?'':'/'}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<playmusic :bj='true' />
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		async onLoad(options) {
			if(options.inp ==undefined){
				await uni.switchTab({
					url:"/pages/index/index"
				})
			}else{
				uni.showLoading({
					title:"加载中",
					mask:true
				})
				let res =await this.$wyy({
					url:`/search?keywords=${options.inp}`
				})
				
				if(res.data.code ==200){
					uni.hideLoading();
					this.$nextTick(()=>{
						this.musicList=res.data.result.songs
					})
				}
			}
		},
		data() {
			return {
				text:'',
				musicList:[],
				timer:null
			}
		},
		methods: {
			 dianj(){
			if(this.timer){
				clearTimeout(this.timer)
			}
			this.timer=setTimeout(async()=>{
				uni.showLoading({
					title:"加载中",
					mask:true
				})
				let res =await this.$wyy({
					url:`/search?keywords=${this.text}`
				})
				
				if(res.data.code ==200){
					uni.hideLoading();
					this.$nextTick(()=>{
						this.musicList=res.data.result.songs
					})
				}
				this.timer=null
			},500)
				
			},
			plays(item){
				this.$store.dispatch('setPlayList02',item)
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
	.top {
		width: 750rpx;
		height: 100rpx;

		.inp {
			// line-height: 100rpx;
			margin: 9px auto;
			padding-left: 20px;
			width: 490rpx;
			height: 70rpx;
			border-radius: 20rpx;
			background-color: #dedede;
			color: #6d6d6d;
			font-size: 30rpx;
			font-weight: 500;
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
