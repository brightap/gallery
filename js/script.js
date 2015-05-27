$(document).ready(function(){

	var items = $('#gallery li'),
		itemsByTags = {};

	//loop through files//
	items.each(function(i){
		var elem = $(this),

		tags = elem.data('tags').split(',');

		//add data attribute for quicksand/
		elem.attr('data-id', i);

		$.each(tags,function(key, value){

			//Remove whitespace
			value =$.trim(value);

			if(!(value in itemsByTags)){
				//add empty value//
				itemsByTags[value] = [];
			}

			//add image to array
			itemsByTags[value].push(elem);
		});

	});
	//create "all items" option//
	createList('All Items', items);

	$.each(itemsByTags, function(key, value){

		createList(key,value);
	});

	//click handler
	$('#navbar a').live('click', function(e){
		var link = $(this);
	

		//add active class
		link.addClass('active').siblings().removeClass('active');

		$('#gallery').quicksand(link.data('list').find('li'));
		e.preventDefault(); //this stops from going somewhere or help to follow through the link
	});
	
		$('#navbar a:first').click();

		//create lists

		function createList(text, items){
			//empty ul 
			var ul =$('<ul>',{'class':'hidden'});

			//loop through
			$.each(items, function(){
				$(this).clone().appendTo(ul)
			});

			//add gallery div
			ul.appendTo('#gallery');

			//create menu item
			var a = $('<a>', {
				html:text,
				href:"#",
				data:{list:ul}
			}).appendTo('#navbar');
		}



});