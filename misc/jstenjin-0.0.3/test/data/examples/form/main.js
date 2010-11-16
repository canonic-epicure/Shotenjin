/// create Engine object
load('../../../../lib/tenjin.js');
var engine = new Tenjin.Engine({postfix:'.jshtml', layout:'layout.jshtml'});

/// render template with context data
var params = { name:'Foo', gender:'M' };
var context = { params:params };
var output = engine.render(':update', context);  // ':update' == 'update'+postfix
print(output);
