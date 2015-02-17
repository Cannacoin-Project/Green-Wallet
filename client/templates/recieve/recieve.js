Template.receive.rendered = function(){
    var selectedAddress = Session.get('selectedAddress');
    $('#qrCode').qrcode({"text": selectedAddress, "color": "#646464"});
    $('#' + selectedAddress).addClass('greenAddress');
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
        //assign our address for ease of use;
        var qr = $('#qrCode');
        var address = this.toString();

        //Slick QR fade action, (really tho this is probably some stupid method lol).
        qr.fadeToggle(function(){
            qr.qrcode().empty();
            qr.qrcode({"text": address, "color": "#646464"});
            qr.fadeToggle();
        });

        //Toggle our classes for the address selectors, more UI goodies.
        $('.address-text').removeClass('greenAddress');
        $(e.currentTarget).toggleClass('greenAddress');
        Session.set('selectedAddress', address);
	},
	'click #generate-address': function(e, t){
        Meteor.call('getAccountAddress', function(err, data){
            if(data.error){
                toastr.warning(data.error);
            } else {
                $('#qrCode').qrcode({ "text": data, "color": "#646464" });
            }
        });
	}
});
