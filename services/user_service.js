const models = require('../models');
const {postLimit} = require('../helper')

async function create1(userObject, model) {
	const item = new models[model](userObject);
	await item.save();
	return item;	
};

async function show(query = {}, model) {
	let page = 0;
	if(query.page) {
		if(query.page < 0)
			query.page = 0;
		page = query.page;
		delete query.page;
	}
	if(query.title)
		query.title = new RegExp(query.title, 'gi');
	if(query.text)
		query.text = new RegExp(query.text, 'gi');
	console.log(query);
	let items = await models[model]
		.find(query)
		.limit(postLimit)
		.skip(page * 2);
    return(items);
};

async function find(value, model) {
	let item = await models[model].findOne(value);
    return item;
};

async function change(value, changes, model) {
	let result = await models[model].update(value, changes);
    return result;
};

async function changeById(id, changes, model) {
	let item = await models[model].findByIdAndUpdate(id, changes);
    return item;
};

async function del(value, model) {
	let result = await models[model].deleteOne(value);
    //console.log(result);
    return result;
};

async function delById(id, model) {
	let item = await models[model].findByIdAndRemove(id);
    //console.log(item);
    return item;
};

module.exports = {
	create1,
	show,
	find,
	change,
	changeById,
	del,
	delById
}