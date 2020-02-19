module.exports = (manufacturer) => {
    return new Promise(async (resolve, reject) => {
        if (!manufacturer || typeof manufacturer !== "string") {
            return reject("Manufacturer must be a valid string")
        }
        if (manufacturer.length < 1) {
            return reject("Manufacturer must have at least 1 characters")
        }
        resolve(manufacturer)
    });
}