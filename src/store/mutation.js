/**
 * state是默认一定要传的值！ 因为要改变得是state对象中的数据；
 */

import * as types from './mutation_types';

const mutations = {
	//  设置当前歌手
	[types.SET_SINGER]( state , singer ) {
		state.singer = singer;
	},

	//  设置当前的播放情景
	[types.SET_SATUATION]( state , newSatuations ) {
		state.stuations = newSatuations;
	},

	//  设置当前的播放列表
	[types.SET_ACTIVE_LIST]( state , newList ) {
		state.activeList = newList;

		console.log( state.activeList );
	},

	//  设置当前歌曲在歌单中的序号
	[types.SET_INDEX_OF_LIST]( state , index ) {
		state.indexOfList = index;

		console.log( state.indexOfList );
	},

	//  设置当前播放歌曲
	[types.SET_ACTIVE_SONG]( state , item ) {
		state.activeSong = item;
	},

	//  设置播放器当前的播放状态
	[types.SET_AUDIO_BTN_TOGGLE]( state , toggle ) {
		state.audioState.playing = toggle;
	},

	//  设置mini播放器是否出现
	[types.SET_MINI_SCREEN]( state , toggle ) {
		state.audioState.miniScreen = toggle;
		console.log(state.audioState.miniScreen , 'mini')
	},

	//  设置播放器是否全屏
	[types.SET_FULL_SCREEN]( state , toggle ) {
		state.audioState.fullSreeen = toggle;
	},

    //  设置歌曲当前的进度
    [types.SET_CURRENT_TIME]( state , currentTime ){
    	state.audioState.currentTime = currentTime;
    },

    //  设置新的歌曲进度
    [types.SET_NEW_PROGRESS]( state , newProgress ){
    	state.audioState.newProgress = newProgress;
    },

    //  设置新的歌曲进度
    [types.SET_PLAY_MODE]( state , newMode ){
    	state.audioState.mode = newMode;
    },
    
};

export default mutations;