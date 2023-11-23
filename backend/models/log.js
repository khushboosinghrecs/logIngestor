// logModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
  level: { type: String},
  message: { type: String },
  resourceId: { type: String },
  timestamp: { type: Date },
  traceId: { type: String },
  spanId: { type: String },
  commit: { type: String },
  metadata: {
    parentResourceId: { type: String }
  }
  
});

const Log = mongoose.model('khushi', logSchema);

module.exports = Log;
