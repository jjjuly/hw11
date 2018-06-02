const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const crypto = require('crypto');
const nunjucks = require('nunjucks');

const app = express();

app.set('view engine', 'njk');
app.use('/static',express.static('public'));
app.use("/static/styles",  express.static('public/css'));
app.use("/static/scripts", express.static('public/js/'));
app.use("/static/images",  express.static('public/images'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const {connectToDB} = require('./db.js');
connectToDB();
const userController = require('./controllers/user_controller');
const postController = require('./controllers/post_controller');
const pageController = require('./controllers/page_controller');

nunjucks.configure('./views', {
	autoescape: true,
	express: app,
	noCache: true,
	tags: {
		variableStart: '<#',
		variableEnd: '#>'
	}
});

app.get('/',  pageController.indexPage);
app.get('/users',  pageController.usersPage);
app.get('/posts',  pageController.postsPage);
app.post('/posted',  pageController.createPost);
app.post('/delete_post',  pageController.deletePost);
app.post('/update_post',  pageController.updatePost);
app.post('/updated_post',  pageController.updatedPost);
app.post('/create_user',  pageController.createUser);
app.post('/delete_user',  pageController.deleteUser);
app.post('/update_user',  pageController.updateUser);
app.post('/updated_user',  pageController.updatedUser);

app.post('/api/v1/user', userController.create);
app.put('/api/v1/user', userController.change);
app.get('/api/v1/user', userController.show);
app.delete('/api/v1/user', userController.del);

app.post('/api/v1/post', postController.create);
app.put('/api/v1/post', postController.change);
app.get('/api/v1/post', postController.show);
app.delete('/api/v1/post', postController.del);

app.listen('3333');