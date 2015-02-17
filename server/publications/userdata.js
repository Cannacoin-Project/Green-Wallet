Meteor.publish("userData", function () {
    if (this.userId) {
        console.log('Publishing userData');
        return Meteor.users.find({_id: this.userId});
    } else {
        this.ready();
    }
});
