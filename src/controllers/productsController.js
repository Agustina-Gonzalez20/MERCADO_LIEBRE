const fs = require('fs');
const path = require('path');
//1.Traigo todos los prouctos de mi base de datos
let productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products",{products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let p =req.params.id
		let p2 = products.find((p3)=>{return p==p3.id});
		res.render("detail",{p4:p2})	},

	// Create - Form to create
	create: (req, res) => {
	res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		//2. obtengo los datos q me manda el usuario por el body
		const {name,price,discount,category,description} = req.body;
		//3. Crea nueva id.
		const nuevaId= products[products.length - 1].id + 1;
		//4.Nuevo objeto producto.
		const nuevoProducto= {
		 id: nuevaId,
		 name,
		 price,
		 discount,
		 category: category =="visited"? "visited": "in-sale",
		 description,
		 image: "img-bicicleta-fierce.jpg",
		}
		//5.Insertar al nuevoProducto al array
	    products = [...products,nuevoProducto];
	    products = JSON.stringify(products,null,3);
	 
	   fs.writeFileSync(productsFilePath,products,'utf-8');
 
	   return res.redirect("/products")
	
	},

	// Update - Form to edit
	edit: (req, res) => {
		let p =req.params.id
		let pedit = products.find((p3)=>{return p==p3.id});
		res.render("product-edit-form",{p4:pedit})
	},
	// Update - Method to update
	update: (req, res) => {
		const { id } = req.params;
		const {name,price,discount,category,description} = req.body;
 const productsMap = products.map((p) => {
    if (p.id === +id) {
      const productEditado = {
        ...p,
        name: name.trim(),
        price: +price,
		discount: discount.trim(),
        description: description.trim(),
		category: category =="visited"? "visited": "in-sale",
      };

      return productEditado;
    }

    return p;
  });
  products = JSON.stringify(productsMap,null,3);
  fs.writeFileSync(productsFilePath,products,'utf-8');
  res.redirect("/products");

    
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const {id} = req.params

		const productLessOne = products.filter(p => p.id !== +id)
	  
		products = JSON.stringify(productLessOne,null,3);
		fs.writeFileSync(productsFilePath,products,'utf-8');
		res.redirect("/products");
	}
};

module.exports = controller;