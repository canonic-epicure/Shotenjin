load('tenjin.js');

///
/// message catalog to translate message
///
var MESSAGE_CATALOG = {
  en: { 'Hello'    : 'Hello',
        'Good bye' : 'Good bye' },
  fr: { 'Hello'    : 'Bonjour',
        'Good bye' : 'Au revoir' }
};

function translation_func(lang) {
    var f = function(message_key) {
        var dict = MESSAGE_CATALOG[lang] || {};
	return dict[message_key] || message_key;
    };
    return f;
}


///
/// engine class which supports M17N
///
var M17NEngine = function(properties) {
    Tenjin.Engine.call(this, properties);
    if (properties.lang)
        this.lang = properties.lang;
};

M17NEngine.prototype = new Tenjin.Engine();

M17NEngine.prototype.lang = 'en';       // default language

/// change cache flename to 'file.html.lang.cache'
M17NEngine.prototype.cachename = function(filename) {
    return filename+'.'+this.lang+'.cache';
};

/// set translation function to context object
M17NEngine.prototype.hookContext = function(context) {
    context = Tenjin.Engine.prototype.hookContext(context);
    context._ = translation_func(this.lang);  // set _() to context
    return context;
};


///
/// test program
///
var template_name = 'ex7-m18n.jshtml';
var context = { username: 'World' };

/// engine for english
var engine = new M17NEngine({preprocess:true, cache:true});
var output = engine.render(template_name, context);   // same template
print("--- lang:", engine.lang, "---");
print(output);

/// engine for French
var engine = new M17NEngine({preprocess:true, cache:true, lang:'fr'});
var output = engine.render(template_name, context);   // same template
print("--- lang:", engine.lang, "---");
print(output);
