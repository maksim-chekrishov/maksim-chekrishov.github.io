var EventModel = Backbone.Model.extend({
    defaults: {
        date: null,
        title: null,
        note: null
    },
    save: function () {
        eventsStorageService.save(this.attributes);
    },
    destroy: function () {
        eventsStorageService.delete(this.attributes.date);
    }
});