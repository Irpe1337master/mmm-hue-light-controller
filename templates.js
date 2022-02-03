(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['group-list'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"hue-row\">\r\n\r\n    <div class=\"hue-card text-white\">\r\n      <div class=\"hue-card-body\">\r\n        <div class=\"hue-row\">\r\n          <div class=\"hue-column hue-text-left\">\r\n            <h5 class=\"hue-mx-0 color-gray\">Group</h5>\r\n            <h2 class=\"hue-mx-0\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":10,"column":33},"end":{"line":10,"column":43}}}) : helper)))
    + "</h2>\r\n          </div>\r\n          <div class=\"hue-column hue-col-2 align-center text-xl-right\">\r\n            <button class=\"hue-btn\" data-action=\"toggleGroupLights\" data-groupid=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":13,"column":82},"end":{"line":13,"column":90}}}) : helper)))
    + "\" data-islighton=\""
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"state") : depth0)) != null ? lookupProperty(stack1,"any_on") : stack1), depth0))
    + "\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"state") : depth0)) != null ? lookupProperty(stack1,"any_on") : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":14,"column":14},"end":{"line":18,"column":21}}})) != null ? stack1 : "")
    + "            </button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"hue-card-footer\">\r\n        <div class=\"hue-row\">\r\n          <div class=\"hue-column hue-px-0\">\r\n            <button class=\"hue-btn\"\r\n            data-action=\"changeGroupBrightness\"\r\n            data-groupid=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":28,"column":26},"end":{"line":28,"column":34}}}) : helper)))
    + "\"\r\n            data-brightness=\""
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"action") : depth0)) != null ? lookupProperty(stack1,"bri") : stack1), depth0))
    + "\"\r\n            value=\"-30\">\r\n            <span class=\"light-on-color\">-30</span>\r\n          </button>\r\n          <button class=\"hue-btn light-on-color\"\r\n          data-action=\"changeGroupBrightness\"\r\n          data-groupid=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":35,"column":24},"end":{"line":35,"column":32}}}) : helper)))
    + "\"\r\n          data-brightness=\""
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"action") : depth0)) != null ? lookupProperty(stack1,"bri") : stack1), depth0))
    + "\"\r\n          value=\"+30\">\r\n          <span class=\"light-on-color\">+30</span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "              <i class=\"icon-lg bi bi-lightbulb light-on-color\"></i>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "              <i class=\"icon-lg bi bi-lightbulb-off light-off-color\"></i>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"hue-container\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"groups") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":2},"end":{"line":46,"column":9}}})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true});
})();