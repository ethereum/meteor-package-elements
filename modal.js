/**
Template Controllers

@module Templates
*/

/**
The modal wrapper template.
If you pass "closePath" in the data context, it will use this path, when the modal overlay is clicked.


@class [template] dapp_modal
@constructor
*/


/**
Look the scrolling of the body

@method rendered
*/
Template['dapp_modal'].created = function(){
    $('body').addClass('disable-scroll blur');
};


/**
Remove look of scrolling from the body

@method rendered
*/
Template['dapp_modal'].destroyed = function(){
    $('body').removeClass('disable-scroll blur');
};



Template['dapp_modal'].events({
    /**
    Hide the modal on click. If the data context has the property "closePath",
    it will route to this one instead of going back in the browser history.

    If the "closeable" is FALSE, it won't close the modal, when clicking the overlay.

    @event click .dapp-modal-overlay
    */
    'click .dapp-modal-overlay': function(e, template){

        // hide the modal
        if($(e.target).hasClass('dapp-modal-overlay') && this.closeable !== false) {

            if(typeof Router !== 'undefined') {

                if(this.closePath)
                    Router.go(this.closePath);
                else
                    Router.current().render(null, {to: 'modal'});
            }
        }
    }
});