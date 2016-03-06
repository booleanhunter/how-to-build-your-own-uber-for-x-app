// listen to events generated from the popup.
chrome.extension.onMessage.addListener(function(request, sender, sendResponse)
{
  switch(request.type)
  {
    case "colorAllCodes":
      highlightCodes();
    break;
  }
  return true;
});

// send a message to the content script in form of an object. The content script uses the values of the object upon receiving the message.
var highlightCodes = function()
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
  {
    chrome.tabs.sendMessage(tabs[0].id, {type: "highlight", color: "#B4A9C6"});
  });
}

/*
Every extension has an invisible background page which is run by the browser. 
It is recommended to use event generated scripts in the background page, since this improves the performance of the browser. In this manner, only on generation of a particular event the script gets executed. We should write the main logic over here.

Chrome provides extensions with many special-purpose APIs like browserAction, chrome.extension, chrome.tabs

chrome.extension:
The chrome.extension API has utilities that can be used by any extension page. It includes support for exchanging messages between an extension and its content scripts or between extensions, as described in detail in Message Passing.

chrome.tabs:
Use the chrome.tabs API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.

For more information about message passing between scripts, go to https://developer.chrome.com/extensions/messaging
*/
