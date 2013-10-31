define(['libs/bootstrap', 'libs/handlebars', 'data/Scraper', 'helpers/Hub'], function(_Bootstrap, Handlebars, Scraper, Hub){
	



	var template = "<div>What name do you want to use?</div>";
	template += '<div class="form-group"><input type="text" class="scrape-name" /></div>';
	template += '<button class="btn btn-primary btn-block scrape-save">Save</button>'
	template += '<button class="btn btn-info btn-block scrape-cancel">Cancel</button>'



	// Backbone style view
	var View = Parse.View.extend({
		events:{
			"click .scrape-save": "save",
			"keyup .scrape-name": "persistName"
		},
		initialize: function(opts) {	
			// _.bindAll(this, 'save');
		},
		render: function() {
			this.$el.html(template);
			return this;
		},
		save: function() {
			Hub.emit('addedNewSelectorWithName', this.model);
		},
		persistName: function(){
			var elem = this.$el.find('input.scrape-name');
			var data = elem.val();
			this.model.name = data;
		}

	});



	var makePopover = function(sel, content, uniqueSelector) {

		var model = {
			selector: uniqueSelector
		};

		var view = new View({model: model});

		sel.popover({
			title: "Pick a name dude",
			content: view.render().$el,
			html: true,
			placement: "bottom"
		});
		return sel;
	}


	return {

		popover: function(sel, uniqueSelector) {
			makePopover(sel, template, uniqueSelector);
			return sel.popover('show');
		},
		removeAllPopover: function() {

		}

	}

});