var KioskManager = {
	init: function(){
		sessionManager.init();
		whitelistUrls.init();
	},
};

KioskManager.init();