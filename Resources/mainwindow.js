var mainWindow = Ti.UI.currentWindow;
var alphabets=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var count=26; 

// define all of our windows (views), which will have their own JavaScript contexts
var windows = {};
var PlaySlideView = require('alphabets/PlaySlideView');

for (var i = 1; i <= count; i++) {
	windows[i]=PlaySlideView(i,alphabets[i-1]); 
}

 
/**
 * Define the window controller. This manages opening windows, going back, and closing the app.
 */
var controller = new (function () {
	 for (var i = 1; i <= count; i++) {
        (function(i) {
            windows[i].addEventListener('click', function(e) {
                controller.open(i);
            });
            windows[i].addEventListener('swipe', function(e) {
            	switch (e.direction)
            	{
            		case 'left':
            		var j=i+1;
            		if(j>count)
            			j=1;
            		controller.open(j);
            		break;
            		case 'right':
            		var j=i-1;
            		if(j<1)
            			j=1;
            		controller.open(j);
            		break;
            	}
            });
        })(i);
    }
    // keep track of the index of windows the user visits
    // note that this will be numbers like 1 or 1.0, depending on if this has been serialized or not...
    // (so always parseInt() any value grabbed from the history)
    var history = Titanium.App.Properties.getList('Controller-History', []);
 
    // utility function for making sure the last window in the history queue is open and visible
    function makeSureLatestWindowIsOpen() {
        var toOpen = parseInt(history[history.length-1]);
        // have we created our new window yet?
        if (windows[toOpen].neverBeenOpened) {
            windows[toOpen].open({animated:true});
            windows[toOpen].neverBeenOpened = false;
        } else { // it's already been created, and hidden. show it!
            windows[toOpen].show();
        }
    }
 
    /**
     * Opens a window, tracking it in the history.
     */
    this.open = function(toOpen) {
        // have we opened windows before?
        if (history.length > 0) {
            var lastOpen = parseInt(history[history.length-1]);
            // same window? don't do anything!
            if (lastOpen == toOpen) {
                makeSureLatestWindowIsOpen();
                return;
            }
            // hide previous window
            windows[lastOpen].hide();
        }
        // show new window
        history.push(toOpen);
        makeSureLatestWindowIsOpen();
    };
    /**
     * Goes back in the window history, showing the last open window or closing the app if we run out.
     */
    this.back = function() {
        var toHide = history.length && parseInt(history.pop());
        // did we pop a window index off the history?
        if (history.length > 0) {
            windows[toHide].hide();
            makeSureLatestWindowIsOpen();
        } else { // ran out... close the app!
            Titanium.App.Properties.setList('Controller-History', history);
            mainWindow.close();
        }
    };
    /**
     * Initializes the window controller, opening the last window (or the first window).
     */
    this.initialize = function() {
        this.open((history.length && parseInt(history.pop())) || 1);
    };
    /**
     * Returns the history array. Note that this is persisted across app launches and closings.
     */
    this.getHistory = function() {
        return history;
    };
});
// define our menu (this is the only spot we need to do this)
/*
Titanium.Android.currentActivity.onCreateOptionsMenu = function(e) {
    var menu = e.menu;
    for (var i = 1; i <= 3; i++) {
        (function(i) {
            var menuItem = menu.add({title: 'Window ' + i});
            menuItem.setIcon('app://KS_nav_ui.png');
            menuItem.addEventListener('click', function(e) {
                controller.open(i);
            });
            windows[i].addEventListener('click', function(e) {
                controller.open(i);
                alert(i);
            });
            windows[i].addEventListener('swipe', function(e) {
            	switch (e.direction)
            	{
            		case 'left':
            		var j=i+1;
            		if(j>3)
            			j=1;
            		controller.open(j);
            		break;
            		case 'right':
            		var j=i-1;
            		if(j<1)
            			j=1;
            		controller.open(j);
            		break;
            	}
            });
        })(i);
    }
};
*/
// add a "back" listener, which will override the default "activity closing" functionality



// that would otherwise close our window
mainWindow.addEventListener('android:back', function(e) {
    controller.back();
});
// we'll start off by opening up window 1, or the last window that was open
controller.initialize();