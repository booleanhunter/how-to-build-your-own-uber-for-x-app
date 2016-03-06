chrome.runtime.onMessage.addListener(function(message, sender, sendResponse)
{
  switch(message.type)
  {
    case "highlight":
      var code = document.querySelectorAll("code");
      if(code.length === 0)
      {
        alert("There are no codes in this page.");
      }
      else
      {
        for(var i=0; i<code.length; i++)
        {
          code[i].style.backgroundColor = message.color;
          code[i].style.fontWeight="bold";	  
	}
      }
      break;
  }
});
