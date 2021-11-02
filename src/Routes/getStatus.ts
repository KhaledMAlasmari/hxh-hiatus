import { Router } from 'express'
import Issue from '../database/Models/Issue'

const getStatus = Router()
getStatus.get('/status', async (request, response)  => {
	try{
		const {issue, onHiatus, date} = await Issue.findOne().sort({ field: 'asc', _id: -1 }).limit(1).select({date: 1, issue: 1, onHiatus: 1}).exec()
		response.status(200).send({issue, onHiatus, date})
	}
	catch(error){
		response.status(500).send(error)
	}	

})


export default getStatus