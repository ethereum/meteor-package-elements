/**
Template Controllers

@module Templates
*/

/**
Return the user identity icon

@class [template] dapp_identicon
@constructor
*/

/**
The cached identicons

@property cache
*/
var cache = {};

Template['dapp_identicon'].helpers({
    /**
    Make sure the identity is lowercased
    
    @method (identity)
    */
    'identity': function(identity){
        return (_.isString(this.identity)) ? this.identity.toLowerCase() : this.identity;
    },
    /**
    Return the cached or generated identicon
    
    @method (identiconData)
    */
    'identiconData': function(identity){

        // remove items if the cache is larger than 50 entries
        if(_.size(cache) > 50) {
            delete cache[Object.keys(cache)[0]];
        }

        var hexToBytes = function (hex){
            //increase the variance of the seed by converting it to bytes
            bytes = [];
            for(var i=0; i< hex.length-1; i+=2){
                bytes.push(parseInt(hex.substr(i, 2), 16));
            }
            return String.fromCharCode.apply(String, bytes);
        }

        return cache['ID_'+ identity] || (cache['ID_'+ identity] =  blockies.create({
            seed: hexToBytes(identity),
            size: 8,
            scale: 8
        }).toDataURL());
    }
});