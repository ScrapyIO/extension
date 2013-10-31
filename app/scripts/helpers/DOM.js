define(['libs/jquery', 'libs/unique', 'data/Scraper', 'views/SelectorPopover', 'libs/lodash', 'libs/getPath'], function($, unique, Scraper, SelectorPopover, _, gp){


	var factory = {

		selector: function() {
			return $('*:not(:has(*))');
		},
		bindElements: function(selector) {
			selector.each(function(){
		   		$(this).on('click', function(e){
		   			
		   			if (!$(this).hasClass('scrape-io')) var selector = $(this).getPath();
		   			else var selector = $(this).parent().getPath();

		   			console.log(selector);

		   			SelectorPopover.removeAllPopover();
		   			SelectorPopover.popover($(this), selector);


		   			e.preventDefault();
		   			e.stopPropagation();
					return false;
		   		});	


		   		$(this).on('mouseenter', function(){
		   			$(this).css('border', '1px solid red');
		   		})


		   		$(this).on('mouseleave', function(){
		   			$(this).css('border', 'none');
		   		})

		   });	
		},
		wrapText: function() {
			$('*:has(*):not("body, iframe")').contents()
	        .filter(function(){
	        	return this.nodeType == 3 && $.trim(this.data).length > 0;
	        })
	        .wrap('<span class="scrape-io" />');
		},
		highlightText: function(sel) {
			sel.each(function(){
				$(this).addClass('scrape-highlight');
			});
		},
		unhighlightText: function(sel) {
			sel.each(function(){
				$(this).removeClass('scrape-highlight');
			});	
		},
		appendLogo:function() {
			$('<div class="scrape-logo">S</div>').appendTo('body');
		},
		highlightSelected: function(selectors) {
			_.keys(selectors).forEach(function(name){
				$(selectors[name]).addClass('scrape-highlight-selected');
			});
		}


	};


	return factory;


});