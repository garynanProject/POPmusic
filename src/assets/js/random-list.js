/**
 * [打乱相应的歌单]
 * parme { Array } baseList [ 原来的歌单 ]
 * @return {[ Array ]} [ 打乱后的歌单 ]
 */
export const _RandomList = ( baseList ) => {
	let _BaseList = baseList.slice(0);  // slice.截取数组 ， 是数组变异，返回新数组； 否则会改变原数组；
	const _Length = baseList.length;

	//  洗牌算法
	for ( let i=0; i < _Length; i++ ) {
		const _J =  Math.floor( Math.random() * (i+1) );  
		const _Old = _BaseList[i];

		_BaseList[i] = _BaseList[_J];
		_BaseList[_J] = _Old;
	}

	return _BaseList;
}