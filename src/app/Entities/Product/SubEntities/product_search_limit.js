module.exports = (limit) => {
    return new Promise(async (resolve, reject) => {
        if (!limit || typeof limit !== "string" || limit < 0) {
            return reject("Search limit must be a valid positive integer number")
        }
        resolve(limit)
    })
}