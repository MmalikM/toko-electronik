const express = require("express");
const Controller = require("./controllers");

const app = express()
const port = process.env.PORT || 4000

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.get('/products', Controller.getProduct)
app.get('/products/:id', Controller.getProductById)
app.post('/products', Controller.createProduct)
app.delete('/products/:id', Controller.deleteProduct)
app.put('/products/:id', Controller.editProduct)

app.get('/users',Controller.getUser)
app.post('/users', Controller.createUser)
app.delete('/users/:id',Controller.deleteUser)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });