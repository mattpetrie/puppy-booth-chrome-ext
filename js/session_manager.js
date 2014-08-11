var sessionManager = {

	// closes all tabs except the first in the current browser session
	closeExtraTabs: function(){
		var tabIds = [];
		chrome.tabs.query({}, function(tabs){
			for(var i = 0; i < tabs.length; i++){
				tabIds.push(tabs[i].id)
			}
			chrome.tabs.remove(tabIds.slice(1));
		});
	},

	dataListeners: function(){
		chrome.storage.onChanged.addListener(function(changes, areaName){
			if (areaName === "local" && changes.timeout){
				chrome.idle.setDetectionInterval(parseInt(changes.timeout.newValue));
				console.log("Idle detection interval changed to " + changes.timeout.newValue);
			}
		});
	},

	// !Caution! Inovoking this function will destroy ALL cookies in the current browser's
	// cookie store. Use an incognito tab to test since cookies are sandboxed there.
	destroyAllCookies: function(){
		chrome.cookies.getAll({}, function(cookies){
			for(var i = 0; i < cookies.length; i++){
				chrome.cookies.remove({ name: cookies[i].name });
			}
		})
	},

	init: function(){
		sessionManager.dataListeners();
		sessionManager.setResetTimer();
	},

	// default value for rootUrl is google, but will be overridden by value in storage
	navigateToRoot: function(){
		chrome.storage.local.get({ rootUrl: "http://www.google.com/" }, function(items){
			chrome.tabs.query({active: true}, function(tabs){
				chrome.tabs.update(tabs[0].id, { url: items.rootUrl })
			});
		});
	},

	resetSession: function(){
		sessionManager.closeExtraTabs();
		// this.destroyAllCookies();
		sessionManager.navigateToRoot();
		console.log("Session was reset at " + Date.now());
	},

	resetListener: function(newState){
		if(newState !== "active"){
			this.resetSession();
		}
	},

	setResetTimer: function(){
		chrome.storage.local.get({timeout: 60}, function(items){
			chrome.idle.setDetectionInterval(parseInt(items.timeout));
			chrome.idle.onStateChanged.addListener(this.resetListener.bind(this));
		}.bind(this));
	}
}