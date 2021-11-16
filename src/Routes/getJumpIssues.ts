import { Router } from 'express'
import Issue from '../database/Models/Issue'

const getJumpIssues = Router()
getJumpIssues.get('/jumpIssues', async (request, response)  => {
	try{
		const query = await (Issue.find({}).sort({ field: 'asc', _id: -1 }).select({'issues.issue': 1, 'issues.chapter': 1, 'issues.isPublished': 1, 'year': 1}))
		response.status(200).send(query)
	}
	catch(error){
		response.status(500).send(error)
	}	

})


export default getJumpIssues