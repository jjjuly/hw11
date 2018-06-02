const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const models = {};

models.User = mongoose.model('User', {
	name: String,
	email: String,
	age: Number,
	create_at: { type: Date, default: Date.now}
});

models.Post = mongoose.model('Post', {
	title: String,
	text: String,
	create_at: { type: Date, default: Date.now},
	publication_date: String
	//_id: Schema.ObjectId
});

module.exports = models;