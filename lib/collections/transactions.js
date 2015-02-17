Transactions = new Meteor.Collection('transactions');

Transactions.allow({
    insert : function() { return true },
    update : function() { return false },
    remove : function() { return false }
});