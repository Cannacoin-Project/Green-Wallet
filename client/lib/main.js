Meteor.startup(function(){
    Meteor.subscribe("userData");
    Meteor.call('getAddressesByAccount', function(err, data){
        Session.set('addresses', data);
        console.log(Session.get('addresses'));
        Session.set('selectedAddress', Session.get('addresses')[0]);
    });
});

