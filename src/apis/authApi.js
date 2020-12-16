import config from 'global-config';

const loginApi = `${config.API_URL}/auth/login`;
const registerApi = `${config.API_URL}/auth/register`;
const forgotPasswordApi = `${config.API_URL}/auth/forgotpassword`;
const resetPasswordApi = `${config.API_URL}/auth/resetpassword/`;
const verifyEmailApi = `${config.API_URL}/auth/verifyemail/`;
const logoutApi = `${config.API_URL}/logout`;
const checkOTP = `${config.API_URL}/otp`;

export default { loginApi, logoutApi, checkOTP, registerApi, forgotPasswordApi, resetPasswordApi, verifyEmailApi };
