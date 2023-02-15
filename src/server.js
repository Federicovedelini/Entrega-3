import express from "express"
import ProductManager from "./components/ProductManager.js"


const app = express();
app.use(express.urlencoded({extended: true}));

const productos = new ProductManager()
const rearProducts = productos.readProducts()

app.get ("/products", async (req,res) => {
   console.log(await rearProducts);

});


const PORT = 8080;
const server = app.listen(PORT, () =>{

    console.log(`Express por Local Host ${server.address().port}`)

})

server.on("error", (error) => console.log(`Error del servidor ${error}`))