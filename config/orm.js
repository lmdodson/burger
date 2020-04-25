// Import mysql connection
const connection = require("./connection.js");

// Helper function for sql syntax
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}
	return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
	var arr = [];

	// loop through the keys and push the key/value as a string int arr
	for (var key in ob) {
		var value = ob[key];
		// check to skip hidden properties
		if (Object.hasOwnProperty.call(ob, key)) {
			// if string with spaces, add quotations
			if (typeof value === "string" && value.indexOf(" ") >= 0) {
				value = "'" + value + "'";
			}
			arr.push(key + "=" + value);
		}
	}

	// translate array of strings to a single comma-separated string
	return arr.toString();
}

// Object for all SQL statement functions
var orm = {
	selectAll: function (tableInput, cb) {
		// define query string
		var queryString = "SELECT * FROM " + tableInput + ";";
		// handle errors
		connection.query(queryString, function (err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	insertOne: function (table, cols, vals, cb) {
		// define query string
		var queryString = "INSERT INTO " + table;

		// define query string values
		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		console.log(queryString);

		// handle errors
		connection.query(queryString, vals, function (err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},
	updateOne: function (table, objColVals, condition, cb) {
		// define query string
		var queryString = "UPDATE " + table;

		// define query string values
		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		console.log(queryString);

		// handle errors
		connection.query(queryString, function (err, result) {
			if (err) {
				throw err;
			}

			cb(result);
		});
	},
};

// Export the orm object for the model
module.exports = orm;