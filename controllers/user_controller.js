const validator = require('froncubator-validator-js');
const {sendErr} = require('../helper');
const userService = require('../services/user_service.js');

const models = require('../models.js');

async function create(req, res) {
	try {
		//let {name} = req.body;
		let name = req.body.name || '';
		let email = req.body.email || '';
		let age = req.body.age || 0;
		//console.log(Number(age))

		if(!validator.isStr(name, 0, 32))
			return sendErr(res, 'Ошибка в формате name. Поле не должно быть больше 32 символов');
		if(!validator.isEmail(email))
			return sendErr(res, 'Ошибка в формате email');
		if(!validator.isInt(Number(age)))
			return sendErr(res, 'Ошибка в формате age');
		let nameObject = {
			name: name
		}
		let exist = await userService.find(nameObject, 'User');
		if(exist)
			return sendErr(res, 'Пользователь с таким именем уже существует');
		let user = await userService.create1({
			name,
			email,
			age
		}, 'User');
		//await userService.show('User');
		res.send(user);
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}
	
};

async function change(req, res) {
	try {
		let name = req.body.name || '';
		let newEmail = req.body.newEmail || '';
		let newAge = req.body.newAge || 0;


		if(!validator.isEmail(newEmail) && (newEmail))
			return sendErr(res, 'Ошибка в формате email');
		if(!validator.isInt(Number(newAge)))
			return sendErr(res, 'Ошибка в формате age');
		let changes = {
			email: newEmail,
			age: newAge
		};
		let nameObject = {
			name: name
		}
		let result = await userService.change(nameObject, changes, 'User');
		if (result.n)
			res.send('Изменения сохранены');
		else {
			sendErr(res, 'Пользователь с таким именем не найден');
			//console.log(result);
		}
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}
	
};

async function show(req, res) {
	try {
		let users = await userService.show('User');
		//console.log(users)
		res.send(users);
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}
	
};

async function del(req, res) {
	try {
		let name = req.body.name;
		if(!name) 
			return sendErr(res, 'Введите имя пользователя');
		let nameObject = {
			name: name
		}
		let result = await userService.del(nameObject, 'User');
		/*if (result.n)
			res.send('Пользователь удален');
		else {
			sendErr(res, 'Пользователь с таким именем не найден');
			//console.log(result);
		}*/
		console.log(result);
		res.send(result);
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}
	
};

module.exports = {
	create,
	change,
	show,
	del
}