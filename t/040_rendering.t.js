StartTest(function(t) {
    
    t.plan(1)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin.Joosed', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin.Joosed, "Shotenjin.Joosed is here")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Instantiation')
        
        Template('Test', {
            meta : Shotenjin.Joosed,
            
            template : ''
        })
        
        t.ok(Test, "'Template' class was succesfully created")
        

        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - empty template')
        
        t.ok(new Test == '', 'Empty template was rendered correctly #1')
        t.ok(Test.my.render() == '', 'Empty template was rendered correctly #2')
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - mostly whitespace template')
        
        Test.meta.extend({
            template : "    foo  'bar'     \n   baz <tag/>   \n"
        })
        
        t.ok(new Test == "foo  'bar'\nbaz <tag/>\n", 'Whitespace generally bypassed unmodified, except trimming')
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - escaped expression')
        
        Test.meta.extend({
            template : "[% name[1] %]"
        })
        
        t.ok(new Test({ name : [ 'tenjin', '<"shotenjin">'] }) == "&lt;&quot;shotenjin&quot;&gt;", 'Variables was correctly expanded from stash, whitespace was ignored, escaping occured')
        

        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - unescaped expression')
        
        Test.meta.extend({
            template : "[%= name[1] %]"
        })
        
        t.ok(new Test({ name : [ 'tenjin', '<"shotenjin">'] }) == '<"shotenjin">', 'Variables was correctly expanded from stash, whitespace was ignored, no escaping occured')

        
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
        
        var res = new Test({ name1 : 'value1', name2 : 'value2' })
        
        console.log(res)
        
        t.ok(new Test({ name1 : 'value1', name2 : 'value2' }) == 'name: [name1], value: [value1]\nname: [name2], value: [value2]\n', 'Code-based template was processed correctly')


        t.endAsync(async0)
    })
    
})    