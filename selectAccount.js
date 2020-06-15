/**
Template Controllers

@module Templates
*/

/**
The select account template

@class [template] dapp_selectAccount
@constructor
*/

Template["dapp_selectAccount"].onCreated(function() {
  if (this.data) {
    if (this.data.value) {
      TemplateVar.set("value", this.data.value);
    } else if (this.data.accounts && this.data.accounts[0]) {
      TemplateVar.set("value", this.data.accounts[0].address);
    }
  }
});

Template["dapp_selectAccount"].helpers({
  /**
    Check if its a normal account

    @method (isAccount)
    */
  isAccount: function() {
    return this.type === "account" && Template.parentData(1).showAccountTypes;
  },
  /**
    Return the selected attribute if its selected

    @method (selected)
    */
  selected: function() {
    // console.log(TemplateVar.get("value"), this.address);
    return TemplateVar.get("value").toLowerCase() === this.address.toLowerCase() ? { selected: true } : {};
  },
  /**
    Check if the current selected unit is not ether

    @method (isNotEtherUnit)
    */
  isNotEtherUnit: function() {
    return EthTools.getUnit().toLowerCase() !== "ether";
  },
  /**
    Check if the current selected unit is not ether

    @method (isNotEtherUnit)
    */
  isAddress: function() {
    return web3.utils.isAddress(TemplateVar.get("value"));
  }
});

Template["dapp_selectAccount"].events({
  /**
    Set the selected address.
    
    @event change select
    */
  "change select": function(e) {
    TemplateVar.set("value", e.currentTarget.value);
  }
});
