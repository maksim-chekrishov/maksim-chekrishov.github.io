var CalendarModel = Backbone.Model.extend({
    defaults: function() {
        var currentDate = new Date();
        return {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth(),
            selectedDate: null,
        }
    },
    isValid: function () {
        var selectedDate = this.attributes.selectedDate;

        var isSelectedDayValid = !selectedDate ||
            CalendarModel.isValidCalendarDate(selectedDate) &&
            selectedDate.getFullYear() == this.attributes.year &&
            selectedDate.getMonth() == this.attributes.month;

        return isSelectedDayValid && CalendarModel.isValidCalendarDate(this.toDate());
    },
    toDate: function () {
        return new Date(this.attributes.year, this.attributes.month);
    },
    initialize: function() {
        if (!this.isValid()) {
            this.set(this.defaults());
        }
    }
});

CalendarModel.isValidCalendarDate = function (date) {
    if (!(date instanceof Date)) {
        return false;
    }
    var year = date.getFullYear();

    return date instanceof Date &&
        year >= appConfig.minYear &&
        year <= appConfig.maxYear;
}