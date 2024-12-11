const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    data: {
      encryptedValue: { type: String, required: true },
      hashedValue: { type: String, required: true },
    },
    confidential: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
