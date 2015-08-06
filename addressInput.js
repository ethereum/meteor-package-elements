/**
Template Controllers

@module Templates
*/

/**
The address input template, containg the identicon.

@class [template] dapp_addressInput
@constructor
*/

Template['dapp_addressInput'].onCreated(function(){

    // default set to true, to show no error
    TemplateVar.set('isValid', true);

    if(this.data.value) {
        TemplateVar.set('value', this.data.value);
    }
});

Template['dapp_addressInput'].onRendered(function(){
    if(this.data.value) {
        this.$('input').trigger('change');
    }
});

Template['dapp_addressInput'].helpers({
    /**
    Return the to address

    @method (address)
    */
    'address': function(){
        var address = TemplateVar.get('value');

        if(Template.instance().view.isRendered && Template.instance().find('input').value !== address)
            Template.instance().$('input').trigger('change');

        return (_.isString(address)) ? '0x'+ address.replace('0x','') : false;
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
        var value = e.currentTarget.value;

        // remove whitespaces
        if(value.indexOf(' ') !== -1) {
            value = value.replace(/ +/, '');
            e.currentTarget.value = value;
        }

        // add 0x
        if(value.length > 2 && value.indexOf('0x') === -1) {
            value = '0x'+ value;
            e.currentTarget.value = value;
        }

        if(web3.isAddress(value) || _.isEmpty(value))
            TemplateVar.set('isValid', true);
        else
            TemplateVar.set('isValid', false);

        if(_.isEmpty(value))
            TemplateVar.set(template, 'value', false);
        else
            TemplateVar.set(template, 'value', value);
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