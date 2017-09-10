/**
 * 映射  （用它来改变数据状态，再并发出页面的变更）
 * state是一定要传的值 ， 因为要获取的是state中的值
 */

//  获取当前的singerId
export const singerId = ( state ) => {
	return state.singer
};


//  获取当前歌曲在歌单中的序号
export const indexOfList = ( state ) => {
	return state.indexOfList
}

//  获取当前歌曲
export const activeSong = ( state ) => {
	return state.activeSong
}

//  获取当前歌歌单
export const activeList = ( state ) => {
	return state.activeList;
}

//  获取当前的播放情景
export const satuation = ( state ) => {
	return state.stuations
}

//  获取播放器当前是否在播放
export const playing = ( state ) => {
	return state.audioState.playing
}

//  获取mini播放器的开关量
export const miniScreen = ( state ) => {
	return state.audioState.miniScreen
}

//  获取当前的全屏开关量
export const fullScreen = ( state ) => {
	return state.audioState.fullSreeen
}

//  获取歌曲播放进度
export const currentTime = ( state ) => {
	return state.audioState.currentTime
}

//  获取新的歌曲播放进度
export const newProgress = ( state ) => {
	return state.audioState.newProgress
}

//  获取当前的歌曲播放模式
export const newMode = ( state ) => {
	return state.audioState.mode
}
