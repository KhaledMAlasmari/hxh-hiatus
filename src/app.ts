import express from 'express'
import cors from 'cors'
import path from 'path'
import getStatus from './Routes/getStatus'
import getJumpIssues from './Routes/getJumpIssues'


const app = express()
app.use(cors())
app.use(express.json())
// routes
app.use(getStatus)
app.use(getJumpIssues)
if (process.env.NODE_ENV === 'production') {
	const publicPath = path.join(__dirname, '../public')
	app.use(express.static(publicPath))
	app.use('*', express.static(publicPath))
}

export default app
