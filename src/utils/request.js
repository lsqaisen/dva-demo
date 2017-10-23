import fetch from 'dva/fetch';

function checkStatus(response) {
	console.log(response, 4323434)
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	console.log(response, 2222)
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
	return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
	try {
		const response = await fetch(url, { ...options, mode: 'cors', credentials: 'include' });
		if (response.status >= 200 && response.status < 300) {
			try {
				const data = await response.json();
				if (response.status >= 200 && response.status < 300) {
					return { data, error: null }
				} else {
					return { error: 'error', data, }
				}
			} catch (error) {
				return { error, data: null }
			}
		} else {
			return { error: 'error', data: null }
		}
	} catch (error) {
		return { error, data: null }
	}

	// checkStatus(response);

	// console.log(data, 4323434)
	// const data = await response.json();
	// const ret = {
	//   data,
	//   headers: {},
	// };

	// if (response.headers.get('x-total-count')) {
	//   ret.headers['x-total-count'] = response.headers.get('x-total-count');
	// }

	return data;
}
