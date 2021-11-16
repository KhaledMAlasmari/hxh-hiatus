import Issue from '../database/Models/Issue'
const latestReleasedChapter = async () => {
	const query = (await (Issue.findOne({'issues.isPublished': true}).sort({year: -1 }).limit(1)))
	
	const findChapter = query.issues.reverse().find((issue) => {return issue.isPublished === true})

	return findChapter
}



export {latestReleasedChapter}