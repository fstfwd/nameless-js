## Setting Up The Client

In the last example I showed you how you could potentially send initial data to your app from the server.
Setting up Nameless for use client side is really simple.

Here's an example of Nameless in a React component that could update one of our recipes.

```js
import React, { Component } from 'react';
import Nameless from 'nameless-js';

class Recipe extends Component {
    constructor() {
        super();

        // All you need to pass into Nameless is the apiPrefix
        // you set up in your server configuration.
        // I want to note it would be better to get this value
        // from the apiPrefix value returned when calling Nameless on the server,
        // instead of hardcoding /api here.
        this.nameless = Nameless('/api');
    }

    // if you have an isomorphic app you can call the nameless.exec function within
    // componentWillMount and it will be called server-side, before your app is rendered
    // when called on the server our service methods will be called directly.
    componentWillMount() {
        this.nameless.exec('recipes', ACTIONS.UPDATE_RECIPE, { id: 1 })
            .then(data => {

                // do something with data
            });
    }

    onBtnClick = () => {

        // this is where the magic happens
        // we pass in our service, our action, and our payload
        // and then Nameless calls the service we set up on the server

        // when called client side this will send an XHR request
        this.nameless.exec('recipes', ACTIONS.UPDATE_RECIPE, { id: 1 })
            .then(data => {

                // when the request is complete we will get our data
                // back from the server that we can do whatever we
                // want with.
            });
    }

    render() {
        return (
            <button onClick={this.onBtnClick}>Update!</button>
        )
    }
}

```