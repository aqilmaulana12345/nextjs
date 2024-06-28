const voca = require('../voca/function')
const Transaction = require('../transaction/model')
module.exports={
    callback : async(req, res)=>{
        try {
            let callbackKey = req.header('X-Callback-Key')
            let id = req.body.reference;

            try{
                const transaction = await Transaction.findOne({_id:id})
            }catch(err){
                res.status(500).json({
                    data : "Transaction not found"
                })
            }

            let status = req.body.status;
            let keterangan = req.body.sn;

            try{
                await Transaction.findByIdAndUpdate({_id : id}, {status,keterangan})
            }catch(err){
                res.status(500).json({
                    data : "Transaction not found"
                })
            }

            if(voca.callbackKey == callbackKey){
                res.status(200).json({
                    data : status
                })
            }else{
                res.status(500).json({
                    data : "invalid Callback Key"
                })
            }
            
        } catch (err) {
            res.status(500).json({
                data :err
            })
        }
    },
}