const validator = require('froncubator-validator-js');
const mongoose = require('mongoose');
const {sendErr} = require('../helper');
const userService = require('../services/user_service.js');

const models = require('../models.js');

async function create(req, res) {
	try {
		//let {title} = req.body;
		let title = req.body.title || '';
		let text = req.body.email || '';

		if(!validator.isStr(title, 1, 32))
			return sendErr(res, 'Ошибка в формате title. Поле не должно быть меньше 1 и больше 32 символов');
		if(!validator.isStr(title))
			return sendErr(res, 'Ошибка в формате text.');
		
		let post = await userService.create1({
			title,
			text
			//_id: new mongoose.Types.ObjectId
		}, 'Post');
		res.send(post);
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}	
};

async function change(req, res) {
	try {
		let id = req.body.id;
		if(!validator.isStr(id, 24, 24))
				return sendErr(res, 'Ошибка в формате id. Поле не должно быть не меньше 24 символов');
		let changes = {};
		if(req.body.newTitle) {
			let newTitle = req.body.newTitle;
			if(!validator.isStr(newTitle, 1, 32))
				return sendErr(res, 'Ошибка в формате title. Поле не должно быть меньше 1 и больше 32 символов');
			changes.title = newTitle;
		}
		if(req.body.newText) {
			let newText = req.body.newText;
			if(!validator.isStr(newText))
				return sendErr(res, 'Ошибка в формате text.');
			changes.text = newText;
		}
		let result = await userService.changeById(id, changes, 'Post');
		//console.log(result);
		if (result)
			res.send('Изменения сохранены');
		else {
			sendErr(res, 'Пост с таким id не найден');
			console.log(result);
		}
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}	
};

async function show(req, res) {
	try {
		let query = req.query;
		let posts = await userService.show(query, 'Post');
		res.send(posts);
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}	
};

async function del(req, res) {
	try {
		let id = req.body.id;
		if(!validator.isStr(id, 24, 24))
			return sendErr(res, 'Ошибка в формате id. Поле не должно быть не меньше 24 символов');
		let result = await userService.delById(id, 'Post');
		if (result)
			res.send('Пост удален');
		else {
			sendErr(res, 'Пост с таким id не найден');
		}
		res.send(result);
		console.log(result);
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