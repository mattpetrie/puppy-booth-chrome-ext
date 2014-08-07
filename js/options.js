function restoreOptions () {
	chrome.storage.local.get({
		rootUrl: '',
		whitelist: []
	}, function(items){
		document.getElementById('rootUrl').value = items.rootUrl;
		var whitelist = items.whitelist;
		document.getElementById('whitelist').value = whitelist.join(', ');
	});
};

function saveOptions () {
	var url = document.getElementById('rootUrl').value;
	var whitelist = document.getElementById('whitelist').value;
	chrome.storage.local.set({
		rootUrl: url,
		whitelist: whitelist.split(', ')
	});	
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);