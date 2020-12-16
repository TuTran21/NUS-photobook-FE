import Cookies from 'js-cookie';

export function removeCSSClass(ele, cls) {
	const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	ele.className = ele.className.replace(reg, ' ');
}

export function addCSSClass(ele, cls) {
	ele.classList.add(cls);
}

export const toAbsoluteUrl = pathname => process.env.PUBLIC_URL + pathname;

export const roundNumberToTwoDecimals = value => {
	return Math.round(value * 100) / 100;
};

// export function setupAxios(axios, store) {
// 	axios.interceptors.request.use(
// 		config => {
// 			const {
// 				auth: { authToken },
// 			} = store.getState();

// 			if (authToken) {
// 				config.headers.Authorization = `Bearer ${authToken}`;
// 			}

// 			return config;
// 		},
// 		err => Promise.reject(err),
// 	);
// }

/*  removeStorage: removes a key from localStorage and its sibling expiracy key
    params:
        key <string>     : localStorage key to remove
    returns:
        <boolean> : telling if operation succeeded
 */
export function removeStorage(key) {
	try {
		localStorage.setItem(key, '');
		localStorage.setItem(key + '_expiresIn', '');
	} catch (e) {
		console.log('removeStorage: Error removing key [' + key + '] from localStorage: ' + JSON.stringify(e));
		return false;
	}
	return true;
}

/*  getStorage: retrieves a key from localStorage previously set with setStorage().
    params:
        key <string> : localStorage key
    returns:
        <string> : value of localStorage key
        null : in case of expired key or failure
 */
export function getStorage(key) {
	const now = Date.now(); //epoch time, lets deal only with integer
	// set expiration for storage
	let expiresIn = localStorage.getItem(key + '_expiresIn');
	if (expiresIn === undefined || expiresIn === null) {
		expiresIn = 0;
	}

	expiresIn = Math.abs(expiresIn);
	if (expiresIn < now) {
		// Expired
		removeStorage(key);
		return null;
	} else {
		try {
			const value = localStorage.getItem(key);
			return value;
		} catch (e) {
			console.log('getStorage: Error reading key [' + key + '] from localStorage: ' + JSON.stringify(e));
			return null;
		}
	}
}
/*  setStorage: writes a key into localStorage setting a expire time
    params:
        key <string>     : localStorage key
        value <string>   : localStorage value
        expires <number> : number of seconds from now to expire the key
    returns:
        <boolean> : telling if operation succeeded
 */
export function setStorage(key, value, expires) {
	if (expires === undefined || expires === null) {
		expires = 24 * 60 * 60; // default: seconds for 1 day
	}

	const now = Date.now(); //millisecs since epoch time, lets deal only with integer
	const schedule = now + expires * 1000;
	try {
		localStorage.setItem(key, value);
		localStorage.setItem(key + '_expiresIn', schedule);
	} catch (e) {
		console.log('setStorage: Error setting key [' + key + '] in localStorage: ' + JSON.stringify(e));
		return false;
	}
	return true;
}

let authToken = '';

/**
 * Set Token
 * @param token
 */
export const setToken = async (token, expireIn = 7) => {
	try {
		authToken = token ? `${token}` : '';
		localStorage.setItem('accessToken', authToken, { expires: expireIn });
	} catch (error) {
		console.log(error);
	}
};

/**
 * Get Token & Set Token In Request
 */
export const getToken = () => {
	try {
		const token = localStorage.getItem('accessToken');
		authToken = token ? token : '';
		return authToken;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Input: Number
 * Output: ABCDEFG
 */

export const incrementAlphabet = int => {
	return String.fromCharCode(65 + int);
};

/**
 * Input: QuestionSections
 * Count questions in question sections and put them as strings to display
 * Output: {'1-5', '6-13', '14-24'}
 */

export const getQuestionSectionQuestionRange = (questionSections, startingNumber = 1) => {
	let questionRange = [];
	let currentEnd = startingNumber;
	console.log(startingNumber);

	questionSections.map((questionSection, idx) => {
		// if (idx === 0) {
		// 	currentEnd = 1;
		// }
		const start = currentEnd;
		const end = questionSection.questions.length + start - 1;
		currentEnd = currentEnd + questionSection.questions.length;
		questionRange.push(`${start}-${end}`);
	});
	console.log(questionRange);
	return questionRange;
};

/**
 * Input: Passages
 * Count questions in passages and put them as strings to display
 * Output: {'1-13', '14-26', '26-40'}
 */

export const getPassageQuestionRange = passages => {
	let questionRange = [];
	let currentEnd;

	passages.map((passage, idx) => {
		let passageQuestionAmount;

		passage.questionSections.map((questionSection, idx) => {
			if (idx === 0) {
				passageQuestionAmount = 0;
			}
			passageQuestionAmount = passageQuestionAmount + questionSection.questions.length;
		});

		if (idx === 0) {
			currentEnd = 1;
		}

		const start = currentEnd;
		const end = passageQuestionAmount + start - 1;
		currentEnd = currentEnd + passageQuestionAmount;
		questionRange.push(`${start}-${end}`);
	});

	return questionRange;
};

/**
 * Input: Int
 * Output: true / false
 */
export function isEven(value) {
	if (value % 2 == 0) return true;
	else return false;
}

/**
 * Get ending number as the next starting number for the passage questionRange
 * Ex: passage 1: 1-13 -> passage 2: 13 + 1 - x
 * Input: String
 * Output: Int
 */
export function getEndingNumber(value) {
	const getNumber = value.substr(value.indexOf('-') + 1, value.length);
	const returnNumber = parseInt(getNumber);
	return returnNumber;
}

/**
 * Input: Int
 * Output: true / false
 */
export function questionIndexing(questionRange) {
	const getNumber = questionRange.substr(0, questionRange.indexOf('-'));
	const startIndex = parseInt(getNumber) - 1;
	return startIndex;
}

/**
 * Used in spliting question content in fill in the gap question
 * Detects the gap by finding [BLANK] in the string and split it into two sides of string
 * Then put an input in between
 * Input: String
 * Output: Two strings without [BLANK]: {leftString: "", rightString: ""}
 */

export function splitStringByBlank(string) {
	const searchTerm = '[BLANK]';
	const searchTermLength = searchTerm.length;
	const findBlank = string.indexOf(searchTerm);
	const leftString = string.substring(0, findBlank);
	const rightString = string.substring(findBlank + searchTermLength, string.length);
	return {
		leftString: leftString,
		rightString: rightString,
	};
}

/**
 * Input: Milliseconds
 * Output: minutes : seconds
 */
export function msToTime(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

// Used for strings contains special characters to refine for later input
// and data storage
export function EscapeQuotationMarks(string) {
	var goodQuotes = string
		.replace(/[\u2018\u2019]/g, "'")
		.replace(/[\u201C\u201D]/g, '"')
		.replace(/(?:\r\n|\r|\n)/g, '\n');
	return goodQuotes;
}

// Used to read image and export to base64
export async function convertToBase64(file) {
	let reader = new FileReader();
	await reader.readAsDataURL(file);
	return reader;
	reader.onloadend = () => {
		return reader.result;
	};
}

// Shallow equal two objects
// Compare two objects

export function objectShallowEqual(object1, object2) {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (let key of keys1) {
		if (object1[key] !== object2[key]) {
			return false;
		}
	}

	return true;
}
