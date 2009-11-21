StartTest(function(t) {
    
    t.plan(17)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin.Joosed', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin.Joosed, "Shotenjin.Joosed is here")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Instantiation')
        
        Template('Test', {
            template : ''
        })
        
        t.ok(Test, "'Template' class was succesfully created")
        

        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - empty template')
        
        var tt = new Test()
        
        t.ok(new Test() == '', 'Empty template was rendered correctly #1')
        t.ok(Test.my.render() == '', 'Empty template was rendered correctly #2')
        t.ok(Test() == '', 'Empty template was rendered correctly #3')
        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - mostly whitespace template')
        
        Test.meta.extend({
            template : "    foo  'bar'     \n   baz <tag/>   \n"
        })
        
        t.ok(new Test() == "foo  'bar'\nbaz <tag/>\n", 'Whitespace generally bypassed unmodified, except trimming #1')
        t.ok(Test.my.render() == "foo  'bar'\nbaz <tag/>\n", 'Whitespace generally bypassed unmodified, except trimming #2')
        t.ok(Test() == "foo  'bar'\nbaz <tag/>\n", 'Whitespace generally bypassed unmodified, except trimming #3')
        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - escaped expression')
        
        Test.meta.extend({
            template : "[% name[1] %]"
        })
        
        t.ok(new Test({ name : [ 'tenjin', '<"shotenjin">'] }) == "&lt;&quot;shotenjin&quot;&gt;", 'Variables was correctly expanded from stash, whitespace was ignored, escaping occured #1')
        t.ok(Test.my.render({ name : [ 'tenjin', '<"shotenjin">'] }) == "&lt;&quot;shotenjin&quot;&gt;", 'Variables was correctly expanded from stash, whitespace was ignored, escaping occured #2')
        t.ok(Test({ name : [ 'tenjin', '<"shotenjin">'] }) == "&lt;&quot;shotenjin&quot;&gt;", 'Variables was correctly expanded from stash, whitespace was ignored, escaping occured #3')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - unescaped expression')
        
        Test.meta.extend({
            template : "[%= name[1] %]"
        })
        
        t.ok(new Test({ name : [ 'tenjin', '<"shotenjin">'] }) == '<"shotenjin">', 'Variables was correctly expanded from stash, whitespace was ignored, no escaping occured #1')
        t.ok(Test.my.render({ name : [ 'tenjin', '<"shotenjin">'] }) == '<"shotenjin">', 'Variables was correctly expanded from stash, whitespace was ignored, no escaping occured #2')
        t.ok(Test({ name : [ 'tenjin', '<"shotenjin">'] }) == '<"shotenjin">', 'Variables was correctly expanded from stash, whitespace was ignored, no escaping occured #3')
        
        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - statements')
        
        Test.meta.extend({
            template : 
                '[%\\\n' + 
                '    Joose.O.each(stash, function (value, name) {\n' + 
                '%]\n' + 
                '        [% "name: [" + name + "], value: [" + value + "]\\n" %]\n' + 
                '[%\\\n' + 
                '    })\n' + 
                '%]\n'
        })
        
        t.ok(new Test({ name1 : 'value1', name2 : 'value2' }) == 'name: [name1], value: [value1]\nname: [name2], value: [value2]\n', 'Code-based template was processed correctly #1')
        t.ok(Test.my.render({ name1 : 'value1', name2 : 'value2' }) == 'name: [name1], value: [value1]\nname: [name2], value: [value2]\n', 'Code-based template was processed correctly #2')
        t.ok(Test({ name1 : 'value1', name2 : 'value2' }) == 'name: [name1], value: [value1]\nname: [name2], value: [value2]\n', 'Code-based template was processed correctly #3')
        
        t.endAsync(async0)
    })
    
})    