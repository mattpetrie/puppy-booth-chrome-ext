var KioskManager = {
	init: function(){
		sessionManager.setResetTimer();
		whitelistUrls.retrieveStore();
		whitelistUrls.blockUrls();
	},
};

KioskManager.init();