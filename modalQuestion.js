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
    hasOk: function(){
        return (this.ok);
    },
    /**
    Check if the `cancel` property is present, without executing it yet.

    @method (hasCancel)
    */
    hasCancel: function(){
        return (this.cancel);
    },

    /**
    Returns text for OK button. Can be either an argument, a i18n default text or a default value.

    @method (okButtonText)
    */
    okButtonText: function(){
        return this.modalQuestionOkButtonText || TAPi18n.__('buttons.ok') || 'OK';
    },

    /**
    Returns text for Cancel button. Can be either an argument, a i18n default text or a default value.

    @method (cancelButtonText)
    */
    cancelButtonText: function(){
        return this.modalQuestionCancelButtonText || TAPi18n.__('buttons.cancel') || 'Cancel';
    }
});


Template['dapp_modal_question'].events({
    /**
    When the confirm button is clicked, execute the given ok() function.

    @event click .dapp-modal-buttons button.ok
    */
    'click .dapp-modal-buttons button.ok': function(e){
        // hide the modal
        EthElements.Modal.hide();

        if(_.isFunction(this.ok)){
            this.ok();
        }

    },
    /**
    When the confirm button is clicked, execute the given cancel() function.

    @event click .dapp-modal-buttons button.cancel
    */
    'click .dapp-modal-buttons button.cancel': function(e){
        // hide the modal
        EthElements.Modal.hide();

        if(_.isFunction(this.cancel))
            this.cancel();
    }
});