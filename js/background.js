var KioskManager = {
	init: function(){
		sessionManager.setIdleListener(120, sessionManager.resetSession);
		whitelistUrls.retrieveStore();
	},
};

KioskManager.init();