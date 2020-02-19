module.exports = (free_from) => {
    return new Promise(async (resolve, reject) => {
        if (free_from && typeof free_from !== "string") {
            return reject("Product Free From must be a valid string")
        }
        else if (free_from && free_from.length < 4) {
            return reject("Free From, when provided, must contain at least 4 characters")
        }
        else {
            resolve(null)
        }
    })
}