<template>
	<view>
		<view class="top">
			<input type="text" class="inp">
		</view>
		<swiper class="bannes" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in banners" :key="index">
				<view class="swiper-item">
					<image :src="item.imageUrl"></image>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="tjmusic">
			<view class="tjTop">
				推荐歌单>
			</view>
			<view class="container">
				<swiper class="swiper" circular spaceBetween="100" :interval="3000" :duration="500" >
					<swiper-item v-for="(item,index) in playList" :key="item.id"  @click="getmusic(item.id)">
						<image :src="item.picUrl" class="slide-image" />
						<text class="txt">
							{{item.name}}
						</text>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<playmusic/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: "",
				banners: [],
				playList:[]
			}
		},
		onLoad() {
			this.getbanner()
			this.getmusiclist()
		},
		methods: {
			//轮播图
			async getbanner() {
				let res = await this.$wyy({
					url: '/banner'
				})
				this.banners = res.data.banners
			},
			//推荐歌单
			async getmusiclist(){

				let res = await this.$wyy({
					url:'/personalized?limit=10'
				})
				this.playList=res.data.result
			},
			//推荐歌单里的歌曲
				
			async getmusic(id){
				uni.navigateTo({
					url:"/pages/playmusic/playmusic?id="+id
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

	.bannes {
		width: 700rpx;
		height: 150px;
		margin: 0 auto;

		.swiper-item {
			width: 700rpx;
			height: 150px;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.tjmusic {
		width: 700rpx;
		margin: 0 auto;

		.tjTop {
			font-size: 35rpx;
			font-weight: 700;
			margin: 20rpx 0;
		}

		.container {
			height: 360rpx;
			width: 100%;

			swiper-item {
				width: 36% !important;
				padding-right: 10px !important;
				// box-sizing: border-box;
			}
			.swiper {
				height: 100%;

				image {
					width: 100%;
					height: 250rpx;
					border-radius: 9px;
				}
				.txt{
					height: 42px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
		}

	}
</style>