# l8r.js


A light-weight library that provides a type of "action queue" to keep track of application events triggered by user clicks that occur before the JS that will handle it has loaded.

At its simplest, here's how a click event is enqueued:

    <a href="#" onclick="return l8r.nq( this )">Click me</a>

Enqueueing a high-level application event:

    <a href="#" onclick="return l8r.nq(this, 'myapp.highlevel_event')">Click me</a>



l8r.js is inspired by work Alex Kessinger shared in a DailyJS post entitled [Flickr's Asynchronous Script Loading Part 2](http://dailyjs.com/2011/11/28/flickr-async-2/).  In this post, Alex takes a look at the following problem (from [part 1](http://dailyjs.com/2011/11/28/flickr-async)):

    If you are using a script loader, or even if you are just putting your scripts at the bottom of your DOM, you have a problem. In some cases your scripts will load after the user has clicked on something that requires a JavaScript function to handle the click. It's possible you have a pure HTML version, but if the user has JavaScript enabled then we want to use it, even if the JavaScript hasn’t loaded yet. There needs to be a way of handling events before all of the assets have finished loading.

While Alex's solution 

 `l8r.js` "holds on to" user click events that may occur on a document before the appropriate click handler callbacks are available to respond to the interactions.

Like Alex's 
allows you to queue up 