define(['libs/parse', 'handlebars', '../templates', 'libs/bootstrap-modals', 'libs/lodash', 'libs/jquery'], function(Parse, Handlebars, Templates, _bm, _, $){

	var template = Templates['app/scripts/views/templates/Modal.hbs'];
	var templateNoCrawler = Templates['app/scripts/views/templates/ModalEmpty.hbs'];

	var view = Parse.View.extend({
		tagName: "div",
		className: "ScrapyIOmodal ScrapyIOfade",
		attributes:{
			tabindex: "-1",
			style: "display: block;",
			role: "dialog",
			"aria-hidden": "true",
			"aria-labelledby": "ScrapyIOSaveModalView"
		},
		events:{
			'click .ScrapyIOcancelModal': 'closeModal'
		},
		initialize: function() {
			_.bindAll(this, 'closeModal');
		},	
		render: function() {
			var modelData = this.model.toJSON();

			if (!modelData.regex) modelData.regex = window.location.href;
			if (modelData.selectors && _.isObject(modelData.selectors)) {
				var dataList = [];
				_.keys(modelData.selectors).forEach(function(title){
					var jqSel = modelData.selectors[title];
					dataList.push({
						name: title,
						actualValue: $(jqSel).text() 
					});
				});
				console.log(dataList);
				modelData.dataList = dataList;
			}

			this.$el.html(template(modelData));
			this.$el.modal();

			return this;
		},
		closeModal: function() {
			this.$el.modal('hide');
			this.$el.data('modal', null);
			return this;
		}
	});



	return view;



});