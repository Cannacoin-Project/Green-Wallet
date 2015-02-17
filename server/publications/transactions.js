Meteor.publish("transactions", function () {
    console.log('Publishing Transactions')
    if (this.userId) {
        return Transactions.find({userId: this.userId});
    } else {
        this.ready();
    }
});
