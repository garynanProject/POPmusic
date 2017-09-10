/**
 * 
 * 这里主要是响应用户的操作，改变state状态或做数据请求的；
 * commit 是一个方法，去执行mutations中的某个方法；
 * state 指的就是state.js里的state对象；
 * !!**这两个参数要用"对象的方式"传入**!!
 */

import * as types from './mutation_types';

//  改变state.stuation ， 设置新的情景状态
export const ChangeSatuations = function( {commit,state} , name ) {
	const json = state.stuations;

	for ( var i in json ){
		json[i] = false;
	};
	json[name] = true;

	//  操作mutations中的SET_SATUATION方法
	commit( types.SET_SATUATION , json );
	console.log( state.stuations );
};

//  改变播放器开关量state.audioState.playing
export const ChangeBtnToggle = function( {commit,state} , toggle ) {

	//  操作mutations中的SET_AUDIO_BTN_TOGGLE方法
	commit( types.SET_AUDIO_BTN_TOGGLE , toggle );
	console.log( state.audioState.playing );
};

//  改变mini播放器是否出现
export const ChangeMiniScreen = function ( {commit,state} , toggle ){

	//  操作mutations中的SET_MINI_SCREEN方法
	commit( types.SET_MINI_SCREEN , toggle );
};

//  改变state.audioState.fullScreen,控制播放器是否全屏；
export const ChangeFullScreen = function( {commit,state} , toggle ) {

	//  操作mutations中的SET_FULL_SCREEN方法
	commit( types.SET_FULL_SCREEN , toggle );
	console.log( `全屏？ ${state.audioState.fullSreeen}` )
};

//  改变state.audioState.currentTime,设置歌曲的播放进度
export const ChangeCurrentTime = function( {commit,state} , currentTime ) {

	//  操作mutations中的SET_CURRENT_TIME方法
	commit( types.SET_CURRENT_TIME , currentTime );
};

//  改变state.audioState.newProgress,设置新的歌曲播放进度
export const ChangeNewProgress = function( {commit,state} , newProgress ) {

	//  操作mutations中的SET_NEW_PROGRESSE方法
	commit( types.SET_NEW_PROGRESS , newProgress );
};

//  改变state.audioState.modes,设置新的歌曲播放模式
export const ChangeNewModes = function( {commit,state} , now ) {

	//  操作mutations中的SET_PLAY_MODE方法
	commit( types.SET_PLAY_MODE , now );
	console.log(state.audioState.mode , 'mode');
};

