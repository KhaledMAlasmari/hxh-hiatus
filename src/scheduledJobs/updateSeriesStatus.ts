import * as cron from 'node-cron'
import Issue from '../database/Models/Issue'
import { latestReleasedChapter } from '../helpers/latestReleasedChapter'
import { parseStatusFromPage } from '../helpers/parseStatusFromPage'
import logger from '../utils/logger'
// 0 0 6 * * MON *
const updateSeriesStatus: cron.ScheduledTask = cron.schedule(' 0 0 6 * * MON *', async () => {
	const thisWeekIssue = await parseStatusFromPage()
	const getLatestYearIssues = await (Issue.findOne().sort({ field: 'asc', _id: -1 }).limit(1))
	const lastWeekIssue = getLatestYearIssues.issues[getLatestYearIssues.issues.length-1]
	const lastWeekIssueNumber = Number(lastWeekIssue.issue.search('(?<=-)\\d*') !== -1 ? lastWeekIssue.issue.substring(lastWeekIssue.issue.search('(?<=-)\\d*')) : lastWeekIssue.issue)
	const thisWeekIssueNumber = Number(thisWeekIssue.issue.search('(?<=-)\\d*') !== -1 ? thisWeekIssue.issue.substring(thisWeekIssue.issue.search('(?<=-)\\d*')) : thisWeekIssue.issue)
	const lastChapter = await latestReleasedChapter()
	const chapter = thisWeekIssue.isPublished ? lastChapter.chapter +1: -1
	const releaseStreak = thisWeekIssue.isPublished ? lastWeekIssue.releaseStreak+1: 0
	const hiatusStreak = !thisWeekIssue.isPublished ? lastWeekIssue.hiatusStreak+1: 0
	if(thisWeekIssueNumber > lastWeekIssueNumber){
		getLatestYearIssues.issues.push({issue: thisWeekIssue.issue, chapter, date: new Date(), isPublished: thisWeekIssue.isPublished, releaseStreak, hiatusStreak})
		await getLatestYearIssues.save()
	}
	else if(thisWeekIssueNumber < lastWeekIssueNumber){
		const issue = new Issue({
			issues: [{issue: thisWeekIssue.issue, chapter , date: new Date(), isPublished: thisWeekIssue.isPublished, releaseStreak, hiatusStreak}],
			year: lastWeekIssue.date.getFullYear()+1
		})
		await issue.save()
	}
	logger.info(String({lastWeekIssueNumber, thisWeekIssueNumber}))

}, {scheduled: true ,timezone: 'Japan'})


export default updateSeriesStatus