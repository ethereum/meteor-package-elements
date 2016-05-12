/**
Template Controllers

@module Packages
*/


/**
Helper elements for ethereum dapps

@class [packages] ethereum:elements
@constructor
*/

EthElements = {
    'Modal': {
        _current: new ReactiveVar(),
        /**
        Shows the modal template

        @method show
        @param {String|Object} template the template name or an object with `{template: 'name', data: {data: 'context'}}`
        @param {Object} options the options for the modal like `{closeable: true, closePath: '/dashboard'}`
        */
        'show': function(template, options) {
            options = options || {};

            if(_.isObject(template)) {
                options = _.extend(options, template);
                this._current.set(options);
            } else if(_.isString(template)) {
                options.template = template;
                this._current.set(options);
            }
        },
        /**
        Hide the modal template

        @method hide
        */
        'hide': function(){
            this._current.set(false);
        },
        /**
        Show the question modal

        @method question.show
        @param {Object} data the data for the modal question template
        @param {Object} options the options for the modal like `{closeable: true, closePath: '/dahsboard'}`
        */
        'question': function(data, options){
            EthElements.Modal.show({
                template: 'dapp_modal_question',
                data: data
            }, options);
        }
    }
};
