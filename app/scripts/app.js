require(
	['libs/livereload',
	'libs/KeyboardJS', 
	'libs/jquery', 
	'helpers/DOM', 
	'libs/parse',
	'data/Scraper', 
	'helpers/Hub',
	'libs/lodash',
	'libs/smoke',
	'views/CounterView',
	'views/SaveModalView'], 
	function(livereload, KeyboardJS, $, DOM, Parse, Scraper, Hub, _, smoke, CounterView, SaveModalView){


	var inited = false;
	var crawlerLoadedDefer = $.Deferred();
	var crawlerLoadedPromise = crawlerLoadedDefer.promise();

	// app entry is special combo key
	$(function(){
		DOM.appendLogo();


		$('div#scrape-logo').on('click', function(){	
			if (!inited) {
				$(this).addClass('fixed');
				// Init Parse
				Parse.initialize("beTbPGy1fDKd4CkrbR6xqe3ZKa5KORh1FfYyr1S3", "5K3zERQWuyxLx06CZ1RO95KqkbnMivPAWUrWjurs");

				if (Parse.User.current() !== null) {
					init(Parse.User.current());
				}
				else {
					Parse.User.signUp("testing"+new Date().getTime(), "testing")
					.then(init, initFailed);
				}
			} 
			else {
				// Save / options modal
				crawlerLoadedPromise.then(function(scraper){
					var view = new SaveModalView({model: scraper});
					$('body').append(view.render().$el);
				});
			}
		});



	});


	
	var sel;
	var currentScraper;

	/// Init app

	function init(user) {

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
			crawlerLoadedDefer.resolve(model);

			/// DOM PROCESSING

			DOM.wrapText();
			sel = DOM.selector();
			DOM.unbindLinks();
			DOM.bindElements(sel, function(name, elem, uniqueSelector, previousName){
				if (name !== false) {
					Hub.emit('addedNewSelectorWithName', {
						name: name,
						selector: uniqueSelector,
						previousName: previousName
					})
				}
			});
			DOM.highlightText(sel);

			// Render counter;
			var counterView = new CounterView({model: currentScraper});
			$('body').append(counterView.render().$el);

			inited = true;
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

		console.log(newSelector);

		var newObject = _.extend(actualObject, newSelector);

		if (model.previousName) {
			delete newObject[model.previousName];
			console.log('** Removed ' + model.previousName + ' **');
		}

		console.log(newObject);
		currentScraper.set('selectors', newObject);
		currentScraper.save()
		.then(function(model){
			DOM.highlightSelected(model.get('selectors'));
			DOM.setLogoOnAlert();
		})
	});


});


