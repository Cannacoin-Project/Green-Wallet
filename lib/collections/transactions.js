Transactions = new Meteor.Collection('transactions');

Transactions.allow({
    insert : function() { return true },
    update : function() { return true },
    remove : function() { return true }
});