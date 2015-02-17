Meteor.users.allow(
    {
        update: function () { return true; },
        insert: function () { return false; },
        remove: function () { return false; }
    }
);