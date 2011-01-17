var Harness
var isNode        = typeof process != 'undefined' && process.pid

if (isNode) {
    require('Task/Test/Run/NodeJSBundle')
    
    Harness = Test.Run.Harness.NodeJS
} else 
    Harness = Test.Run.Harness.Browser.ExtJS
        
    
var INC = (isNode ? require.paths : []).concat('../lib', '/jsan')


Harness.configure({
    title : 'Shotenjin Test Suite',
    
    preload : [
        "jsan:Task.Joose.Core",
        "jsan:Task.JooseX.Attribute.Bootstrap",
        "jsan:Task.JooseX.Namespace.Depended.Auto",
        {
            text : "use.paths = " + Harness.prepareINC(INC)
        }
    ]
})


Harness.start(
    '010_helpers.t.js',
    '020_parsing_base.t.js',
    '030_render_basic.t.js',
    
    '050_embedded_into_class.t.js',
    '060_integral.t.js',
    '061_helper.t.js',
    '070_capturing.t.js',
    '080_wrapping.t.js'
)



