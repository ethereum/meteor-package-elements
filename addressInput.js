/**
Template Controllers

@module Templates
*/

/**
The address input template, containg the identicon.

@class [template] dapp_addressInput
@constructor
*/

Template['dapp_addressInput'].created = function(){
    if(this.data.value)
        TemplateVar.set('toPublicKey', this.data.value);
};

Template['dapp_addressInput'].helpers({
    /**
    Return the to publicKey

    @method (toPublicKey)
    */
    'toPublicKey': function(){
        return TemplateVar.get('toPublicKey');
    }
});


Template['dapp_addressInput'].events({
    /**
    Set the to publicKey while typing
    
    @event keyup input[name="to"], input input[name="to"], change input[name="to"]
    */
    'keyup input[name="to"], input input[name="to"], change input[name="to"]': function(e){
        TemplateVar.set('toPublicKey', e.currentTarget.value);
    },
    /**
    Prevent the identicon from beeing clicked.

    TODO: remove?
    
    @event click a
    */
    'click a': function(e){
        e.preventDefault();
    }
});