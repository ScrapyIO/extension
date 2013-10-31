define(['libs/parse', 'libs/handlebars'], function(Parse, Handlebars){


	var template = "<div>";
	template += "<div>Matching : <b>{{regex}}</b></div>"
	template += "</div>";



	var view = Parse.View.extend({
		className:"scrapy-stats",
		tagName: "div",
		initialize: function() {

		},
		render: function() {
			this.$el.html(Handlebars.compile(template)(this.model.toJSON()));
			return this;
		}

	});



	return view;



});