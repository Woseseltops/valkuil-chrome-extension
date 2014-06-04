chrome.browserAction.onClicked.addListener(function(tab) 
{
  seltext = 'Oude tekst';

  chrome.tabs.sendRequest(tab.id, {}, function(response)
  {
      seltext = response.data;

      if (seltext == '')
      {
          alert('U heeft geen tekst geselecteerd om te corrigeren.');
      }
      else
      {
          chrome.windows.create({type: 'popup',focused: true, url: 'window.html', height: 225, width:330});
      }
  });

});

