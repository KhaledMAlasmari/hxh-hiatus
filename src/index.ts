import app from './app'
import http from 'http'
import config from './utils/config'
import connectToDatabase from './database/connectToDatabase'
import logger from './utils/logger'

import { exit } from 'process'
import updateSeriesStatus from './scheduledJobs/updateSeriesStatus'

const httpServer = http.createServer(app)

httpServer.listen(config.PORT, async () => {
	try{
		await connectToDatabase()
		updateSeriesStatus.start()
		logger.info(`The server is listening on http://localhost:${config.PORT}`)
	}
	catch(error){
		logger.error(error)
		exit(1)
	}
})
