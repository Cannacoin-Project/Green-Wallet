Template.registerHelper('getInfo', function(){
    return Network.findOne();
});

Template.registerHelper('getBalance', function() {
    Meteor.call('getBalance',  function(err, data){
        if(err){
            Session.set('error', err)
        } else {
            Session.set('balance', data);
        }
    });
    return Session.get('balance');
});

