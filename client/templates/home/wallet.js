
Template.wallet.helpers({
    "transactions": function(){
        Meteor.call('listTransactions', function(err, data){
            if(err){
                Session.set('error', err)
            } else {
                Session.set('transactions', data);
            }
        });
        return Session.get('transactions');
    },
    "sent": function(){
        var sent = [];
        var txs = Session.get('transactions');
        for(i = 0; i < txs.length; i++){
            if(txs[i].amount < 0){
                sent.push(txs[i]);
            }
        }
        return sent.length;
    },
    "received": function(){
        var received = [];
        var txs = Session.get('transactions');
        for(i = 0; i < txs.length; i++){
            if(txs[i].amount > 0){
                received.push(txs[i]);
            }
        }
        return received.length;
    }
});
