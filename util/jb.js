export const fd = (fn, wait) => {
	let timer
	return function() {
		console.log('进入防抖函数了');
		let context=this
		let args = arguments
		clearTimeout(timer)

		timer = setTimeout(function(){
			fn.apply(context,args)
		}, wait)
	}
}