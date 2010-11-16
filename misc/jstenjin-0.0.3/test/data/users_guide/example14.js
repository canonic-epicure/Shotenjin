//// template file
var filename = 'example14.jshtml';

//// convert into js code
load('tenjin.js');
var template = new Tenjin.Template(filename);
var script = template.script;
//// or
// var template = new Tenjin.Template();
// var script = template.convert_file(filename);
//// or
// var template = new Tenjin.Template();
// var input = Tenjin.Util.readFile(filename);
// var script = template.convert(input, filename);  # filename is optional

//// show converted js code
print("---- js code ----");
print(script);

//// evaluate js code
var context = {title:'jsTenjin Example', items:['<AAA>','B&B','"CCC"']};
var output = template.render(context);
print("---- output ----");
print(output);
