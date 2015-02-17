Meteor.startup(function(){
    Meteor.call('getAddressesByAccount', function(err, data){
        Session.set('addresses', data);
        Session.set('selectedAddress', Session.get('addresses')[0]);
    });
});

