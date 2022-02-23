
import { parseStatusFromText } from '../helpers/parseStatusFromPage'

describe('Series Status', () => {
	test('is on hiatus and it\'s a single issue', () => {
		expect(parseStatusFromText('2021年47号', '『HUNTER×HUNTER』『僕のヒーローアカデミア』は休載です。')).toStrictEqual({issue: '47', isPublished: false, year: 2021})
	})
	test('is on hiatus and it\'s a double issue', () => {
		expect(parseStatusFromText('2021年3-4号', '『HUNTER×HUNTER』『僕のヒーローアカデミア』は休載です。')).toStrictEqual({issue: '3-4', isPublished: false, year: 2021})
	})

	test('is on hiatus and it\'s a double issue', () => {
		expect(parseStatusFromText('2022年5-6合併特大号 表紙', '『HUNTER×HUNTER』『僕のヒーローアカデミア』は休載です。')).toStrictEqual({issue: '5-6', isPublished: false, year: 2022})
	})

	test('is on hiatus and it\'s a double issue', () => {
		expect(parseStatusFromText('2022年3・4合併特大号 表紙', '『HUNTER×HUNTER』『僕のヒーローアカデミア』は休載です。')).toStrictEqual({issue: '3・4', isPublished: false, year: 2022})
	})

	test('is back and it\'s a single issue', () => {
		expect(parseStatusFromText('2021年23号', '『僕のヒーローアカデミア』は休載です。')).toStrictEqual({issue: '23', isPublished: true, year: 2021})
	})
	test('is back and it\'s a double issue', () => {
		expect(parseStatusFromText('2021年5-6号', '『僕のヒーローアカデミア』は休載です。')).toStrictEqual({issue: '5-6', isPublished: true, year: 2021})
	})
})
