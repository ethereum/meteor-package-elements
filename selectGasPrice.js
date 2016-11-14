/**
Template Controllers

@module Templates
*/

/**
The select gas price template

@class [template] dapp_selectGasPrice
@constructor
*/

/**
The the factor by which the gas price should be changeable.

@property toPowerFactor
*/
var toPowerFactor = 1.4;

/**
Calculates the gas * gas price.

@method calculateGasInWei
@return {Number}
*/
var calculateGasInWei = function(template, gas, gasPrice, returnGasPrice){
    // Only defaults to 50 shannon if there's no default set
    gasPrice = gasPrice || 50000000000;

    if(!_.isObject(gasPrice))
        gasPrice = new BigNumber(String(gasPrice), 10);

    // We multiply it by factor^2 to offset the default factor multiplicator that set at -2
    var suggestedGasPrice = gasPrice.times(new BigNumber(toPowerFactor).toPower(2));
    
    if(_.isUndefined(gas)) {
        console.warn('No gas provided for {{> dapp_selectGasPrice}}');
        return new BigNumber(0);
    }
    
    // divide and multiply to round it to the nearest billion wei (1 shannon)
    var billion = new BigNumber(1000000000);
    suggestedGasPrice = suggestedGasPrice.times(new BigNumber(toPowerFactor).toPower(TemplateVar.get(template, 'feeMultiplicator'))).dividedBy(billion).round().times(billion);

    return (returnGasPrice)
        ? suggestedGasPrice
        : suggestedGasPrice.times(gas);
}

Template['dapp_selectGasPrice'].onCreated(function(){
    TemplateVar.set('gasInWei', '0');
    TemplateVar.set('gasPrice', '0');
    TemplateVar.set('feeMultiplicator', -2);
});


Template['dapp_selectGasPrice'].helpers({
    /**
    Return the currently selected fee value calculate with gas price

    @method (fee)
    */
    'fee': function(){
        if(_.isFinite(TemplateVar.get('feeMultiplicator')) && _.isFinite(this.gas)) {
            var template = Template.instance();

            // set the value
            TemplateVar.set('gasInWei', calculateGasInWei(template, this.gas, this.gasPrice).floor().toString(10));
            TemplateVar.set('gasPrice', calculateGasInWei(template, this.gas, this.gasPrice, true).floor().toString(10));

            console.log('fee:', this.gas, this.gasPrice, calculateGasInWei(template, this.gas, this.gasPrice).toString(10));
            // return the fee
            return EthTools.formatBalance(calculateGasInWei(template, this.gas, this.gasPrice).toString(10), '0,0.[000000000000000000]', this.unit);
        }
    },
    /**
    Return the current unit

    @method (unit)
    */
    'unit': function(){
        var unit = this.unit || EthTools.getUnit();
        if(unit)
            return unit.toUpperCase();
    },
    /**
    Get the correct text, if TAPi18n is available.

    @method i18nText
    */
    'i18nText': function(key){
        if(typeof TAPi18n === 'undefined') {
            return (key === 'high') ? '+' : '-';
        } else {
            return TAPi18n.__('elements.selectGasPrice.'+ key);
        }
    }
});

Template['dapp_selectGasPrice'].events({
    /**
    Change the selected fee
    
    @event change input[name="fee"], input input[name="fee"]
    */
    'change input[name="fee"], input input[name="fee"]': function(e){
        TemplateVar.set('feeMultiplicator', Number(e.currentTarget.value));
    },
});
