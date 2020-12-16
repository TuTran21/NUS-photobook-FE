const config = {
	BASE_URL: process.env.NODE_ENV === 'development' ? `localhost:${process.env.PORT}` : process.env.BASE_URL,

	DATE_FORMAT: 'YYYY-MM-DD',
	NODE_ENV: process.env.NODE_ENV || 'development',
	PORT: parseInt(process.env.PORT) || 3001,
};

export default config;
