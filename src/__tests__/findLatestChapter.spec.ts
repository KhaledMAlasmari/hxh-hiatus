
import connectToDatabase from '../database/connectToDatabase'
import { latestReleasedChapter } from '../helpers/latestReleasedChapter'
import mongoose from 'mongoose'
jest.useFakeTimers()
beforeAll(async () => {
	try{
		await connectToDatabase()
	}
	catch(error){
		console.log(error)
	}
})
describe('latest chapter is ', () => {
	test('390', () => {
		expect(latestReleasedChapter()).toBe(390)
	})

	afterAll(async () => {
		await mongoose.connection.close()
	})
})
