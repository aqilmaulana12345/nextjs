const Transaction = require('./model')
const voca = require('../voca/function')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus }
      const transaction = await Transaction.find().populate('player')

      res.render('admin/transaction/view_transaction', {
        transaction,
        alert,
        name: req.session.user.name,
        title: 'Halaman metode pembayaran'
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/transaction')
    }
  },

  actionStatus :  async (req, res)=>{
    try {

      const { id } = req.params
      console.log("id >>")
      console.log(id)
      let { status } = req.query

      if(status == "Success"){
        //call api transaction

        let endpoint = "/transaction"
        const transaction = await Transaction.findOne({_id : id})
        signature = voca.generate_signature(endpoint)
        let url = voca.host + endpoint + "?signature=" + signature;
        
        let explode = transaction.accountUser.split('(');
        userId = explode[0].replace(/[^0-9]/g,'');
        zoneId = explode[1].replace(/[^0-9]/g,'');

        let datas = {
          productId: transaction.historyVoucherTopup.idCategoryVoca,
          productItemId: transaction.historyVoucherTopup.idItemVoca,
          data:{
            userId: `${userId}`,
            zoneId: `${zoneId}`,
          },
          reference: id,
          callbackUrl: "https://websitekalian.com/callback"
        }
        const result = voca.voca_curl(url,true,datas).then( async (response) => {
          console.log(response.data)
          status = 'Processing';
          keterangan = 'Menghubungi server voca.'
          await Transaction.findByIdAndUpdate({_id : id}, { status, keterangan })
        }).catch( async (error) => {
          status = 'Failed';
          keterangan = 'Error Menghubungi server voca.'
          await Transaction.findByIdAndUpdate({_id : id}, { status, keterangan })
        })
      }else{
        status = 'Failed';
        keterangan = 'Admin reject transaction.'
        await Transaction.findByIdAndUpdate({_id : id}, { status, keterangan })
      }
      

      req.flash('alertMessage', `Berhasil ubah status`)
      req.flash('alertStatus', 'success')
      res.redirect('/transaction')

      
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/transaction')
    }
  }
}