import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  phone: { type: String, required: true },
  items: [
    {
      name: String,
      price: Number,
      time: String,
    },
  ],
  total: { type: Number, required: true },
});

const History = mongoose.model("History", historySchema);

export default History;
