

/**
The contract constants template

@class [template] dapp_output
@constructor
*/

/**
Formats the values for display

@method formatOutput
*/
var formatOutput = function(val) {
    if(_.isArray(val))
        return _.map(val, formatOutput);
    else {
        var value = 0;

        console.log('val?', val, typeof val, _.isBoolean(val));
        // stringify boolean
        if(_.isBoolean(val))
            value = val ? 'YES' : 'NO';

        // convert bignumber objects
        value = (_.isObject(val) && val.toString)
            ? val.toString(10)
            : val;

        return value;
    }
};


var createTemplateDataFromInput = function (input){
    input = _.clone(input);

    input.typeShort = input.type.match(/[a-z]+/i);
    input.typeShort = input.typeShort[0];
    input.bits = input.type.replace(input.typeShort, '');
    input.displayName = input.name
        .replace(/([A-Z])/g, ' $1')
        .replace(/([\-\_])/g, '&thinsp;<span class="punctuation">$1</span>&thinsp;');
        
    if(input.type.indexOf('[') === -1 &&
       (input.typeShort === 'string' ||
        input.typeShort === 'uint' ||
        input.typeShort == 'int' ||
        input.typeShort == 'address' ||
        input.typeShort == 'bool' ||
        input.typeShort == 'bytes')) {

        input.template =  'elements_input_'+ input.typeShort;
    } else {
        input.template =  'elements_input_json';
    }

    return input;    
};


Template['dapp_output'].helpers({
    /**
    Formats the value if its a big number or array

    @method (value)
    */
    'value': function() {
        var value = this.output.value;
        var type = this.output.type;

        if (type == "bool") {
            if (value=="true") 
                return "YES"
            else
                return "NO"
        } else if (type.indexOf("int")>0) {
            return value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        } else {
            return value;
        }
    },
    /**
    format the right bits

    @method (value)
    */
    'bits': function() {
        var bits = this.output.type.match(/([0-9]+)/i);
        return bits ? bits[0] : null;
    },
    /**
    format the right type

    @method (value)
    */
    'type': function() {
        if(typeof TAPi18n === 'undefined') {
            return this.output.type;
        } else {
            var typeShort = this.output.type.match(/([a-z]+)/i);
            return TAPi18n.__('elements.type.'+ typeShort[0] );
        }
    },
    /**
    Figures out extra data

    @method (extra)
    */
    'extra': function() {
        // var data = formatOutput(this.output.value); // 1000000000
        var value = this.output.value;
        var type = this.output.type;

        if (type == "bool") {
           if (value == "true") {
                return new Spacebars.SafeString('<span class="icon icon-check"></span>');
            } else {
                return new Spacebars.SafeString('<span class="icon icon-ban"></span>')
            } 
        } else if(type.indexOf("int")>0) {
            data = parseInt(value, 10);
            if (data > 1400000000 && data < 1800000000 && Math.floor(data/1000) != data/1000) {
                return '(' + moment(data*1000).fromNow() + ')';
            }
        } else if (type.indexOf("bytes") > 0 ) {
            var returnData = "";
            for(i = 0; i < value.length; i++) {
                // console.log("returnData", returnData);
                returnData += value.charAt(i);
            }
            return returnData;
        } else if (value == '') {
            return 'Value is empty';
        }
        
        // return;
    }
});