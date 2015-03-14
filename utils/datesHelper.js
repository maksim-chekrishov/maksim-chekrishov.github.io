var datesHelper = (function () {

    return {
        getDayNameByIndex: function (i) {
            return appConfig.daysNames[i];
        },

        getMonthNameByIndex: function (i) {
            return appConfig.monthsNames[i];
        },

        getMonthNumberOfDays: function (year, month) {
            return new Date(year, month + 1, 0).getDate();
        },

        addDays: function (date, days) {
            var result = new Date(date);
            result.setDate(date.getDate() + days);
            return result;
        },
        
        addMonths: function (date, months) {
            var result = new Date(date);
            result.setMonth(date.getMonth() + months);
            return result;
        }
    }
})();
