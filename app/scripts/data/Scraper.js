define(['libs/parse', 'libs/lodash'], function(Parse, _){


	var model = Parse.Object.extend({
		className: "Scraper"
	});


	var collection = Parse.Collection.extend({
		model: model
	})

	return {
		model: model,
		collection: collection,
		helpers: {
			getScrapersForUser: function(user) {
				var query = new Parse.Query(model);
				query.equalTo("user", user);
				query.descending("createdAt");
				return query.find({});
			},
			getScrapersForUserThatMatches: function(user, url) {
				return this.getScrapersForUser(user)
				.then(function(data){
					console.log(data);
					return _.filter(data, function(item){
						var regex = item.get('regex');
						regex = regex.replace("*", "(.*)");
						var regexObject = new RegExp(regex, "i");
						return regexObject.test(url);
					});	

				});
			}
		}
	}


});