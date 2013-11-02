define(['handlebars'], function(Handlebars) {

this["Templates"] = this["Templates"] || {};

this["Templates"]["app/scripts/views/templates/Modal.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n          <div class=\"ScrapyIOattributeRow\">\n            <b>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</b><a href=\"\" class=\"ScrapyIOdeleteAttribute\" data-attribute=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.dataList),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Remove</a> <span style=\"float: right;\">\"<i>";
  if (stack2 = helpers.actualValue) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.actualValue; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</i>\"</span>\n            <div style=\"clear: both;\"></div>\n          </div>\n        ";
  return buffer;
  }

  buffer += "<div class=\"ScrapyIOmodal-dialog\">\n  <div class=\"ScrapyIOmodal-content\">\n    <div class=\"ScrapyIOmodal-header\">\n      <h1 class=\"ScrapyIOmodal-title\">Your crawler</h1>\n    </div>\n    <div class=\"ScrapyIOmodal-body\">\n      <p>\n        <h3>You have selected <b>"
    + escapeExpression(((stack1 = ((stack1 = depth0.dataList),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b> things to be scraped.</h3>\n        ";
  stack2 = helpers.each.call(depth0, depth0.dataList, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "  \n\n        <hr>\n\n        <h3>This scraper is going to match:</h3>\n        <div><input type=\"text\" value=\"";
  if (stack2 = helpers.regex) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.regex; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"ScrapyIOinputForm\" /></div>\n\n      </p>\n    </div>\n    <div class=\"ScrapyIOmodal-footer\">\n      <button type=\"button\" class=\"btn btn-default ScrapyIOcancelModal\" data-dismiss=\"ScrapyIOmodal\">Cancel</button>\n      <button type=\"button\" class=\"btn btn-primary\">Save changes</button>\n    </div>\n  </div><!-- /.modal-content -->\n</div><!-- /.modal-dialog -->";
  return buffer;
  });

this["Templates"]["app/scripts/views/templates/ModalEmpty.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"ScrapyIOmodal-dialog\">\n  <div class=\"ScrapyIOmodal-content\">\n    <div class=\"ScrapyIOmodal-header\">\n      <h4 class=\"ScrapyIOmodal-title\">Your crawler</h4>\n    </div>\n    <div class=\"ScrapyIOmodal-body\">\n      <p>You haven't added any data to scrape for this website.</p>\n    </div>\n    <div class=\"ScrapyIOmodal-footer\">\n      <button type=\"button\" class=\"btn btn-default ScrapyIOcancelModal\" data-dismiss=\"ScrapyIOmodal\">Cancel</button>\n      <button type=\"button\" class=\"btn btn-primary\">Save changes</button>\n    </div>\n  </div><!-- /.modal-content -->\n</div><!-- /.modal-dialog -->";
  });

return this["Templates"];

});