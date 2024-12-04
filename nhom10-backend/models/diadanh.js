const mongoose = require('mongoose');

const diadanhSchema = new mongoose.Schema({
  madd: { type: String, required: true },
  tendd: { type: String, required: true },
  diachi: { type: String },
  mota: { type: String },
  giatien: { type: String },
  hinhanh: { type: String },
});

const Diadanh = mongoose.model('Diadanh', diadanhSchema, 'diadanhs');

module.exports = Diadanh;