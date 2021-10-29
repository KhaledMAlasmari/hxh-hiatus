import express from 'express'
import cors from 'cors'
import path from 'path'
import getStatus from './Routes/getStatus'


const app = express()
app.use(cors())
app.use(express.json())
// routes
app.use(getStatus)
if (process.env.NODE_ENV === 'production') {
	const publicPath = path.join(__dirname, '../public')
	app.use(express.static(publicPath))
	app.use('*', express.static(publicPath))
}


export default app
