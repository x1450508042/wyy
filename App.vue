<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// @import url("/static/font/font_3939773_wb7bfy4k5um/iconfont.css");
	@font-face {
	  font-family: 'iconfont';  /* Project id 3939773 */
	  src: url('//at.alicdn.com/t/c/font_3939773_52yrp7e8h8.woff2?t=1678943174052') format('woff2'),
	       url('//at.alicdn.com/t/c/font_3939773_52yrp7e8h8.woff?t=1678943174052') format('woff'),
	       url('//at.alicdn.com/t/c/font_3939773_52yrp7e8h8.ttf?t=1678943174052') format('truetype');
	}
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	.iconfont{
	    font-family:"iconfont" !important;
	    font-size:16px;font-style:normal;
	    -webkit-font-smoothing: antialiased;
	    -webkit-text-stroke-width: 0.2px;
	    -moz-osx-font-smoothing: grayscale;}
</style>
