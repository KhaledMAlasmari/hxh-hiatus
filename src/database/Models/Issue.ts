import mongoose from 'mongoose'
import issueInterface from '../../helpers/Interfaces/issueInterface'

const issueSchema = new mongoose.Schema({
	issue: String,
	date: Date,
	onHiatus: Boolean
})


issueSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v

	}
})


const Issue = mongoose.model<issueInterface>('Issue', issueSchema)

export default Issue
