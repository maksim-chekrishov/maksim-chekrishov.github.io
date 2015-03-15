
var CellView = Backbone.View.extend({
    className: function () {
        var res = ["div-table-col"];
        var attributes = this.model.attributes;

        attributes.currentMonth != attributes.date.getMonth() && res.push("inactive");
        attributes.event && res.push("has-event");

        return res.join(" ");
    },

    initialize: function (options) {
        this.template = _.template($("#cell-template").html());
        this.gridView = options.gridView;
        this.listenTo(this.model, "change", this.render);
    },

    events: {
        "click .edit-event": "editEvent"
    },

    editEvent: function () {
        this.trigger(CalendarGridView.events.editEventClick, this);
    },
    render: function () {
        this.$el.empty()
            .html(this.template(this.model.attributes))
            .removeClass()
            .addClass(this.className());
        return this;
    },
    getAnimationDuration: function (shiftDirection) {
        var dayIndex = this.model.attributes.date.getDay();
        var date = this.model.attributes.date;
        var weekIndex = 0;

        var k = shiftDirection == "left" ? dayIndex : 6 - dayIndex;
        return 200 + Math.pow(k+1,2) * 20;
    },
    hide: function (shiftDirection) {
        var def = $.Deferred();

        this.$el.children().hide("drop",
            { direction: shiftDirection },
            this.getAnimationDuration(shiftDirection),
            function () {
                def.resolve();
            }
        );

        return def.promise();
    }
});

