define(['libs/parse', 'handlebars'], function(Parse, Handlebars){


	var template = "{{count}}"


	var view = Parse.View.extend({
		id:"ScrapyIO-count",
		tagName: "div",
		events:{
			"click": "onClick"
		},
		initialize: function() {
			_.bindAll(this, 'onClick');
		},	
		render: function() {

			var count = this.model.countSelectors();
			this.$el.html(Handlebars.compile(template)({count: count}));

			if (count == 0) this.$el.hide();
			else this.$el.show();

			return this;
		},
		onClick: function(e) {
			console.log('Stats clicked');
			e.stopPropagation();

		}

	});



	return view;



});