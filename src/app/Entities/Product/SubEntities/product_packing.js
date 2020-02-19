module.exports = ({ packing }) => {
    return new Promise(async (resolve, reject) => {
        console.log({ packing })
        function check_packingObj(obj) {
            return new Promise((resolve, reject) => {

                let conditions = [
                    !isNaN(obj.weigth)
                ]

                for (let i of conditions) {
                    if (i !== true) {
                        return reject("Packing object is invalid")
                    }
                }
                let checked_obj = {
                    weigth: obj.weigth
                }
                resolve(checked_obj)
            });
        }

        function parse_packingObjs(obj) {
            obj.weigth = parseFloat(obj.weigth)
            return obj
        }

        if (!packing || !Array.isArray(packing)) {
            return reject("Packing must be a valid array of objects")
        }

        try {
            let packs_arr = []
            for (let pack of packing) {
                pack = parse_packingObjs(pack)
                pack = await check_packingObj(pack)
                packs_arr.push(pack)
            }
            resolve(packs_arr)
        }
        catch (erro) {
            reject(erro)
        }
    });
}