module.exports = (name) => {
    return new Promise((resolve, reject) => {
        if (!name || typeof name !== "string") {
            return reject("Name must be a valid string")
        }
        else if (name.length < 4) {
            return reject("Name must have at least 4 characters")
        }
        resolve(name)
    });
}