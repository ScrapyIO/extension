define(['libs/eventemitter2'], function(EventEmitter){

	var instance = new EventEmitter({
      wildcard: true, // should the event emitter use wildcards.
      delimiter: '.', // the delimiter used to segment namespaces, defaults to `.`.
    });

    return instance;
})