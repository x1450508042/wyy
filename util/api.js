const BASE_URL = 'http://43.136.35.154:3000'
export const myRequest = (options) => {

	return new Promise((resolve, resject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if (res.data.code === 200) {
					resolve(res)
				}else{
					return uni.showToast({
						title: "请求失败",
						icon:'error'
					})
				}
			},
			fail: (err) => {
				uni.showToast({
					title: "请求失败",
					icon:'error'
				})
				resject(err)
			}
		})
	})
}
