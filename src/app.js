import express from "express";
import ProductManager from "./ProductManager.js";

let productManager = new ProductManager();

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

let consultasArch  = []
let consultas = 0
app.get("/products", async (request, response) => {
  let { limit } = request.query; 

  consultasArch = await productManager.getProducts(); 
  
  consultas = request.query

  let numLimit = parseInt(consultas.limit) 

  if (numLimit) {
    let consultLimit = [];
    for (let i = 0; i < numLimit; i++) {
      consultLimit.push(consultasArch[i]);
    }
    response.send(consultLimit);
  } else {
    response.send(consultasArch);
  }

});


app.get('/products/:pid', async(req, res) => {
  let pid = parseInt(req.params.pid) 
  let producto = await productManager.getProductById(pid)
  
  
  if (producto) {
      res.send(producto) 
  }else{
    res.send({ messasge: "Producto no encontrado!!" })
  }
  
})


app.listen(PORT, async() => {
  console.log(`server run on port: ${PORT}`);
});

