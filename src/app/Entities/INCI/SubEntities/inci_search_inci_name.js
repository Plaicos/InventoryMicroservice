module.exports = (inci_name) => {
    return new Promise(async (resolve, reject) => {
        if (!inci_name || typeof inci_name !== "string") {
            return reject("Inci name must be a valid string")
        }
        inci_name = new RegExp(".*" + inci_name + ".*")
        resolve(inci_name)
    })
}