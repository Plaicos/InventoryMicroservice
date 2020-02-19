module.exports = ({ shelf_life }) => {
    return new Promise((resolve, reject) => {
        shelf_life = parseInt(shelf_life, 10)

        if (isNaN(shelf_life)) {
            return reject("Shelf life must be a valid number")
        }
        resolve(shelf_life)
    });
}