const mongoose = require('mongoose');
let db = mongoose.connection;

function connectToDB() {
	return new Promise((resolve, reject) => {
		mongoose.connect('mongodb://localhost:27017/my_data1');
		db.on('error', function (err) {
			console.log(err);
			setTimeout(() => {
				connectToDB();
			}, 5000);
		});
		db.once('open', async function() {
			console.log("Р‘Р°Р·Р° Р·Р°РїСѓС‰РµРЅР°");
			resolve(true);
		});
	});	
};

module.exports = {
	connectToDB
}
//мамлмоалтмо