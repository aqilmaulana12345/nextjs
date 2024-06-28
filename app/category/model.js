const mongoose = require('mongoose')

let categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama kategori harus diiisi']
  },
  idCategoryVoca: {
    type: Number,
    default: 0
  },
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)