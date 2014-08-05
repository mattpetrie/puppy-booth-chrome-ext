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

	// !Caution! Inovoking this function will destroy ALL cookies in the current browser's
	// cookie store. Use an incognito tab to test since cookies are sandboxed there.
	destroyAllCookies: function(){
		chrome.cookies.getAll({}, function(cookies){
			for(var i = 0; i < cookies.length; i++){
				chrome.cookies.remove({ name: cookies[i].name });
			}
		})
	},

	setIdleListener: function(){
		chrome.idle.setDetectionInterval(60);

		chrome.idle.onStateChanged.addListener(function(newState){
			if(newState !== "active"){
				console.log("Chrome is now in an idle state.")
			}
		});
	}
}

