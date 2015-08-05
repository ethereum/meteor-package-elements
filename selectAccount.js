/**
Template Controllers

@module Templates
*/

/**
The select account template

@class [template] dapp_selectAccount
@constructor
*/

Template['dapp_selectAccount'].onCreated(function(){
    if(this.data && this.data.accounts && this.data.accounts[0]) {
        TemplateVar.set('value', this.data.accounts[0].address);
    }
});


Template['dapp_selectAccount'].helpers({
    /**
    Check if its a normal account

    @method (isAccount)
    */
    'isAccount': function(){
        return this.type === 'account' && Template.parentData(1).showAccountTypes;
    },
    /**
    Return the selected address

    @method (selectedAccount)
    */
    'selectedAccount': function(){
        return TemplateVar.get('value');
    },
});

Template['dapp_selectAccount'].events({
    /**
    Set the selected address.
    
    @event change select[name="select-accounts"]
    */
    'change select[name="dapp-select-account"]': function(e){
        TemplateVar.set('value', e.currentTarget.value);
    }
});
