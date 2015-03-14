var EventModalView = Backbone.View.extend({

    className: 'modal fade',

    events: {
        'click #btn-delete': 'delete_',
        'click #btn-save': 'save',
        'keyup #txt-title': 'updateSaveButtonState',
        'click .close': "destroyDialog"
    },
 
    updateSaveButtonState: function (e) {
        this.$saveButton.prop("disabled", !this.$title.val().length);
    },

    save: function() {
        var title = this.$el.find("#txt-title").val();
        var note = this.$el.find("#txt-note").val();

        this.model.set({
            title: title,
            note: note
        }).save();
        this.destroyDialog();
    },

    delete_: function() {
        this.model.destroy();
        this.destroyDialog();
    },

    initialize: function () {
        this.template = _.template($("#event-modal-template").html());
        this.render();
    },

    show: function () {
        this.$el.modal({ show: true });
    },

    destroyDialog: function () {
        this.$el.data('modal', null);
        this.remove();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));

        this.$saveButton = this.$el.find("#btn-save");
        this.$title = this.$el.find("#txt-title");
        this.$note = this.$el.find("#txt-note");

        this.updateSaveButtonState();

        return this;
    }
});