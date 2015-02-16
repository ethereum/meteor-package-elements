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

    // default set to true, to show no error
    TemplateVar.set('isValid', true);

    if(this.data.value)
        TemplateVar.set('address', this.data.value);
};

Template['dapp_addressInput'].helpers({
    /**
    Return the to address

    @method (address)
    */
    'address': function(){
        return TemplateVar.get('address');
    },
    /**
    Return the to address

    @method (isValid)
    */
    'isValid': function(){
        return TemplateVar.get('isValid');
    }
});


Template['dapp_addressInput'].events({
    /**
    Set the to address while typing
    
    @event input input[name="to"], change input[name="to"]
    */
    'input input[name="to"], change input[name="to"]': function(e){
        if(EthTools.isAddress(e.currentTarget.value))
            TemplateVar.set('isValid', true);
        else
            TemplateVar.set('isValid', false);
        TemplateVar.set('address', e.currentTarget.value);
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