const mongoose = require('mongoose')

let nominalSchema = mongoose.Schema({
  coinQuantity: {
    type: String,
    default: 0
  },
  coinName: {
    type: String,
    require: [true, 'Nama koin harus diisi']
  },
  price: {
    type: Number,
    default: 0
  },
  idItemVoca: {
    type: Number,
    default: 0
  },
  priceVoca: {
    type: Number,
    default: 0
  },
}, { timestamps: true })

module.exports = mongoose.model('Nominal', nominalSchema)
