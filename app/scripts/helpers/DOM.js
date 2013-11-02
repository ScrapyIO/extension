define(['libs/jquery', 'libs/unique', 'data/Scraper', 'views/SelectorPopover', 'libs/lodash', 'libs/getPath'], function($, unique, Scraper, SelectorPopover, _, gp){


	var factory = {

		selector: function() {
			return $('*:not(:has(*), #scrape-logo)');
		},
		bindElements: function(selector, callback) {
			selector.each(function(){
		   		$(this).on('click', function(e){
		   			
		   			if (!$(this).hasClass('scrape-io')) var selector = $(this).getPath();
					else var selector = $(this).parent().getPath();
		   			
		   			SelectorPopover.popover($(this), selector, callback);
		   			e.preventDefault();
		   			e.stopPropagation();
					return false;
		   		});	

		   });	
		},
		wrapText: function() {
			$('*:has(*):not("body, iframe, #scrape-logo")').contents()
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
			console.log('Appending');
			$('<div id="scrape-logo"></div>').appendTo('body');
		},
		setLogoOnAlert: function() {
			$('div#scrape-logo').addClass('alert');
		},
		highlightSelected: function(selectors) {
			_.keys(selectors).forEach(function(name){
				$(selectors[name]).addClass('scrape-highlight-selected');
				$(selectors[name]).data('scrapyIO', name);
			});
		},
		unbindLinks: function() {
			$('a').on('click', function(e){

				e.stopPropagation();
				e.preventDefault();
				return false;
			});
		}


	};


	return factory;


});