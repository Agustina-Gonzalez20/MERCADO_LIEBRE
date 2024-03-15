const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


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
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
	
	},

	// Update - Form to edit
	edit: (req, res) => {
		let p =req.params.id
		let pedit = products.find((p3)=>{return p==p3.id});
		res.render("product-edit-form",{p4:pedit})
	},
	// Update - Method to update
	update: (req, res) => {
		res.send("producto editado")
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		res.send("producto eliminado")

	}
};

module.exports = controller;