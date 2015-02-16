Template.registerHelper('getInfo', function(){
    Meteor.call('getInfo',  function(err, data){
        if(err){
            Session.set('error', err)
        } else {
            Session.set('status', data);
        }
    });
    return Session.get('status');
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
