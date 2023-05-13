<template>
	<view>
		<view class="">
			<!-- 			<label for="phone">手机号</label> -->
			<input type="text" class="text" placeholder="请输入手机号" v-model="phone">
			<input type="password" class="text" placeholder="请输入密码" v-model="password">
			<button style="margin-top: 10px;" type="warn" @click="logins">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				password:''
			}	
		},
		methods: {
			async logins() {
				uni.showLoading( {
					title: '加载中',
					mask:true
				})
				let res= await this.$wyy({
					url:`/login/cellphone?phone=${this.phone}&password=${this.password}`,
					method:"post"
				})
				console.log(res);
			}
		}
	}
</script>

<style lang="scss">
	.text {
		padding: 10px;
		border-bottom: 1px solid #bdbdbd;
	}

	button {
		width: 600rpx;
	}
</style>