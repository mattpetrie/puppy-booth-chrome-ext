var whitelistUrls = {

	updateStore: function(){
		chrome.storage.local.set({ 'whitelist': this.whitelist })
	},

	retrieveStore: function(){
		chrome.storage.local.get('whitelist', function(items){
			this._whitelist = items.whitelist;
			return this.whitelist;
		}.bind(this));
	},

	add: function(url){
		this._whitelist.push(url);
		this.updateStore();
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

	// set whitelist to array of string urls
	set: function(urls){
		this.whitelist = urls;
		this.updateStore();
	},

	blockUrls: function(){
		chrome.webRequest.onBeforeRequest.addListener(
			function(details){
				return {
					cancel: this.isWhitelisted(details.url),
				};
			}.bind(this),
			{ urls: ["<all_urls>"] },
			["blocking"]
		);
	},

	isWhitelisted: function(){
		return true;
	}

}

// whitelistUrls.blockUrls();