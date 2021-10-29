import mongoose from 'mongoose'
import config from '../utils/config'
import logger from '../utils/logger'

const connectToDatabase = async (): Promise<void> => {
	try{
		const DBURL = config.mongoUrl
		await mongoose.connect(DBURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
	}
	catch(error){
		logger.error(error)
	}

}

export default connectToDatabase