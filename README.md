# Ethereum elements



## Usage

The following elements can be use anywhere in your dapp.


### Identicon

Shows an identicon.

You can add the class `dapp-small`, `dapp-medium` to make it smaller. Default size is to 64px.

TODO: Icon is clickable and links to?

```html
{> dapp_identicon identity='0x214243657890897654321' class="dapp-small"}}
```


### Address Input

Creates a input field, with an identicon, which will change based on the input value.

You can add the class `dapp-large` to make it a larger input.

```html
{{> dapp_addressInput placeholder="0x000000.." value="Default Value" class="dapp-large"}}
```


### Modal

**Note** you need the `iron:router` package for this element.

Just place a modal region before the closing body tag.

```html
{{> yield region="modal"}}
```

Then you can render the modal and its content inside using a route as follows:

```js
Router.route('/myRoute', function () {
    this.render();
    this.render('dapp_modal', {
        to: 'modal',
        data: {
            closePath: '/dashboard' // set this property if you want to determine where to go when the modal overlay is clicked.
        }
    });
    this.render('myContentTemplate', {
        to: 'modalContent',
        data: function(){
            return MyCollection.findOne();
        }
    });
},{
    name: 'myRoute'
});
```

You can also render the modal without a route:

```js
Router.current().render('dapp_modal', {to: 'modal'});
Router.current().render('myContentTemplate', {
    to: 'modalContent',
    data: {
        myData: 'some data'
    }
});
```

To remove the modal in another route call the following in the `onBeforeAction` hook e.g.:

```js
Router.route('/anotherRoute', function () {
    this.render(null, {to: 'modal'});
    this.next();
});
```

To close it manually call `Router.current().render(null, {to: 'modal'});`.


### Modal Question

**Note** you need the `iron:router` package for this element.

The question modal is a modal content template, which can be used to display a text and allow OK and Cancel options.

You basically just can pass a `text`, `ok` and/or `cancel` property as a data context to set callbacks, which will be fired when the button is pressed.
If you set the `ok` or `cancel` property to `true`, it will just close the modal without any action. If you pass `false` or leave the `ok` or `cancel` property, it won't show that button.

```js
Router.current().render('dapp_modal', {to: 'modal'});
Router.current().render('dapp_modal_question', {
    to: 'modalContent',
    data: {
        text: 'Do you want to ...',
        
        ok: function(){
            // do something on ok
        },
        cancel: true // simply show th cancel button and close the modal on click
    }
});
```js

The modal question can use i18n for the ok and cancel button texts.
If the `TAPi18n` helper is available it will use `TAPi18n.__('buttons.ok')` and `TAPi18n.__('buttons.cancel')` for the buttons.
