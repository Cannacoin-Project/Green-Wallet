Template.send.events({
	'click #scan': function (){
		MeteorCamera.getPicture({width: 100, height: 100}, function(error, data){
			if(error){
				console.log(error)
			}
	  		$('#sendAddress').val('');
		  	$('#sendAddress').val(data);
		  	$('#sendAmount').focus();
		  	$('#announcement').removeClass('hidden');
		})
	},
	'click #scanCancel': function(){
		$('#announcement').removeClass('hidden');
	},
    'click #send': function(){
        var address = $('#sendAddress').val();
        var amount = $('#sendAmount').val();
        Meteor.call('send', address, amount, function(err, data){
            if(data.error){
                toastr.error('Error: ' + data.error);
            } else {
                toastr.success('Transaction sent successfully! <br> TxID: ' + data.result);
                $('#sendAddress').val('');
                $('#sendAmount').val('');
            }
        });
    }
});