export const _SetRandom = ( length , indexOfList ) => {
	let randomNun = Math.floor( Math.random() * length );
	
	if ( randomNun === indexOfList ) {
		randomNun = _SetRandom( length , indexOfList ) ;
	};

	if ( randomNun > length-1 ) randomNun = 0;

	return randomNun;
}