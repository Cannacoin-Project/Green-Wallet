Tracker.autorun(function(){
    //console.log('wallet.js tracker run');
    //var txs = Session.get('transactions');
    //var sent = [];
    //var received = [];
    //
    //for(i = 0; i < txs.length; i++){
    //    if(txs[i].amount < 0){
    //        sent.push(txs[i]);
    //    }
    //    if(txs[i].amount > 0){
    //        received.push(txs[i]);
    //    }
    //}
    //
    //Session.set('sent', sent.length);
    //Session.set('received', received.length);
});

Template.wallet.helpers({
    "transactions": Transactions.find(),
    "sentCount": function(){
        return Transactions.find({'type': 'Sent'}).count();
    },
    "receivedCount": function(){
        return Transactions.find({'type': 'Receieved'}).count();
    },
});
