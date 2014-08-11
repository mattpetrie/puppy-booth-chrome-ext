var whitelistUrls = {

	init: function(){
		whitelistUrls.retrieveStore();
		whitelistUrls.dataListeners();
		whitelistUrls.blockUrls();
	},

	add: function(url){
		this.whitelist.push(url);
		this.updateStore();
	},

	blockUrls: function(){
		chrome.webRequest.onBeforeRequest.addListener(
			function(details){
				if(details.type === "main_frame" && !this.isWhitelisted(details.url)) {
					return {
						redirectUrl: this.rootUrl
					}
				};
			}.bind(this),
			{ urls: ["http://*/*", "https://*/*"] },
			["blocking"]
		);
	},

	dataListeners: function(){
		chrome.storage.onChanged.addListener(function(changes, areaName){
			if (areaName === "local"){
				if (changes.whitelist){
					this.whitelist = changes.whitelist.newValue;
				} else if (changes.rootUrl){
					this.rootUrl = changes.rootUrl.newValue;
				}
			}
		}.bind(this));
	},

	isWhitelisted: function(url){
		var re;
		for(var i = 0; i < this.whitelist.length; i++){
			re = new RegExp('.*' + this.whitelist[i] + ".*");
			if(re.test(url)){
				return true;
			}
		}
		return false;
	},

	remove: function(url){
		var urlIndex = items.whitelist.indexOf(url);
		if(urlIndex !== -1){
			this.whitelist.splice(urlIndex, 1);
			this.updateStore();
		}
	},

	reset: function(){
		this.whitelist = [];
		chrome.storage.local.set({ 'whitelist': [] })
	},

	retrieveStore: function(){
		chrome.storage.local.get(['whitelist', 'rootUrl'], function(items){
			this.whitelist = items.whitelist;
			this.rootUrl = items.rootUrl;
		}.bind(this));
	},

	// set whitelist to array of string domain names, ex: ('google.com')
	set: function(urls){
		this.whitelist = urls;
		this.updateStore();
	},

	updateStore: function(){
		chrome.storage.local.set({ 'whitelist': this.whitelist })
	}

}
