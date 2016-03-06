window.onload = function() {
	document.getElementById("button").onclick = function() {
		chrome.extension.sendMessage({
	        type: "colorAllCodes"
	    });
	}
}

/*

manifest_version: This lets Chrome know what version of the manifest file format we are using. Version 1 was deprecated as of Chrome 18, so you should always use 2.

background: Information about the scripts our extension requires to respond to things like a click of the browser action.

content_scripts: This tells us which script to run after every refresh. Runs within the current web page. If we need access to the current page's DOM, then we need to include this.

default_popup: We include an html document to be shown a a popup when we click the extension.

browser_actions: Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar. In addition to its icon, a browser action can also have a tooltip, a badge, and a popup.

*/
