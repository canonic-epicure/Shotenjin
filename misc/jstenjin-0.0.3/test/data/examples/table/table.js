/// create Engine object
load('../../../../lib/tenjin.js');
var engine = new Tenjin.Engine()

/// render template with context data
var context = { title: 'Bordered Table Example',
                items: [ '<AAA>', 'B&B', '"CCC"' ] };
var output = engine.render('table.jshtml', context);
print(output);
