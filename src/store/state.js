/**
 * 这里负责储存一些公共的数据或者状态
 */

const state = {
	//  当前的歌手id
	singer: null,

	//  记录当前播放歌曲的信息
	activeSong: {},

	//  记录当前歌单
	activeList: [],

	//  记录当前歌曲在歌单中的序号
	indexOfList: null,

	//  记录播放器状态
	audioState: {
		playing: false,
		miniScreen: false,
		fullSreeen: false,
		currentTime: 0,
		newProgress: 0,
		mode: 'sequence',    //sequence为列表循环 、 loop为单曲循环 、 random为随机
	},

	//  记录播放场景
	stuations: {
		'recommand': false,
		'singer': false,
		'ranking': false,
		'my-list': false,
		'favorite': false,
		//  场景  'recommand'为推荐歌单、'singer'为歌手歌单、'ranking'为排行榜、
		//  'my-list'为自定义歌单、 'favorite'为最爱歌单
	},

	//  记录用户自定义歌单
	myList: {
		//  默认歌单
		'default': [],
			// 可自定义...
	},

	//  记录用户最爱歌曲的歌单
	myFavorite: [],
};

export default state;