import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		name:'12123',
		playList: [{ //播放列表
			al: {
				id: 134515306,
				name: "潜泳",
				pic: 109951166504611420,
				picUrl: "https://p2.music.126.net/-JG2clNjE56LJ-tde6vyMA==/109951166504611427.jpg",
				pic_str: "109951166504611427",
			},
			name: "潜泳",
			id: 1885421530,
			ar: [{
				name: "马頔"
			}]
		}],
		isPlay:true,  // true 音乐暂停  false 播放
		Audio : uni.createInnerAudioContext(),  // uniapp 播放音乐的函数
		playIndex:0, //当前播放的哪一首
		cnnuni:false, // 当前状态是否播放
		duration:267.102041, //当前音乐总时长
		setduration:-1, //当前音乐播放时长
		
		
		
		
		
		//公共的变量，这里的变量不能随便修改，只能通过触发mutations的方法才能改变
	},
	mutations: {
		//相当于同步的操作
		setIsPlay(state,data){
			state.isPlay=data
		},
		setPlayList(state,data){
			state.playList=[...state.playList,data]
			state.playIndex=state.playList.length-1
		},
		setIndex(state,index){
			state.playIndex=index
		},
		setcnnuni(state,a){
			state.cnnuni=a
		},
			
		getduration(state,times){	//修改歌曲总时长
			state.duration=times
		},
		getSetduration(state,times){	//修改当前歌曲时长
			state.setduration=times
		},
		SETPLAYLIST02(state,data){
			state.playList=[...state.playList,data]
			state.playIndex=state.playList.length-1
		}
	},
	actions: {
		//相当于异步的操作,不能直接改变state的值，只能通过触发mutations的方法才能改变
		setPlayList02({commit},data){
			let playList={}
			const ar = data.artists.map(item=>{
				return {
					name:item.name,
					id:item.id,
					img:item.img1v1Url
				}
			})
			playList={ //播放列表
				al: {
					id: data.album.id,
					name: data.album.name,
					pic: data.album.pic,
					picUrl: data.album.artist.img1v1Url,
				},
				name:data.name,
				id: data.id,
				ar: ar,
				duration:data.duration

			}
			commit('SETPLAYLIST02',playList)
		}
	},
	getters:{
		getBackgroundImageUrl: state => state.playList[state.playIndex].al.picUrl
	}
})
export default store