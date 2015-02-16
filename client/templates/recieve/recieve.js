Template.receive.rendered = function(){
    var selected = Session.get('selectedAddress');
    $('#qrCode').qrcode({"text": selected, "color": "#646464"});
    $('#' + selected).addClass('greenAddress');
};

Template.receive.helpers({
	'addresses': function() {
        Meteor.call('getAddressesByAccount', function(err, data){
            if(err){
                Session.set('error', err)
            } else {
                Session.set('addresses', data);
            }
        });
        return Session.get('addresses');
    }
});

Template.receive.events({
	'click .address-text': function(e, t){
		$('#qrCode').qrcode().empty();
		$('#qrCode').qrcode({"text": this, "color": "#646464"});
        $('.address-text').removeClass('greenAddress');
        $(e.currentTarget).toggleClass('greenAddress');
        Session.set('selectedAddress', this.toString());
	},
	'click #generate-address': function(e, t){
        Meteor.call('getAccountAddress', function(err, data){
            if(data.error){
                toastr.warning(data.error);
            } else {
                $('#qrCode').qrcode({
                    "text": data,
                    "color": "#646464"
                });
            }
        });
	}
});
