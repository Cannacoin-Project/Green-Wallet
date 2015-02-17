Meteor.publish("network", function () {
    var name = Meteor.settings.wallet.fullName.toLowerCase();
    console.log('Publishing Network Info');
    if (this.userId) {
        return Network.find({'name': name});
    } else {
        this.ready();
    }
});
