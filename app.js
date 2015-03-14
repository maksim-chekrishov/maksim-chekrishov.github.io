var AppRouter = Backbone.Router.extend({
    calendarViews: null,
    routes: {
        "": "showCalendar",
        "year/:y/month/:m": "showCalendar",
        '*notFound': 'showCalendar'
    },

    onEventEdit: function(cellModel){
        var eventForEdit = cellModel.attributes.event || new EventModel({ date: cellModel.attributes.date });

        if(this.eventView){
            this.eventView.model.set(eventForEdit.attributes);
            return;
        }
       var eventModalView = new EventModalView({ model: eventForEdit });

       $("#event-modal").html(eventModalView.render().el);
        eventModalView.show();
    },

    showCalendar: function (year, month) {
        var model = new CalendarModel({
            year: parseInt(year),
            month: parseInt(month)
        });
        
        if (this.currentModel) {
            this.currentModel.set(model.attributes);
            return;
        }



        var viewParams = { model: model };

        var calendarHeaderView = new CalendarHeaderView(viewParams);
        var calendarGridView = new CalendarGridView(viewParams);

        this.currentModel = model;

        this.listenTo(calendarGridView,CalendarGridView.events.editEventClick, this.onEventEdit.bind(this));

        $("#calendar-header").html(calendarHeaderView.render().el);
        $("#calendar-grid").html(calendarGridView.render().el);
    }

});

var app = new AppRouter();
Backbone.history.start();