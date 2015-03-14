var eventsStorageService = new EventsStorageService();

function EventsStorageService() {

    if (EventsStorageService.instance) {
        return EventsStorageService.instance;
    }

    this.storage = {};
    EventsStorageService.instance = this;
}

EventsStorageService.prototype.save = function (eventAttributes) {
    eventAttributes.key = eventAttributes.key || this._getLookupKey(eventAttributes.date);
    this.storage[eventAttributes.key] = eventAttributes;

    Backbone.trigger(globalEvents.eventsStorageServiceEventChange, eventAttributes.date, eventAttributes);
};


EventsStorageService.prototype.get = function (date) {
    var eventAttributes = this.storage[this._getLookupKey(date)];
    if (!eventAttributes) {
        return null;
    }
    return _.extend({}, eventAttributes);
};

EventsStorageService.prototype.delete = function (date) {
    var key = this._getLookupKey(date);
    var wasRemoved = !!this.storage[key];
    delete this.storage[key];

    wasRemoved && Backbone.trigger(globalEvents.eventsStorageServiceEventChange, date, null);
    
};


EventsStorageService.prototype._getLookupKey = function (date) {
    return date.getFullYear() + "." + date.getMonth() + "." + date.getDate();
};