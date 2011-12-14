/**
 * Dependencies
 */

var eventDecorator = require('../'),
	EventEmitter = require('events').EventEmitter,
	assert = require('assert');

module.exports = {
	'test decorating an EventEmitter': function ()
	{
		var foo = new EventEmitter();
		eventDecorator.decorate(foo);

		assert.ok(!foo._eventEmitter, 'An EventEmitter should not be able to be decorated.');
	},
	'test decorating a subclass of EventEmitter': function ()
	{
		var Foo = function() {};
		Foo.prototype = new EventEmitter();
		var bar = new Foo();
		eventDecorator.decorate(bar);

		assert.ok(!bar._eventEmitter, 'A subclass of EventEmitter should not be able to be decorated.');
	},
	'test adding an EventEmitter to an object': function ()
	{
		var foo = {};
		eventDecorator.decorate(foo);
		
		assert.ok(foo._eventEmitter instanceof EventEmitter, 'An EventEmitter should be added to the object.');
	}
};