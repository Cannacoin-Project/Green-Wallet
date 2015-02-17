Meteor.publish("accounts", function () {
    console.log('Publishing Accounts');
    if (this.userId) {
        return Accounts.find({userId: this.userId});
    } else {
        this.ready();
    }
});
