var EventEmitter = require('events').EventEmitter;

function EventEmitterDecorator()
{
	throw new Error('EventEmitterDecorator is a Static class and should not be instantiated.');
}

EventEmitterDecorator.decorate = function decorate(p_object)
{
	if (!p_object)
	{
		p_object = this.caller;
	}

	// Test if the passed object is valid
	if (!p_object)
	{
		throw new Error('Object parameter was undefined.');
		return p_object;
	}

	if (p_object._eventEmitter)
	{
		console.warn('Object has already been decorated.');
		return p_object;
	}

	if (p_object instanceof EventEmitter)
	{
		console.warn('Cannot decorate an EventEmitter.');
		return p_object;
	}

	if (p_object.addListener || p_object.on || p_object.once || p_object.removeListener || p_object.removeAllListeners || p_object.setMaxListeners || p_object.listeners || p_object.emit)
	{
		console.warn(p_object + ' already has EventEmitter methods attached.\nWARNING: Overwriting existing methods.');
	}

	p_object._eventEmitter = new EventEmitter();
	
	p_object.addListener = p_object._eventEmitter.addListener;
	p_object.on = p_object._eventEmitter.on;
	p_object.once = p_object._eventEmitter.once;
	p_object.removeListener = p_object._eventEmitter.removeListener;
	p_object.removeAllListeners = p_object._eventEmitter.removeAllListeners;
	p_object.setMaxListeners = p_object._eventEmitter.setMaxListeners;
	p_object.listeners = p_object._eventEmitter.listeners;
	p_object.emit = p_object._eventEmitter.emit;

	return p_object;
}

module.exports = EventEmitterDecorator;