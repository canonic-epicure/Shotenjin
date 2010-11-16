/// create engine
load('../../../../lib/tenjin.js');
var engine = new Tenjin.Engine({ postfix: '.jshtml', preprocess: true });

/// render template with context data
var params = { id: 1234, name: 'Foo', lang: 'ch' };
var context = { params: params };
var output = engine.render(':select', context);
print(output);
