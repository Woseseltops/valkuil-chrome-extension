chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    sendResponse({data: window.getSelection().toString()});
});
