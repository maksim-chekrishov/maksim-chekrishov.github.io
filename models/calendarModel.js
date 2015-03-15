var CalendarModel = Backbone.Model.extend({
    defaults: function () {
        var currentDate = new Date();
        return {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth()
        }
    },
    toDate: function () {
        return new Date(this.attributes.year, this.attributes.month);
    },
    initialize: function () {
        this.normalize();       
    },
    normalize: function () {
        var date = this.toDate();
        this.set({
            year: date.getFullYear(),
            month: date.getMonth()
        });
        if (!CalendarModel.isValidCalendarDate(date)) {
            this.set(this.defaults());
        }
    },
    isValid: function () {
        return CalendarModel.isValidCalendarDate(this.toDate())
    }
});

CalendarModel.isValidCalendarDate = function (date) {
    if (!_.isDate(date) || _.isNaN(date.getTime())) {
        return false;
    }

    var year = date.getFullYear();

    return date instanceof Date &&
        year >= appConfig.minYear &&
        year <= appConfig.maxYear;
}