module.exports = ({ lead_time }) => {
    return new Promise((resolve, reject) => {
        lead_time = parseInt(lead_time, 10)

        if (isNaN(lead_time)) {
            return reject("Shelf life must be a valid number")
        }
        resolve(lead_time)
    });
}