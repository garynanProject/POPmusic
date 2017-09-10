import OriginJsonp from 'jsonp';

export default function MyJsonp( url , option) {
	return new Promise( (resole , reject) => {

		OriginJsonp( url , option , ( err , data ) => {
			if (!err) {
				resole( data ) ;
			} else {
				reject( err ) ;
			}
		} );
	} );
}