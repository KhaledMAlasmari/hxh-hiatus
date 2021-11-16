import { Router } from 'express'
import Issue from '../database/Models/Issue'

const getStatus = Router()
getStatus.get('/status', async (request, response)  => {
	try{
		const getLatestYearIssues = await (Issue.findOne().sort({ field: 'asc', _id: -1 }).limit(1))
		const {chapter, isPublished, date, issue} = getLatestYearIssues.issues[getLatestYearIssues.issues.length -1] 
		response.status(200).send({issue, isPublished, chapter, date})
	}
	catch(error){
		response.status(500).send(error)
	}	

})


export default getStatus