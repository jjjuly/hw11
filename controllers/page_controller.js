const userService = require('../services/user_service');
const validator = require('froncubator-validator-js');
let errorValidation = null;
let timeOut = null;

async function usersPage(req, res) {
	try {
		let users = await userService.show({}, 'User');
		let header = 'Users';
		clearTimeout(timeOut);
		timeOut = setTimeout(() => {
			errorValidation = null;
		}, 1000);
		res.render('users', {
			users,
			header,
			errorValidation
		});
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}	
};

async function postsPage(req, res) {
	try {
		let posts = await userService.show({}, 'Post');
		let header = 'Posts';
		res.render('posts', {
			posts,
			header
		});
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}	
};

function indexPage(req, res) {
	try {
		let header = 'Home';
		res.render('index', {
			header
		});
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}	
};

async function createPost(req, res) {
	try {
		console.log(req.body.title);
		postObject = {
			title: req.body.title,
			text: req.body.text
		};
		console.log(postObject);
		let post = await userService.create1(postObject, 'Post');
		console.log(post);
		res.redirect('/posts');
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}	
};

async function deletePost(req, res) {
	try {
		let id = req.body.id;
		let post = await userService.delById(id, 'Post');
		console.log(post); 
		res.redirect('/posts');
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}	
};

async function updatePost(req, res) {
	try {
		let id = req.body.id;
		let post = await userService.find({_id: id}, 'Post');
		console.log(post);
		res.render('update_post', {
			post
		});
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}	
};

async function updatedPost(req, res) {
	try {
		let id = req.body.id;
		let changes = {
			title: req.body.title,
			text: req.body.text
		};
		let post = await userService.changeById(id, changes, 'Post');
		console.log(post);
		res.redirect('posts');
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}	
};

async function createUser(req, res) {
	try {
		if(!validator.isEmail(req.body.email)) {
			errorValidation = 'Ошибка в формате email';
			return res.redirect('/users');
		}
		emailObject = {
			email: req.body.email
		};
		let exist = await userService.find(emailObject, 'User');
		if(exist) {
			errorValidation = 'Пользователь с таким именем уже существует';
			return res.redirect('/users');
		}
		userObject = {
			name: req.body.name,
			email: req.body.email,
			age: req.body.age
		};
		let user = await userService.create1(userObject, 'User');
		console.log(user);
		res.redirect('/users');
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}	
};

async function deleteUser(req, res) {
	try {
		let id = req.body.id;
		let user = await userService.delById(id, 'User');
		console.log(user);
		res.redirect('/users');
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}	
};

async function updateUser(req, res) {
	try {
		let id = req.body.id;
		let user = await userService.find({_id: id}, 'User');
		console.log(user);
		res.render('update_user', {
			user
		});
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}	
};

async function updatedUser(req, res) {
	try {
		let id = req.body.id;
		let changes = {
			name: req.body.name,
			age: req.body.age
		};
		let user = await userService.changeById(id, changes, 'User');
		console.log(user);
		res.redirect('users');
	} catch(err) {
		console.log(err);
		res.send('Ошибка сервера');
	}	
};

module.exports = {
	usersPage,
	postsPage,
	indexPage,
	createPost,
	deletePost,
	updatePost,
	updatedPost,
	createUser,
	deleteUser,
	updateUser,
	updatedUser
}