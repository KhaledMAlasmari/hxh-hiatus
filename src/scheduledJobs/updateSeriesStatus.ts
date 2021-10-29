import * as cron from 'node-cron'
import Issue from '../database/Models/Issue'
import { parseStatusFromPage } from '../helpers/parseStatusFromPage'
import logger from '../utils/logger'
// 0 0 6 * * MON *
const updateSeriesStatus: cron.ScheduledTask = cron.schedule('0 0 6 * * MON *', async () => {
	const status = await parseStatusFromPage()
	const latestEntry = await Issue.findOne().sort({ field: 'asc'}).limit(1).exec()
	if(latestEntry === null || latestEntry.issue !== status.issue){
		const issue = new Issue({
			issue: status.issue,
			onHiatus: status.onHiatus,
			date: new Date()
		})
		logger.info(String(issue))
		await issue.save()
	}
}, {scheduled: true ,timezone: 'Japan'})


export default updateSeriesStatus