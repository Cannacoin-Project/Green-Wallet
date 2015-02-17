Accounts = new Meteor.Collection('accounts');

Accounts.allow({
    insert : function() { return true },
    update : function() { return false },
    remove : function() { return false }
});