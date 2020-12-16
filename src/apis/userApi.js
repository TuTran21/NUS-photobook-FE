import config from 'global-config';

const loginApi = `${config.apiUrl}/login`;
const logoutApi = `${config.apiUrl}/logout`;
const checkOTP = `${config.apiUrl}/otp`;
const checkTokenApi = `${config.apiUrl}/checkToken`;

export default { loginApi, logoutApi, checkOTP, checkTokenApi };
