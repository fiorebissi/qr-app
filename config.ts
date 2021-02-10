import dotenv from 'dotenv'

dotenv.config()

const config = {
	port: process.env.PORT || 3000,
	host: process.env.HOST || `http://localhost`,
	nodeEnv: process.env.NODE_ENV || `development`,
}

export default config