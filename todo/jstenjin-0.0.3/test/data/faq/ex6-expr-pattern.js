load('tenjin.js');

var MyTemplate = function(properties) {
    Tenjin.Template.call(this, properties);
}

MyTemplate.prototype = new Tenjin.Template();

// embedded expression pattern
MyTemplate.prototype.expressionPattern = /([$#])\{(.*?)\}|<%=((.|\n)*?)%>/g;

// return expression string and flag whether escape or not from matched object
MyTemplate.prototype.getExpressionAndEscapeflag = function(matched) {
    var expr, escapeflag;
    if (matched[1]) {
        expr = matched[2];
	escapeflag = matched[1] == '$';
    }
    else {
        expr = matched[3];
	escapeflag = false;
    }
    return [expr, escapeflag];
};

// test program
var context = { value: 'AAA&BBB' };
var engine = new Tenjin.Engine({templateclass: MyTemplate});
var output = engine.render('ex6-expr-pattern.jshtml', context);
print(output);
