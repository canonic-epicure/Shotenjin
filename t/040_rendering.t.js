StartTest(function(t) {
    
    t.plan(9)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin.Joosed.Template', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin.Joosed.Template, "Shotenjin.Joosed.Template is here")

        
        var tenjin = new Shotenjin.Joosed.Template()        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - empty template')
        
        t.ok(!tenjin.isCompiled, "Template isn't compiled yet")
        
        tenjin.setSources('')
        
        
        t.ok(tenjin.render() == '', 'Empty template was rendered correctly')
        
        t.ok(tenjin.isCompiled, "Template was compiled yet")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - mostly whitespace template')
        
        tenjin.setSources("    foo  'bar'     \n   baz <tag/>   \n")
        
        t.ok(!tenjin.isCompiled, "Template isn't compiled after changing source")
        
        
        t.ok(tenjin.render() == "foo  'bar'\nbaz <tag/>\n", 'Whitespace generally bypassed unmodified, except trimming')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - escaped expression')
        
        tenjin.setSources("[% name[1] %]")
        
        t.ok(tenjin.render({ name : [ 'tenjin', '<"shotenjin">'] }) == "&lt;&quot;shotenjin&quot;&gt;", 'Variables was correctly expanded from stash, whitespace was ignored, escaping occured')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - unescaped expression')
        
        tenjin.setSources("[%= name[1] %]")
        
        t.ok(tenjin.render({ name : [ 'tenjin', '<"shotenjin">'] }) == '<"shotenjin">', 'Variables was correctly expanded from stash, whitespace was ignored, no escaping occured')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - statements')
        
        tenjin.setSources(
            '[%\\\n' + 
            '    Joose.O.each(stash, function (value, name) {\n' + 
            '%]\n' + 
            '        [% "name: [" + name + "], value: [" + value + "]\\n" %]\n' + 
            '[%\\\n' + 
            '    })\n' + 
            '%]\n'
        )
        
        t.ok(tenjin.render({ name1 : 'value1', name2 : 'value2' }) == 'name: [name1], value: [value1]\nname: [name2], value: [value2]\n', 'Code-based template was processed correctly')


        t.endAsync(async0)
    })
    
})    