require(
	['libs/livereload', 'libs/KeyboardJS', 'libs/jquery', 'helpers/DOM', 'libs/parse', 'data/Scraper', 'views/PageStats', 'helpers/Hub', 'libs/lodash'], 
	function(livereload, KeyboardJS, $, DOM, Parse, Scraper, PageStats, Hub, _){

	// app entry is special combo key

	var KeyboardJSHandler = KeyboardJS.on('shift + command', function() {	
		// Init Parse
		Parse.initialize("beTbPGy1fDKd4CkrbR6xqe3ZKa5KORh1FfYyr1S3", "5K3zERQWuyxLx06CZ1RO95KqkbnMivPAWUrWjurs");

		// Wait for DOM to be Loaded to process data

		$(function(){
			if (Parse.User.current() !== null) {
				init(Parse.User.current());
			}
			else {
				Parse.User.signUp("testing"+new Date().getTime(), "testing")
				.then(init, initFailed);
			}
			// Only launch app once
			KeyboardJSHandler.clear();
			KeyboardJSHandler = null;
		});  	
	});



	var sel;
	var currentScraper;

	/// Init app

	function init(user) {

		DOM.wrapText();
		sel = DOM.selector();
		DOM.bindElements(sel);
		DOM.highlightText(sel);
		DOM.appendLogo();

		// Let's see if a crawler has already been setup for this page

		Scraper.helpers.getScrapersForUserThatMatches(user, window.location.href)
		.then(function(data){
			if (data.length > 0) {
				var model = data[0];	
				if (model.get('selectors')) DOM.highlightSelected(model.get('selectors'));
			}
			else {
				var model = new Scraper.model;
			}
			currentScraper = model;
			var pageStats = new PageStats({model: model});
			$('div.scrape-logo').append(pageStats.render().$el);

		});

	}


	function initFailed(err) {
		alert(err);
	}


	//// Event catching
	Hub.on('addedNewSelectorWithName', function(model){
		var actualObject = currentScraper.get('selectors') ? currentScraper.get('selectors') : {};
		var newSelector = {};
		newSelector[model.name] = model.selector;
		var newObject = _.extend(actualObject, newSelector);
		console.log(newObject);
		currentScraper.set('selectors', newObject);
		currentScraper.save()
		.then(function(model){
			DOM.highlightSelected(model.get('selectors'));
		})
	});


});


