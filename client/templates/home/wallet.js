Tracker.autorun(function(){
    if(Session.get('transactions')) {
        var txs = Session.get('transactions');
        var sent = [];
        var received = [];

        for(i = 0; i < txs.length; i++){
            if(txs[i].amount < 0){
                sent.push(txs[i]);
            }
            if(txs[i].amount > 0){
                received.push(txs[i]);
            }
        }

        Session.set('sent', sent.length);
        Session.set('received', received.length);
    }
});

Template.wallet.helpers({
    "transactions": function(){
        Meteor.call('listTransactions', function(err, data){
            if(err){
                Session.set('error', err)
            } else {
                Session.set('transactions', data.result);
            }
        });
        return Session.get('transactions');
    },
    "sent": Session.get('sent'),
    "received": Session.get('received')
});
