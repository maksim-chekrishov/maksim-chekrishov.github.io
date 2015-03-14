var CalendarGridView = Backbone.View.extend({

    className:"calendar-grid",

    initialize: function () {
        var onDateChangeHandler = this.onDateChange.bind(this);
        this.listenTo(this.model, "change:month", onDateChangeHandler);
        this.listenTo(this.model, "change:year", onDateChangeHandler);
        this.listenTo(Backbone, globalEvents.eventsStorageServiceEventChange, this.onEventChange.bind(this));

        this.calcutalateBoundaryDates();
    },

    onEventChange: function (date, eventAttributes) {
        if (+date >= +this.from && +date <= +this.to) {
            var changedViewKey = this.getCellViewLookupKey(date);
            var newEventModel = eventAttributes ? new EventModel(eventAttributes) : null;
            
            this.currentCellViews[changedViewKey].model.set({ event: newEventModel });
        }
    },

    onDateChange: function (e) {

        var shiftDirrection = +new CalendarModel(e.previousAttributes()).toDate() < +this.model.toDate()
                ? "left"
                : "right";

        this.calcutalateBoundaryDates();
        if (this.currentCellViews && Object.keys(this.currentCellViews).length) {
            this.hideCellViews(shiftDirrection).then(this.render.bind(this));
            return;
        }

        this.render();
    },

    rowTemplate: _.template($("#row-template").html()),

    calcutalateBoundaryDates: function () {
        var modelYear = this.model.attributes.year;
        var modelMonth = this.model.attributes.month;
        var daysInMonth = datesHelper.getMonthNumberOfDays(modelYear, modelMonth);

        this.from = new Date(modelYear, modelMonth, 1);
        this.from = datesHelper.addDays(this.from, -this.from.getDay());

        this.to = new Date(modelYear, modelMonth, daysInMonth);
        this.to = datesHelper.addDays(this.to, 6 - this.to.getDay());
    },
    currentCellViews: {},

    hideCellViews: function (shiftDirrection) {
        var that = this;
        var deferreds = [];
        for(var key in this.currentCellViews){
            deferreds.push(this.currentCellViews[key].hide(shiftDirrection));
        }

        return $.when.apply($, deferreds);
    },
    remove: function () {
        this.currentCellViews = {};
        this.$el.empty();
    },

    getCellViewLookupKey: function(date){
        return date.getFullYear() + "." + date.getMonth() + "." + date.getDate();
    },

    render: function () {
        this.remove();

        var currentCellDate = this.from;
        var $tempContainer = $("<div>");
        var $currentRowContainer;
        
        while (+currentCellDate <= +this.to) {
            //eventsStorage is dictionary,  ~O(n). 
            var eventAttributes = eventsStorageService.get(currentCellDate);
            var eventModel = eventAttributes ? new EventModel(eventAttributes) : null;

            var cellModel = new CellModel({
                date: currentCellDate,
                isActive: currentCellDate.getMonth() == this.model.attributes.month,
                event: eventModel
            });

            

            //create new week row
            if (currentCellDate.getDay() == 0) {
                $tempContainer.append(this.rowTemplate());
                $currentRowContainer = $tempContainer.children().last();
            }

            var cellView = new CellView({ model: cellModel, gridView: this });
            $currentRowContainer.append(cellView.render().$el);

            this.currentCellViews[this.getCellViewLookupKey(currentCellDate)] = cellView;

            currentCellDate = datesHelper.addDays(currentCellDate, 1);
        }
        this.$el.empty().append($tempContainer.children());
        return this;
    }
});

CalendarGridView.events = {
    editEventClick: "editEventClick"
};
