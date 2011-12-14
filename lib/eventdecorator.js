var events = require('events');

function EventEmitterDecorator()
{
	throw new Error('EventEmitterDecorator is a Static class and does not need to be instantiated.');
}

EventEmitterDecorator.decorate = function decorate(p_object)
{
	if (!p_object)
	{
		p_object = arguments.caller;
	}

	if (!p_object || p_object.eventEmitter || p_object instanceof events.EventEmitter)
	{
		return p_object;
	}

	p_object.eventEmitter = new events.EventEmitter();
	
	p_object.addListener = function ()
	{
		return p_object.eventEmitter.addListener.apply(p_object.eventEmitter, arguments);
	}

	p_object.on = function on(p_event, p_listener)
	{
		return p_object.eventEmitter.on.apply(p_object.eventEmitter, arguments);
	}

	p_object.once = function once(p_event, p_listener)
	{
		return p_object.eventEmitter.once.apply(p_object.eventEmitter, arguments);
	}

	p_object.removeListener = function removeListener(p_event, p_listener)
	{
		return p_object.eventEmitter.removeListener.apply(p_object.eventEmitter, arguments);
	}

	p_object.removeAllListeners = function removeAllListeners(p_event)
	{
		return p_object.eventEmitter.removeAllListeners.apply(p_object.eventEmitter, arguments);
	}

	p_object.setMaxListeners = function setMaxListeners(p_value)
	{
		return p_object.eventEmitter.setMaxListeners.apply(p_object.eventEmitter, arguments);
	}

	p_object.listeners = function listeners(p_event)
	{
		return p_object.eventEmitter.listeners.apply(p_object.eventEmitter, arguments);
	}

	p_object.emit = function emit(p_event, p_args)
	{
		return p_object.eventEmitter.emit.apply(p_object.eventEmitter, arguments);
	}

	return p_object;
}

module.exports = EventEmitterDecorator;