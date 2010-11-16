load('tenjin.js');
var filename = 'example14.jshtml';
var template = new Tenjin.Template(filename, {escapefunc:'.escapeHTML'});
print(template.script);

String.prototype.escapeHTML = function() {
    return this.replace(/\&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
var title = 'jsTenjin Example';
var items = ['<foo>', '&bar', '"baz"'];
var output = template.render({title:title, items:items});
print(output);
