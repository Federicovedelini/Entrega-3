import {promises as fs} from "fs"

export default class ProductManager {
    constructor (){
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0

   addProduct = async (title, description, price, imagen, code, stock) => {

    ProductManager.id++
    
    let newProduct = {
        title,
        description,
        price,
        imagen,
        code,
        stock,
        id: ProductManager.id
    };

    this.products.push(newProduct)


 await fs.writeFile(this.patch, JSON.stringify(this.products));
   };


   readProducts = async () =>{
    let respuesta = await fs.readFile(this.patch, "utf-8")
    return JSON.parse(respuesta)
   }


   getProducts = async () => {
    let respuesta2 = await this.readProducts()
    return console.log(respuesta2)
   }

   getProductsById = async(id) =>{
    let respuesta3 = await this.readProducts()
    if(!respuesta3.find(product => product.id === id)){
        console.log("Producto no encontrado")
    } else{
        console.log(respuesta3.find(product => product.id === id));
    }
   };

deleteProductsById = async(id) => {
    let respuesta3 = await this.readProducts()
    let productFilter = respuesta3.filter(products => products.id != id)
    await fs.writeFile(this.patch, JSON.stringify(productFilter));
    console.log("Producto eliminado ")
};

updateProducts = async ({id, ...producto}) => {
    await this.deleteProductsById(id);
    let productOld = await this.readProducts()

    let productsMod = [
      {id, ...producto}, ...productOld];
      console.log(productMod)

};

}

//const productos = new ProductManager();
/*productos.addProduct("titulo1", "description1", 2000, "imagen1", "abcd1", 5);
productos.addProduct("titulo2", "description2", 5000, "imagen2", "abcd2", 2);
productos.addProduct("titulo3", "description3", 3000, "imagen3", "abcd3", 7); 
productos.addProduct("titulo4", "description4", 8000, "imagen4", "abcd4", 2); 
productos.addProduct("titulo5", "description5", 9000, "imagen5", "abcd5", 8); 
productos.addProduct("titulo6", "description6", 2000, "imagen6", "abcd6", 6); 
productos.addProduct("titulo7", "description7", 4000, "imagen7", "abcd7", 1); 
productos.addProduct("titulo8", "description8",2000, "imagen8", "abcd8",3);*/

//productos.getProducts()

//productos.getProductsById(7)

//productos.deleteProductsById(2)

/*productos.updateProducts({
    title: 'titulo3',
    description: 'description3',
    price: 5000,    imagen: 'imagen3',
    code: 'abcd3',
    stock: 5,
    id: 3
})*/