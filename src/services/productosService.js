const fs = require('fs')
const productsJson = require("./productos.json")

class Contenedor {
    constructor(filename) {
        this.filename = filename
    }
    getAllProducts = () => productsJson

    addProduct = async (title, price, thumbnail) => {
        let newProduct = {
            id: this.getAllProducts().length + 1,
            title, price, thumbnail
        }
        this.getAllProducts().push(newProduct)
        await fs.promises.writeFile(`./src/services/${this.filename}`, JSON.stringify(this.getAllProducts()))
    }
}

const productosService = new Contenedor("productos.json")

module.exports = { productosService }
