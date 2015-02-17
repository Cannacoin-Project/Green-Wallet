Meteor.startup(function(){

    Meteor.subscribe("userData");

    Meteor.call('getAddressesByAccount', function(err, data){
        Session.set('addresses', data);
        Session.set('selectedAddress', Session.get('addresses')[0]);
    });
});

