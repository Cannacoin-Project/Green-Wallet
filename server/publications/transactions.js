Meteor.publish("transactions", function () {
    console.log('Publishing Transactions')
    console.log(this.userId)
    if (this.userId) {
        return Transactions.find({userId: this.userId});
    } else {
        this.ready();
    }
});
