define(['libs/bootstrap', 'handlebars', 'data/Scraper', 'helpers/Hub', 'libs/smoke'], function(_Bootstrap, Handlebars, Scraper, Hub, smoke){
	



	var makePopover = function(sel, uniqueSelector, callback) {
		var name = sel.data('scrapyIO');

		if (!name) var title = "What name do you want to give to that selector?";
		else var title = "You're already crawling this. Wanna edit the name?"


		smoke.prompt(title, function(e){
			callback(e, sel, uniqueSelector, name);
		});

		if (name) {
			$('.smoke input').val(name);
		}

	}


	return {

		popover: function(sel, uniqueSelector, callback) {
			makePopover(sel, uniqueSelector, callback);
		},
		removeAllPopover: function() {

		}

	}

});