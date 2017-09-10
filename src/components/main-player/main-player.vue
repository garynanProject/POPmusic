<template>
	<transition name="main-player" tag="div">
		<div class="main-player-box" @touchstart.stop.prevent=" registSlectMode ">
			<!-- 背景 -->
				<div class="background-box" :style=" background "></div>
				<div class="filter-box"></div>
			<!-- 返回按钮 -->
			<div class="back-down" @touchstart.prevent.stop=" backdown ">
				<i class="icon-back"></i>
			</div>
			<!-- 头部 -->
			<div class="main-player-header">
				<h3>{{ activeSong.songname }}</h3>
				<p>{{ activeSong.singer }}</p>
			</div>

			<!-- cd-room -->
			<div class="cd-room">
				<div class="cd-box">
					<img :src="activeSong['song-poster']" alt="" ref="cd" style=" display: none; ">
					<p class="cd-box_ly"></p>
				</div>
				<div class="ly-tags">
					
				</div>
			</div>

			<!-- 播放工具 -->
			<div class="player-tools">
				<!-- 进度条 -->
				<div class="progress">
					<span class="time timenow">{{ timeNow }}</span>
					<div class="progress-bar">
						<div class="progress-inner" 
						@touchstart.stop.prevent=" updataProgressByTouch ">
							<div class="progress-update" ref="progress-update">
								<div class="loder" ref="loder" 
								@touchstart.stop.prevent=" FristPosXandFristWidth "
								@touchmove.stop.prevent=" getMoveX "
								@touchend.stop.prvent=" updataProgress( newWidth , maxWidth ) "
								></div>
							</div>
						</div>
					</div>
					<span class="time timemax">{{ timeOut }}</span>
				</div>
				<!-- 按钮栏 -->
				<div class="btn-bar">
					<span class="out-box txt-right" 
					@touchstart.stop.prevent=" selectingMode ">
						<i :class=" activeModeClass "></i>
					</span>
					<span class="out-box txt-right" @touchstart.stop.prevent=" prueSong ">
						<i class="icon-prev"></i>
					</span>
					<span class="inner-box txt-center" @touchstart.stop.prevent=" playOrNot ">
						<i :class=" btnClassNow "></i>
					</span>
					<span class="out-box txt-left" @touchstart.stop.prevent=" nextSong ">
						<i class="icon-next"></i>
					</span>
					<span class="out-box txt-left">
						<i class="icon icon-not-favorite"></i>
					</span>
				</div>
			</div>

			<!-- 隐藏的播放模式选择栏 -->
			<transition name="select-mode">	
				<ul class="hide-mode-selector" v-show=" modeSelect ">
					<ul class="hide-mode-selector_inner">
						<li v-for=" (i,index) in selModeData ">
							<div :class=" {active: i.active} "
							@touchstart.stop.prevent=" selThisMode( i ) ">
								<i :class=" i.class "></i>
								<span>{{ i.txt }}</span>
							</div>
						</li>
					</ul>
				</ul>
			</transition>
		</div>
	</transition>
</template>

