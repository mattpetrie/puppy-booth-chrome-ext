var whitelistUrls = {

	updateStore: function(){
		chrome.storage.local.set({ 'whitelist': this.whitelist })
	},

	retrieveStore: function(){
		chrome.storage.local.get('whitelist', function(items){
			this.whitelist = items.whitelist;
			return this.whitelist;
		}.bind(this));
		// chrome.storage.onChanged.addListener(function(change))
	},

	add: function(url){
		this.whitelist.push(url);
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

	// set whitelist to array of string domain names, ex: ('www.google.com')
	set: function(urls){
		this.whitelist = urls;
		this.updateStore();
	},

	blockUrls: function(){
		chrome.webRequest.onBeforeRequest.addListener(
			function(details){
				console.log(details.type + " " + details.url);
				if(details.type === "main_frame") {
					return {
						cancel: !this.isWhitelisted(details.url),
					}
				};
			}.bind(this),
			{ urls: ["http://*/*", "https://*/*"] },
			["blocking"]
		);
	},

	isWhitelisted: function(url){
		var re;
		// var that = this;
		// chrome.tabs.query({
		// 	active: true,
		// 	windowType: "normal",
		// 	url: that.whitelist
		// 	}, function(tabs){ 
		// 		console.log(that.whitelist);
		// 		return tabs.length === 1;
		// 		})
		for(var i = 0; i < this.whitelist.length; i++){
			re = new RegExp('.*' + this.whitelist[i] + ".*");
			if(re.test(url)){
				return true;
			}
		}
		return false;
	}

}
