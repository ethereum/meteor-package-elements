/**
Formats a number.

    {{dapp_formatNumber myNumber "0,0.0[0000]"}}

@method (dapp_formatNumber)
@param {String} number
@param {String} format       the format string
@return {String} The formatted number
**/
Template.registerHelper('dapp_formatNumber', EthTools.formatNumber);

/**
Formats a number.

    {{dapp_formatBalance myNumber "0,0.0[0000]"}}

@method (dapp_formatBalance)
@param {String} number
@param {String} format       the format string
@return {String} The formatted number
**/
Template.registerHelper('dapp_formatBalance', EthTools.formatBalance);