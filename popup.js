document.addEventListener('DOMContentLoaded', function () 
{
   var bg = chrome.extension.getBackgroundPage();
   var seltext = bg.seltext;
   var results;
   var error_viewing = 0;

   $('#loader').html('<img src="img/loader.png">');

	function rotation()
	{
		//Go on until you are invisible
		if($('#loader').css('display') != 'none')
		{
			$("#loader").rotate(
				{
				  angle:0, 
				  animateTo:360, 
				  callback: rotation,
			   });
		}
	}

	rotation();

   $('#suggestionarea').hide();
   $('#noerrors').hide();
   $('#pager').hide();

	function update_view() 
	{
		$('#current_error').html(error_viewing);
		$('#error_sentence').html(results[error_viewing].original);
		$('#suggestions').html(results[error_viewing].correction);	
		error_nr = error_viewing + 1;
		$('#currenterror').val(error_nr + '/' + results.length);
	}

   $.ajax(
   {
       url:"http://cls.ru.nl/staff/wstoop/correct.php?txt="+seltext, 
       type:"get",
       success: function(data,status) 
       {
           $('#loader').html('<xmp>'+data+'</xmp>');
	   data = jQuery.parseJSON(data);
	   results = data;
           
           if(results.length > 0)
           {
               $('#suggestionarea').show();
	   }
           else
           { 
              $('#noerrors').show();
           }
 
           $('#pager').show();
           $('#loader').hide();
	   update_view();
       },
       timeout: 10000
   });

	$('#cursorleft').click(function()
	{
		if(error_viewing > 0)
		{
			error_viewing -= 1;
		}
		update_view();
	});

	$('#cursorright').click(function()
	{
		if(error_viewing < results.length - 1)
		{
			error_viewing += 1;
		}
		update_view();
	});


});

$(document).ready(function(){
  $("p").click(function(){
    $(this).hide();
  });
});
