function restoreOptions () {
	chrome.storage.local.get({
		rootUrl: '',
		timeout: 60,
		whitelist: []
	}, function(items){
		document.getElementById('rootUrl').value = items.rootUrl;
		document.getElementById('timeout').value = items.timeout;
		var whitelist = items.whitelist;
		document.getElementById('whitelist').value = whitelist.join(', ');
	});
};

function saveOptions () {
	var url = document.getElementById('rootUrl').value;
	var timeout = document.getElementById('timeout').value;
	var whitelist = document.getElementById('whitelist').value;
	chrome.storage.local.set({
		rootUrl: url,
		timeout: timeout,
		whitelist: whitelist.split(', ')
	});	
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);