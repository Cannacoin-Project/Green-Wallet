Meteor.users.allow(
    {
        update: function () { return true; },
        insert: function () { return true; },
        remove: function () { return true; }
    }
);