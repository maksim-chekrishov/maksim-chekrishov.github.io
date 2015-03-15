var AppRouter = Backbone.Router.extend({
    calendarViews: null,
    routes: {
        "": "showCalendar",
        "year/:y/month/:m": "showCalendar",
        '*notFound': 'showCalendar'
    },

    showEventModal: function (cellView) {
        var eventForEdit = cellView.model.attributes.event || new EventModel({ date: cellView.model.attributes.date });

        if (this.eventView) {
            this.eventView.model.set(eventForEdit.attributes);
            return;
        }
        var eventModalView = new EventModalView({ model: eventForEdit });

        $("#event-modal").html(eventModalView.render().el);
        eventModalView.show();
    },

    updateUrl: function (model/*opt*/) {
        model = model || this.currentModel;
        this.navigate("year/" + model.attributes.year + "/month/" + model.attributes.month);
    },
    showCalendar: function (year, month) {
        var model = new CalendarModel({
            year: parseInt(year),
            month: parseInt(month)
        });

        this.updateUrl(model);

        if (this.currentModel) {
            this.currentModel.set(model.attributes);
            return;
        }

        var viewParams = { model: model };

        var calendarHeaderView = new CalendarHeaderView(viewParams);
        var calendarGridView = new CalendarGridView(viewParams);

        this.currentModel = model;

        this.listenTo(calendarGridView, CalendarGridView.events.editEventClick, this.showEventModal.bind(this));
        this.listenTo(this.currentModel, "change", this.updateUrl.bind(this));

        $("#calendar-header").html(calendarHeaderView.render().el);
        $("#calendar-grid").html(calendarGridView.render().el);
    }

});

var app = new AppRouter();
Backbone.history.start();