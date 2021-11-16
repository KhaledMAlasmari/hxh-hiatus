
import { parseStatusFromText } from '../helpers/parseStatusFromPage'

describe('Series Status', () => {
	test('is on hiatus and it\'s a single issue', () => {
		expect(parseStatusFromText('2021年47号', '『HUNTER×HUNTER』『僕のヒーローアカデミア』は休載です。')).toStrictEqual({issue: '47', isPublished: false})
	})
	test('is on hiatus and it\'s a double issue', () => {
		expect(parseStatusFromText('2021年3-4号', '『HUNTER×HUNTER』『僕のヒーローアカデミア』は休載です。')).toStrictEqual({issue: '3-4', isPublished: false})
	})
	test('is back and it\'s a single issue', () => {
		expect(parseStatusFromText('2021年23号', '『僕のヒーローアカデミア』は休載です。')).toStrictEqual({issue: '23', isPublished: true})
	})
	test('is back and it\'s a double issue', () => {
		expect(parseStatusFromText('2021年5-6号', '『僕のヒーローアカデミア』は休載です。')).toStrictEqual({issue: '5-6', isPublished: true})
	})
})
