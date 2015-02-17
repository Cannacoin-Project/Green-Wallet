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
                if(err){
                    //TODO: Lets log these in some fashion via DB. An alert any time a user tries too many times?
                    done(err, null);
                }
                done(null, data);
            });
        });
        return getInfo.result
    },
    "getBalance": function() {
        var getBalance = Async.runSync(function(done) {
            wallet.getBalance(Meteor.userId(), function(err, data) {
                if(err){
                    //TODO: Lets log these in some fashion via DB. An alert any time a user tries too many times?
                    done(err, null);
                }
                done(null, data);
            });
        });
        if(getBalance.result){
            return getBalance.result
        }
        else {
            return Meteor.settings.errors.noBalance;
        }
    },
    "getAddressesByAccount": function() {
        var getAddressesByAccount = Async.runSync(function(done) {
            wallet.getAddressesByAccount(Meteor.userId(), function(err, data) {
                if(err){
                    ////TODO: Lets log these in some fashion via DB. An alert any time a user tries too many times to generate address?
                    done(err, null);
                }
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
        //TODO: Pull walletCount from Accounts collection in database
        var walletCount = 3;
        var userId = Meteor.userId();
        var label = 'test';
        if(walletCount < Meteor.settings.wallet.maxAccounts){
            var getAccountAddress = Async.runSync(function(done) {
                wallet.getAccountAddress(Meteor.userId(), function(err, data) {
                    if(err){
                        done(err, null);
                    }
                    else{
                        //Create new account address object
                        data = {
                            label: label,
                            addressObject: {
                                'address': data,
                                'created': timeStamp()
                            }
                        };
                        done(null, data);
                    }
                });
            });
            //TODO: Push a new address to our account using the label given from the input.
            //Accounts.update({label: getAccountAddress.result.label}, { $push: {'labels.label': getAccountAddress.result.addressObject} }, {upsert: true} );

            return getAccountAddress.result.addressObject;

        } else {
            //TODO: Lets log these in some fashion via DB. An alert any time a user tries too many times to create an address? Spam watch?
            return {error: Meteor.settings.errors.maxAccounts};
        }
    },
    "listTransactions": function() {
        var listTransactions = Async.runSync(function(done) {
            wallet.listTransactions(Meteor.userId(), function(err, data) {
                if(err){
                    done(err, null);
                }
                else
                    done(null, data);
            });
        });
        if(listTransactions.result){
            return listTransactions
        } else {
            //TODO: Lets log these in some fashion via DB. An alert any time a user tries to many times after this insuff funds?
            console.log('Meteor Method: listTransactions Error: ', listTransactions.error);
        }

    },
    "send": function(address, amount){
        var balance = Meteor.call('getBalance');
        var minFee = parseFloat(Meteor.settings.wallet.minFee);
        var userId = Meteor.userId();
        if(amount <= balance - minFee){
            var sendFrom = Async.runSync( function(done) {
                amount = parseFloat(amount);
                wallet.sendFrom(userId, address, amount, function(err, data) {
                    if(err){

                        done(err, null);
                    }
                    //Create new transaction object
                    txObject = {
                        'userId': userId,
                        'timestamp': timeStamp(),
                        "type": "Sent",
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
            //TODO: Lets log these in some fashion via DB. An alert any time a user tries to many times after this insuff funds? Guard dog?
            return {error: Meteor.settings.errors.insufficientFunds};
        }
    }
});

