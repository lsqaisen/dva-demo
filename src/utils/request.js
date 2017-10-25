import fetch from 'dva/fetch';
import { message } from 'antd';

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {
 * 		code 		number
 * 		error 		string
 * 		data 		object
 * }           An object containing either "data" or "err"
 */
export default async function request(url, options) {
	try {
		const response = await fetch(url, { ...options, mode: 'cors', credentials: 'include' });
		const data = await response.json();
		if (response.status >= 200 && response.status < 300) {
			return {
				code: 0,
				error: null,
				data,
			};
		} else {
			message.error(data.error);
			return {
				code: data.code,
				error: data.error || '未知错误',
				data: null,
			};
		}
	} catch (error) {
		message.error(error);
		return {
			code: 0,
			error: error || '未知错误',
			data: null,
		};
	}
}
