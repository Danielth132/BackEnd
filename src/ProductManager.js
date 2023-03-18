import fs from "fs"

class ProductManager {

    constructor(){
        this.products = [];
        this.userDirPath = "./files";
        this.usersFilePath = this.userDirPath + "/Productos.json";
        this.fileSystem = fs;  
    }
    

    generateID = ()=>{
        if (this.products.length === 0) {
            return 0
        } else{
            let id = this.products[(this.products.length) - 1].id + 1
            return id
        }
    }
    
    valideCode = (code) =>{
        let estaCod = false
        this.products.map((prod)=>{
            if(prod.code === code){
                estaCod = true
                return estaCod
            }
        })
        return estaCod
    }

    addProduct = async(title,description,price,thumbnail,code,stock)=>{
        const producto = {
            id:0,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code ,
            stock: stock
        }
        
        if (title === undefined || description === undefined ||price === undefined ||thumbnail === undefined || code === undefined ||stock === undefined){
            console.log("Faltan datos")
        } else {
            try {
                await this.fileSystem.promises.mkdir(this.userDirPath, { recursive: true });
                if (!this.fileSystem.existsSync(this.usersFilePath)) {
                    await this.fileSystem.promises.writeFile(this.usersFilePath, "[]");
                }

                let productosFile = await this.fileSystem.promises.readFile(this.usersFilePath, "utf-8");

                this.products = JSON.parse(productosFile)

                let estaCod = this.valideCode(code)

                if (estaCod){
                    console.log(`El codigo del producto ${title} ya existe`)
                } else {
                    producto.id = this.generateID()
                    this.products.push(producto)

                    await this.fileSystem.promises.writeFile(this.usersFilePath, JSON.stringify(this.products));
                    
                    console.log("Se agrego el producto " + title)
                }
                
            }catch(error){
                
                console.error(`detalle del error: ${error}`);
                throw Error(` detalle del error: ${error}`);
                    
            }

            
        }
        
    }
    getProducts = async()=>{
        try {
            
            await this.fileSystem.promises.mkdir(this.userDirPath, { recursive: true });
            
            if (!this.fileSystem.existsSync(this.usersFilePath)) {
                
                await this.fileSystem.promises.writeFile(this.usersFilePath, "[]");
            }

            let productosFile = await this.fileSystem.promises.readFile(this.usersFilePath, "utf-8");
            
            this.products = JSON.parse(productosFile);
            return this.products;

        } catch(error){
            
            console.error(`detalle del error: ${error}`);
            throw Error(` detalle del error: ${error}`);    
        }
    }
    getProductById = async(id)=>{

        try {
            
            await this.fileSystem.promises.mkdir(this.userDirPath, { recursive: true });
            
            if (!this.fileSystem.existsSync(this.usersFilePath)) {
                
                await this.fileSystem.promises.writeFile(this.usersFilePath, "[]");
            }

            let productosFile = await this.fileSystem.promises.readFile(this.usersFilePath, "utf-8");
            
            this.products = JSON.parse(productosFile);
            
            let exito = false
            let index = 0
            this.products.map((prod,indice)=>{
                if (prod.id === id){
                    exito = true
                    index = indice
                }
            })

            if(exito){
                console.log("Producto encontrado")
                return this.products[index]

            }else{
                return console.log("Not Found")
            }
        } catch(error){
            console.error(`detalle del error: ${error}`);
            throw Error(` detalle del error: ${error}`);
                
        }
        
    }

    updateProduct = async(id,title,description,price,thumbnail,code,stock)=>{
        if (id === undefined || title === undefined || description === undefined ||price === undefined ||thumbnail === undefined || code === undefined ||stock === undefined)  {
            return console.log("Error faltan datos, no se modifico el producto con el ID: " + id)
        } else {

            try {
                await this.fileSystem.promises.mkdir(this.userDirPath, { recursive: true });
                if (!this.fileSystem.existsSync(this.usersFilePath)) {
                    await this.fileSystem.promises.writeFile(this.usersFilePath, "[]");
                }
                
                let productosFile = await this.fileSystem.promises.readFile(this.usersFilePath, "utf-8");
                 
                this.products = JSON.parse(productosFile);

                let find = false
                let index = 0
                this.products.map((prod,indice)=>{
                    if (prod.id === id) {
                    
                        find = true
                        index = indice
                    }
                })

                if (find) {

                    let estaCod = this.valideCode(code)
                    if (estaCod && this.products[index].code !== code ) {
                        return console.log("El code ya existe, no se modifico el producto con ID: " + id )
                    } else {
                        this.products[index].title = title
                        this.products[index].description = description
                        this.products[index].price = price
                        this.products[index].thumbnail = thumbnail
                        this.products[index].code = code
                        this.products[index].stock = stock
                        
                        await this.fileSystem.promises.writeFile(this.usersFilePath, JSON.stringify(this.products));
           
                        return console.log("Se actualizo el producto con ID: " + id)
                    }

                     
                }else{
                        return console.log("No se encontro ID: " + id)
                }

            
            } catch (error) {
                console.error(`detalle del error: ${error}`);
                throw Error(` detalle del error: ${error}`);
            }
        }
    }

    deleteProduct = async(id)=>{
        try {
            await this.fileSystem.promises.mkdir(this.userDirPath, { recursive: true });
            if (!this.fileSystem.existsSync(this.usersFilePath)) {
                await this.fileSystem.promises.writeFile(this.usersFilePath, "[]");
            }
            
            let productosFile = await this.fileSystem.promises.readFile(this.usersFilePath, "utf-8");
            
            this.products = JSON.parse(productosFile);

            this.products = this.products.filter((product) => product.id !== id)

            await this.fileSystem.promises.writeFile(this.usersFilePath, JSON.stringify(this.products));
           
            console.log("Se actualizaron los productos ")
        } catch(error) {
            console.error(`detalle del error: ${error}`);
            throw Error(` detalle del error: ${error}`);
        }
    }

}

//module.exports = ProductManager;
export default ProductManager
