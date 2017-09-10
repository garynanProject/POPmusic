import jsonp from 'assets/js/commond/jsonp';
import { commonParams , option } from 'api/config';

export function request( baseUrl , dynamicUrl ) {
	
	const urlBase =  baseUrl;
	var urlDynamic = dynamicUrl;

	var urlOptions = Object.assign( {} , commonParams , urlDynamic );
	var url = urlAdd( urlBase , urlOptions );
	
	return jsonp( url , option );
}

function urlAdd( urlBase , urlOptions ) {
	var url = '';

	url = urlBase + ( urlBase.indexOf('?') < 0 ? '?' : '') + tab( urlOptions );

	return url;
}

function tab( obj ) {
	var url ='';
	var value = '';

	for ( var key in obj ){
		value = obj[ key ];
		url += `&${ key }=${ encodeURIComponent(value) }`;
	}

	url = url.substring( 1 );

	return url ? url : '' ;
}