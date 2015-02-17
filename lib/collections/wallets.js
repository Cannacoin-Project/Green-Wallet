Wallets = new Meteor.Collection('wallets');

Wallets.allow({
    insert : function() { return false },
    update : function() { return false },
    remove : function() { return false }
});