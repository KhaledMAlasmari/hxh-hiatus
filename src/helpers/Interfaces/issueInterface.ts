interface issueInterface {
    issues: Array<{
        issue?: string,
        chapter?: number,
        date?: Date,
        isPublished?: boolean,
        releaseStreak?: number,
        hiatusStreak?: number
    }>
	year: number,
}

export default issueInterface
