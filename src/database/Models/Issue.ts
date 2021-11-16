import mongoose from 'mongoose'
import issueInterface from '../../helpers/Interfaces/issueInterface'

const issueSchema = new mongoose.Schema({
	issues: [
		{
			issue: String,
			chapter: Number,
			date: Date,
			isPublished: Boolean,
			releaseStreak: Number,
			hiatusStreak: Number,
		},
	],
	year: Number,
})

issueSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Issue = mongoose.model<issueInterface>('Issue', issueSchema)

export default Issue
