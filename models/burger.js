// Import the ORM
const orm = require("../config/orm.js");

// Database interaction functions
var burger = {
	selectAll: function (cb) {
		orm.selectAll("burgers", function (res) {
			cb(res);
		});
	},
	insertOne: function (cols, vals, cb) {
		orm.insertOne("burgers", cols, vals, function (res) {
			cb(res);
		});
	},
	updateOne: function (objColVals, condition, cb) {
		orm.updateOne("burgers", objColVals, condition, function (res) {
			cb(res);
		});
	},
};

// Export the database functions for the controller
module.exports = burger;
