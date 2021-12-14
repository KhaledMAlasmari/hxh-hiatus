import * as cron from 'node-cron'
import Issue from '../database/Models/Issue'
import { latestReleasedChapter } from '../helpers/latestReleasedChapter'
import { parseStatusFromPage } from '../helpers/parseStatusFromPage'
import logger from '../utils/logger'
const updateSeriesStatus: cron.ScheduledTask = cron.schedule(' 0 0 6 * * MON *', async () => {
	const thisWeekIssue = await parseStatusFromPage()
	const getLatestYearIssues = await (Issue.findOne().sort({ field: 'asc', _id: -1 }).limit(1))
	const lastWeekIssue = getLatestYearIssues.issues[getLatestYearIssues.issues.length-1]
	const lastWeekIssueYear = getLatestYearIssues.year
	const lastChapter = await latestReleasedChapter()
	const chapter = thisWeekIssue.isPublished ? lastChapter.chapter +1: -1
	const releaseStreak = thisWeekIssue.isPublished ? lastWeekIssue.releaseStreak+1: 0
	const hiatusStreak = !thisWeekIssue.isPublished ? lastWeekIssue.hiatusStreak+1: 0
	if(thisWeekIssue.year == lastWeekIssueYear){
		if(parseInt(thisWeekIssue.issue) > parseInt(lastWeekIssue.issue)){
			getLatestYearIssues.issues.push({issue: thisWeekIssue.issue, chapter, date: new Date(), isPublished: thisWeekIssue.isPublished, releaseStreak, hiatusStreak})
			await getLatestYearIssues.save()
		}
	}
	else if(thisWeekIssue.year > lastWeekIssueYear){
		const issue = new Issue({
			issues: [{issue: thisWeekIssue.issue, chapter , date: new Date(), isPublished: thisWeekIssue.isPublished, releaseStreak, hiatusStreak}],
			year: thisWeekIssue.year
		})
		await issue.save()
	}


}, {scheduled: true ,timezone: 'Japan'})


export default updateSeriesStatus