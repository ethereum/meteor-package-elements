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
        var address = TemplateVar.get('address');

        if(Template.instance().view.isRendered && Template.instance().find('input').value !== address)
            Template.instance().$('input').trigger('change');

        return (_.isString(address)) ? '0x'+ address.replace('0x','') : false;
    },
    /**
    Return the to address

    @method (isValid)
    */
    'isValid': function(){
        return TemplateVar.get('isValid');
    },
    /**
    Return the autofocus or disabled attribute.

    @method (additionalAttributes)
    */
    'additionalAttributes': function(){
        var attr = {};

        if(this.autofocus)
            attr.autofocus = true;
        if(this.disabled)
            attr.disabled = true;

        return attr;
    }
});


Template['dapp_addressInput'].events({
    /**
    Set the to address while typing
    
    @event input input, change input
    */
    'input input, change input': function(e, template){
        if(Helpers.isAddress(e.currentTarget.value) || _.isEmpty(e.currentTarget.value))
            TemplateVar.set('isValid', true);
        else
            TemplateVar.set('isValid', false);

        if(_.isEmpty(e.currentTarget.value))
            TemplateVar.set(template, 'address', false);
        else
            TemplateVar.set(template, 'address', e.currentTarget.value);
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