const mongoose = require("mongoose");

const PairAvatarSchema = new mongoose.Schema({
  userGoogleID: String,
	otherGoogleID: String,
	representationName: String,
	totalExperience: Number,
	goalFrequency: Number,
});

// compile model from schema
module.exports = mongoose.model("pairavatar", PairAvatarSchema);