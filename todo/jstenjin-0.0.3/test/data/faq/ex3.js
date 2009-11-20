load('tenjin.js');
var engine = new Tenjin.Engine({escapefunc:'.escapeHTML'});
var template = engine.getTemplate('ex3.jshtml');
print(template.script);
