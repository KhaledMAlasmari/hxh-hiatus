import axios from 'axios'
import { parse } from 'node-html-parser'
const parseStatusFromPage = async (): Promise<hiatusStatus> => {
	const page = (await axios.get('https://www.shonenjump.com/j/weeklyshonenjump/')).data
	const html = parse(String(page))
	const absentSeries = html.querySelector('#weeklyshonenjump > article > section:nth-child(4) > div').lastChild.rawText.trim()
	const issueInfo = html.querySelector('#weeklyshonenjump > article > div > div > #slider').rawText.trim()
	return parseStatusFromText(issueInfo, absentSeries)

}


const parseStatusFromText = (issueRawData: string, absentSeries: string): hiatusStatus => {
	const year = Number(issueRawData.match('[0-9]{4}')[0])
	const issueNumber = issueRawData.match('[0-9]-?[0-9]号|[0-9]号')[0].replace('号', '')
	const isHxHAbsent = absentSeries.indexOf('HUNTER×HUNTER') != -1 ? true : false
	return {issue: issueNumber, isPublished: !isHxHAbsent, year}
}

export{
	parseStatusFromPage,
	parseStatusFromText
}
interface hiatusStatus {
	issue: string,
	isPublished: boolean,
	year: number
}