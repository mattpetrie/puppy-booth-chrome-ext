var KioskManager = {
	init: function(){
		sessionManager.setResetTimer();
		whitelistUrls.init();
	},
};

KioskManager.init();