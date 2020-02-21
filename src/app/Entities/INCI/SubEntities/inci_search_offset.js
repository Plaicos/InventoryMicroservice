module.exports = (offset) => {
    return new Promise(async (resolve, reject) => {
        if (!offset || typeof offset !== "string" || offset > 0) {
            return reject("Search offset must be a valid positive integer number")
        }
        resolve(offset)
    })
}