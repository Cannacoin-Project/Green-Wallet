Template.settings.rendered = function(){
    $('.ui.accordion').accordion();
    $('.ui.checkbox').checkbox();
};

Template.settings.events({
    'click #logout-button': function () {
        console.log("user clicked logout");
        Meteor.logout();
        Router.go('/signin')
    }
});
