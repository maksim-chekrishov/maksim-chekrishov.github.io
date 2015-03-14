var CalendarHeaderView = (function () {

    return Backbone.View.extend({
        initialize: function () {
            this.template = _.template($("#calendar-header-template").html());
            this.listenTo(this.model, "change", this.update);
        },
        events: {
            "click #btn-prev": "goPreviousMonth",
            "click #btn-next": "goNextMonth",
            "change #sel-month": "changeMonth",
            "change #sel-year": "changeYear"
        },

        updateUrl: function () {
            app.navigate("year/" + this.model.attributes.year + "/month/" + this.model.attributes.month);
        },
        update: function(){
            this.updateSelected();
            this.updateUrl();
        },
        updateSelected: function () {
            $("#sel-month").val(this.model.attributes.month);
            $("#sel-year").val(this.model.attributes.year);
        },
        addMonthToModel: function (month) {
            var newDate = datesHelper.addMonths(this.model.toDate(), month);
            this.model.set({
                year: newDate.getFullYear(),
                month: newDate.getMonth()
            });
        },
        isMinDate: function () {
            return this.model.attributes.year == appConfig.minYear &&
                this.model.attributes.month == 0;
        },
        isMaxDate: function () {
            return this.model.attributes.year == appConfig.maxYear &&
                this.model.attributes.month == 11;
        },
        goPreviousMonth: function () {
            this.addMonthToModel(-1);
        },
        goNextMonth: function () {
            this.addMonthToModel(1);
        },
        changeMonth: function (e) {
            this.model.set({ month: $(e.target).val()});
        },
        changeYear: function (e) {
            this.model.set({ year: $(e.target).val() });
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            
            return this;
        }
    });
})();

