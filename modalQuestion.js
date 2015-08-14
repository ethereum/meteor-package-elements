/**
Template Controllers

@module Templates
*/

/**
The modal question template. It can receive an ok and cancel function,
which will be execited if the ok or cancel button is pressed.

After any of the buttons is pressed the modal, will disappear.

The data context for this modal should look as follows:

    {
        text: 'Do you really want to do this?',
        ok: function(){
            // do something on ok
        },
        cancel: function(){
            // do something on cancel
        }
    }

@class [template] dapp_modal_question
@constructor
*/

Template['dapp_modal_question'].helpers({
    /**
    Check if the `ok` property is present, without executing it yet.

    @method (hasOk)
    */
    'hasOk': function(){
        return (this.ok);
    },
    /**
    Check if the `cancel` property is present, without executing it yet.

    @method (hasCancel)
    */
    'hasCancel': function(){
        return (this.cancel);
    },
    /**
    Get the correct text, if TAPi18n is available.

    @method i18nText
    */
    'i18nText': function(key){
        if(typeof TAPi18n === 'undefined') {
            return (key === 'ok') ? 'OK' : 'Cancel';
        } else {
            return TAPi18n.__('buttons.'+ key);
        }
    }
});


Template['dapp_modal_question'].events({
    /**
    When the confirm button is clicked, execute the given ok() function.

    @event click .dapp-modal-buttons button.ok
    */
    'click .dapp-modal-buttons button.ok': function(e){
        if(_.isFunction(this.ok))
            this.ok();

        // hide the modal
        EthElements.Modal.hide();
    },
    /**
    When the confirm button is clicked, execute the given cancel() function.

    @event click .dapp-modal-buttons button.cancel
    */
    'click .dapp-modal-buttons button.cancel': function(e){
        if(_.isFunction(this.cancel))
            this.cancel();

        // hide the modal
        EthElements.Modal.hide();
    }
});