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
    Return the route name and route parameter

    @method route
    */
//     'route': function(){
//         if(!this.route)
//             return;

//         var returnValue = {
//             route: this.route,
//         };

//         returnValue[this.routeParam || 'identity'] = this.identity;
// console.log(returnValue);
//         return returnValue;
//     }
    /**
    Return the cached or generated identicon
    
    @method (identiconData)
    */
    'identiconData': function(identity){

        // remove items if the cache is larger than 50 entries
        if(_.size(cache) > 50) {
            delete cache[Object.keys(cache)[0]];
        }

        return cache['ID_'+ identity] || (cache['ID_'+ identity] =  blockies.create({
            seed: identity,
            size: 8,
            scale: 8,
            bgcolor: '#eee'
        }).toDataURL());
    }
});