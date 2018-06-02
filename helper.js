const helper = {};

helper.sendErr = function(res, message) {
	return res.send({
		err: message
	});
};

helper.postLimit = 20;
helper.userLimit = 5;

module.exports = helper;