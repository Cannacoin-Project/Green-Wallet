// Get settings from our Meteor projects settings.json, we place this outside of public to hide from the client.
// (This allows us to still use the settings to store client side settings and configuration).
var walletSettings = Meteor.settings.wallet;
var wallet = Meteor.npmRequire('bitcoin');

//Instantiate new RPC instance
wallet = new Bitcoin.Client({
    host: walletSettings.host,
    port: walletSettings.port,
    user: walletSettings.user,
    pass: walletSettings.pass,
    timeout: walletSettings.timeout
});

//Define your server side methods here
Meteor.methods({
    "getInfo": function() {
        var getInfo = Async.runSync(function(done) {
            wallet.getInfo(function(err, data) {
                done(null, data);
            });
        });
        return getInfo.result
    },
    "getBalance": function() {
        var getBalance = Async.runSync(function(done) {
            wallet.getBalance(Meteor.userId(), function(err, data) {
                done(null, data);
            });
        });
        if(getBalance.result){
            return getBalance.result
        } else {
            return Meteor.settings.errors.noBalance;
        }
    },
    "getAddressesByAccount": function() {
        var getAddressesByAccount = Async.runSync(function(done) {
            wallet.getAddressesByAccount(Meteor.userId(), function(err, data) {
                done(null, data);
            });
        });
        if(getAddressesByAccount.result){
            return getAddressesByAccount.result
        } else {
            return Meteor.settings.errors.noAddress;
        }
    },
    "getAccountAddress": function(){
        //TODO: Pull walletCount from databse
        var walletCount = 2;
        if(walletCount <= Meteor.settings.wallet.maxAccounts){
            var getAccountAddress = Async.runSync(function(done) {
                wallet.getAccountAddress(Meteor.userId(), function(err, data) {
                    if(err)
                        return done(err, null);
                    else
                        done(null, data);
                });
            });
            return getAccountAddress.result
        } else {
            return {error: Meteor.settings.errors.maxAccounts};
        }
    },
    "listTransactions": function() {
        var listTransactions = Async.runSync(function(done) {
            wallet.listTransactions(Meteor.userId(), function(err, data) {
                if(err)
                    return done(err, null);
                else
                    done(null, data);
            });
        });
        return listTransactions
    },
    "send": function(address, amount){
        var balance = Meteor.call('getBalance');
        var minFee = parseFloat(Meteor.settings.wallet.minFee);
        var userId = Meteor.userId();
        if(amount <= balance - minFee){
            var sendFrom = Async.runSync( function(done) {
                amount = parseFloat(amount);
                wallet.sendFrom(userId, address, amount, function(err, data) {
                    if(err)
                        return done(err, null);

                    //Create new transaction object
                    txObject = {
                        'userId': userId,
                        'timestamp': timeStamp(),
                        'address': address,
                        'amount': amount.toFixed(8),
                        'txId': data
                    };

                    //Callback with done();
                    done(null, txObject);
                });
            });

            //Add new document to our Transaction collection.
            Transactions.insert(sendFrom.result);

            return sendFrom;
        } else {
            return {error: Meteor.settings.errors.insufficientFunds};
        }
    }
});

