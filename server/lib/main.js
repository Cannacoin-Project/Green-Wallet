Meteor.startup(function(){

    /**
     * Name: getInfo Daemon
     * Description:
     *  - setInterval loop to update our network info collection.
     * Notes:
     *  - Configure refreshTimer in Meteor settings.json (How fast do we update our network info?)
     *  - This process could be outsourced via two options:
     *      1) 3rd party APIs or
     *      2) A secondary node/meteor process possibly, potentially at a higher frequency (if necessary) and lighter weight.
     */
    Meteor.setInterval(function(){

        //Call getInfo and assign it's results to info
        var info = Meteor.call('getInfo');

        //Append a new key "name" and assign it's value to the
        // Meteor settings.json value for our coin's fullName.
        info.name = (Meteor.settings.wallet.fullName).toLowerCase();

        // We only made the variable name "timestamp" sans camelCase
        // because the rest of the network "info" is also sans camel.
        info.timestamp = timeStamp();
        Network.update({'name': info.name}, info, {upsert: true}, function(err) {
            if(err)
                console.log('Server Main.js -> getInfo error: ', err);
        });
    }, Meteor.settings.wallet.refreshTimer * 1000);

});
