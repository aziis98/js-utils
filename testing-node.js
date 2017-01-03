
function EventBus () {
    this.bus = {};
}

EventBus.prototype.send = function (name, ...args) {
    (this.bus[name] || []).forEach(listener => {
	setImmediate(function () {
	    listener(...args);  
	});
    });
}

EventBus.prototype.on = function (name, listener) {
    let listeners = this.bus[name];

    if (!listeners) {
	this.bus[name] = listeners = [];
    }

    listeners.push(listener);
}

// ------------------------------ //

const bus1 = new EventBus();

bus1.on('event1', function (a, b) {
    expensiveFunction()
    console.log("Event1: a = %s; b = %s", a, b);
});

expensiveFunction()

for(var i = 0; i < 10; i++) {
    console.log('started i = ' + i);
    bus1.send('event1', i, 15)   
}

function expensiveFunction() {
    // console.log('start');
    let i = 0
    while (i < 1.5e9) {
	i++
    }
    // console.log('end');
}
