const voca = require('./function')
const Category = require('../category/model')
const Nominal = require('../nominal/model')
module.exports={
    generateProduct : async(req, res)=>{
        try {
            let endpoint = "/products"
            signature = voca.generate_signature(endpoint)
            let url = voca.host + endpoint + "?signature=" + signature;
            const result = voca.voca_curl(url,false,null).then( response => {
                response.data.forEach(function(resp){
                    let name = resp.title;
                    let idCategoryVoca = resp.id

                    let category = Category({name, idCategoryVoca})
                    category.save();
                });
                res.status(200).json({
                    data :response.data
                  })
            })
          
        } catch (err) {
            res.status(500).json({
                data :err
              })
        }
      },
      generateItem : async(req, res)=>{
        try {
            const { id } = req.params;
            let endpoint = "/products/"+id+"/items"
            signature = voca.generate_signature(endpoint)
            let url = voca.host + endpoint + "?signature=" + signature;
            const result = voca.voca_curl(url,false,null).then( response => {
                response.data.forEach(function(resp){
                    let coinQuantity = resp.name;
                    let coinName = "Diamond";
                    let price = resp.price;
                    let idItemVoca = resp.id;
                    let priceVoca = resp.price;

                    let nominal = Nominal({coinQuantity, coinName, price, idItemVoca, priceVoca})
                    nominal.save();
                });
                res.status(200).json({
                    data :response.data
                })
            })
          
        } catch (err) {
            res.status(500).json({
                data :err
              })
        }
      }
}