const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	index: (req, res) => {
	let pv= products.filter((pv2)=>{return "visited"==pv2.category})
	let pi= products.filter((pi2)=>{return "in-sale"==pi2.category})
      res.render("index", {pv,pi})
	
	},

};

module.exports = controller;
