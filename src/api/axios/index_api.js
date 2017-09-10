import axios from 'axios';

export function getIndex() {
	const url = '/api/getDiscList';
    const data = Object.assign({}, {
        pf: 0,
        jsonp: 'jsonp',
        ids: '23,34,29,31,40,42,44',
        _: '1502761372487'
    })
    return axios(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}