<script>
  //  vuex
	import { mapMutations , mapActions , mapGetters } from 'vuex';
	//  公用方法
	import { _GetPos } from 'assets/js/getpos';
  import { _RandomList } from 'assets/js/random-list';

	export default {
		name: 'mainPlayerBox',

		data() {
			return {
				maxWidth: 220,
				newWidth: 0,
				activeModeClass: 'icon-sequence',
				modeSelect: false,
				selModeData: [
					{
						class: 'icon-sequence',
						txt: '列表循环',
						type: 'sequence',
						active: true,
					},

					{
						class: 'icon-loop',
						txt: '单曲循环',
						type: 'loop',
						active: false,
					},

					{
						class: 'icon-random',
						txt: '随机播放',
						type: 'random',
						active: false,
					},
				],
			};
		},

		computed: {
			...mapGetters( [
					'indexOfList',
	        'activeSong',
	        'activeList',
	        'playMode',
					'currentTime',
					'fullScreen',
					'playing',
					'newMode',
			] ),

			//  计算当前歌曲对应的背景
			background() {
				return [{ 
					background: 
					`
						url('${this.activeSong["song-poster"]}')
						center center / 100% 100% no-repeat
					`
				 }];
			},

			//  计算当前歌曲的已播放时间
			timeNow() {
				const _base = this.currentTime;
				let _Min = parseInt( _base / 60 );
				let _Sec = _base % 60;
				if( _Sec < 10 ) _Sec = `0${_Sec}`;
				return `${_Min}:${_Sec}`;
			},

			//  计算当前歌曲的播放时长
			timeOut() {
				const _base = this.activeSong.time;
				let _Min = parseInt( _base / 60 );
				let _Sec = _base % 60;
				if( _Sec < 10 ) _Sec = `0${_Sec}`;
				return `${_Min}:${_Sec}`;
			},

			//  计算歌曲已播放到总时长的百分之几
			precent() {
				const _Time = this.currentTime;
				const _TimeOut = this.activeSong.time;
				const _Precent = _Time / _TimeOut * 100;

				return _Precent;
			},

			//  计算播放机开关的class
      btnClassNow() {
        return this.playing ? 'icon-pause' : 'icon-play' ;
      },
		},

		watch: {
			//  播放进度百分比一改变 ， 进度条的样式改变；
			precent( val ) {
				const _OProgressUpdate = this.$refs['progress-update'];

				_OProgressUpdate.style.width = this.precent + '%';
			},

			// 配合cd移动动画
			fullScreen( flag ) {
				if ( flag ) {
					setTimeout( () => {
						this.$refs.cd.style.display = 'block';
					} , 700 )
				} else {
					this.$refs.cd.style.display = 'none';

					//  全屏退出的时候 ， 隐藏的模式选择栏应该也消失
					this.modeSelect = false;
				}
			},

			playing( flag ) {
				const _oCD = this.$refs.cd;
    		const rotateBase = `rotate 6s linear 0s infinite`;

				if (flag) {
					_oCD.style.animation = `${rotateBase} running`;
				} else {
					_oCD.style.animation = `${rotateBase} paused`;
				}
			},

			newMode( mode ) {
				this.activeModeClass = `icon-${ mode }`;  //  根据当前的播放模式改变按钮样式
				const _Length = this.selModeData.length;

				for ( let i=0; i<_Length; i++  ) {  //  全部恢复默认
					this.selModeData[i].active = false;
				}

				if ( mode === 'random' ) {
					//  打乱当前列表
					const _NewList = _RandomList(this.activeList);
					this.setActiveList( _NewList );   

					//  改变隐藏模式选择栏的随机按钮高亮
					this.selModeData[2].active = true;  

				} else if ( mode === 'loop' ) {
					//  改变隐藏模式选择栏的单曲循环按钮高亮
					this.selModeData[1].active = true; 

				} else if ( mode === 'sequence' ) {
					//  改变隐藏模式选择栏的列表循环按钮高亮
					this.selModeData[0].active = true; 
				}  
			},
		},

		methods: {
			...mapMutations( {
         setActiveSong: 'SET_ACTIVE_SONG',
         setIndexOfList: 'SET_INDEX_OF_LIST',
         setActiveList: 'SET_ACTIVE_LIST',
      } ),

			...mapActions( [
        'ChangeFullScreen',
        'ChangeNewProgress',
        'ChangeBtnToggle',
        'ChangeNewModes',
      ] ),

			//  播放器退出全屏
			backdown() {
				this.ChangeFullScreen( false );
			},

			FristPosXandFristWidth(ev){
				const _OProgressUpdate = this.$refs['progress-update'];
				let _posX = _GetPos(ev).x;
				let _width = _OProgressUpdate.offsetWidth;

				this.loderX = _posX;
				this.loderWidth = _width;
			},

			getMoveX(ev) {
				const _OProgressUpdate = this.$refs['progress-update'];  //  进度条
				const _baseX = this.loderX;		//  初始鼠标X坐标
				const _baseWidth = this.loderWidth;		//  初始进度条宽度
				const _maxWidth = 220;		//  最大进度条宽度
				let _posX = _GetPos(ev).x;    //  获取动态的鼠标X坐标
				
				//  计算移动后进度条宽度为多少
				let _moveX = _baseWidth + (_posX - _baseX);
				_moveX =	_moveX > _maxWidth ? _maxWidth : _moveX;
				_OProgressUpdate.style.width = _moveX + 'px';

				this.newWidth = _moveX;
			},

			//  拖动更新state中newProgress，更新歌曲播放进度
			updataProgress(moveX , maxWidth) {
				if( !moveX || !maxWidth ) return;

				let _precent = moveX / maxWidth;
				let _duration = this.activeSong.time;
				let _newProgress = _duration * _precent;

				console.log( _newProgress );
				this.ChangeNewProgress( _newProgress );  //  设下新进度
				this.ChangeBtnToggle( true )  //  开始播放
			},

			//  点击更新state中newProgress，更新歌曲播放进度
			updataProgressByTouch(ev) {
				let _posX = this.getTouchPosX(ev);
				let _delX = 65;		//  进度条的左边空白距离
				let _base = ev.target.offsetWidth;
				let _duration = this.activeSong.time;

				let _newProgress = (_posX - _delX) / _base * _duration;

				console.log( _newProgress );
				this.ChangeNewProgress( _newProgress );  //  设下新进度
				this.ChangeBtnToggle( true )  //  开始播放
			},

			getTouchPosX(ev) {
				return _GetPos(ev).x;
			},

			//  主播放器控制，播放启停
			playOrNot() {
				if ( !this.playing ){
					this.ChangeBtnToggle( true );
				} else {
					this.ChangeBtnToggle( false );
				}
			},

			//  点击下一首按钮 ，到下一首歌
			nextSong() {
        //  获取当前歌曲在歌单中的序号
        var nextIndex = this.indexOfList;
        //  获取当前歌单长度
        var length = this.activeList.length;
        
       
        //  每次函数执行+1 ， 变为下一首歌的序号
        nextIndex++;
        if ( nextIndex > length-1 ) nextIndex = 0;

        this.setSong(nextIndex);
      },

      //  点击上一首按钮 ，到上一首歌
			prueSong() {
        //  获取当前歌曲在歌单中的序号
        var nextIndex = this.indexOfList;
        //  获取当前歌单长度
        var length = this.activeList.length;
        
       
        //  每次函数执行-1 ， 变为上一首歌的序号
        nextIndex--;
        if ( nextIndex < 0 ) nextIndex = length-1;

        this.setSong(nextIndex);
      },

      setSong(index) {
      	var newSong = null;

				//  下一首歌的data
        newSong = this.activeList[index];

        // 把下一首歌的data ,赋给vuex.state.activeSong,
        this.setActiveSong( newSong );
        // 把vuex.state.indexOfList, 变为把下一首歌的序号
        this.setIndexOfList( index );
      },

      selectingMode() {
				this.modeSelect = !this.modeSelect;
			},

			selThisMode( item ) {
				const _All = this.selModeData;
				const _Length = _All.length;

				for ( let i=0; i<_Length; i++ ){
					_All[i].active = false;
				}

				item.active = true;
				this.modeSelect = false;

				this.ChangeNewModes( item.type );
			},

			//  点击全屏播放器空余地方 ， 让隐藏播放按钮关闭
			registSlectMode() {
				this.modeSelect = false;
			}
		},
	};
</script>

<style scoped src="assets/css/main-player.css"></style>