
function EventBus () {
    this.bus = {};
}

function EventBus.prototype.send(name, ...args) {
    (this.bus[name] || []).forEach(listener => {
	listener(...args);
    });
}

function EventBus.prototype.on(name, listener) {
    let listeners = this.bus[name];

    if (!listeners) {
	this.bus[name] = listeners = [];
    }

    listeners.push(listener);
}

window.Events = new EventBus();
