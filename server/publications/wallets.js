Meteor.publish("wallets", function () {
    console.log('Publishing Wallets')
    if (this.userId) {
        return Wallets.find({userId: this.userId});
    } else {
        this.ready();
    }
});
