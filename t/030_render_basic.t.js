StartTest(function(t) {
    
    t.plan(9)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin.Template', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin.Template, "Shotenjin.Template is here")

        
        var tenjin = new Shotenjin.Template()        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - empty template')
        
        t.ok(!tenjin.isCompiled, "Template isn't compiled yet")
        
        tenjin.setSources('')
        
        
        t.ok(tenjin.render() == '', 'Empty template was rendered correctly')
        
        t.ok(tenjin.isCompiled, "Template was compiled yet")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - mostly whitespace template')
        
        tenjin.setSources("    foo  'bar'     \n\n   baz <tag/>   \n\n")
        
        t.ok(!tenjin.isCompiled, "Template isn't compiled after changing source")
        
        
        t.ok(tenjin.render() == "    foo  'bar'     \n\n   baz <tag/>   \n\n", 'Whitespace generally bypassed unmodified, except trimming')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - escaped expression')
        
        tenjin.setSources("[% name[1] %]\n")
        
        t.ok(tenjin.render({ name : [ 'tenjin', '<"shotenjin">'] }) == "&lt;&quot;shotenjin&quot;&gt;\n", 'Variables was correctly expanded from stash, whitespace was ignored, escaping occured')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - unescaped expression')
        
        tenjin.setSources("[%= name[1] %]\n")
        
        t.ok(tenjin.render({ name : [ 'tenjin', '<"shotenjin">'] }) == '<"shotenjin">\n', 'Variables was correctly expanded from stash, whitespace was ignored, no escaping occured')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - statements')

        var tenjin = new Shotenjin.Template({
            /*tj
            
                [%\ Joose.A.each(arr, function (value, index) { %]
                 
                    [% "index: [" + index + "], value: [" + value + "]" %]
                [%\ }) %]
            tj*/
        })        
        
        t.ok(tenjin.render({ arr : [ 'foo', 'bar' ] }) == 'index: [0], value: [foo]\nindex: [1], value: [bar]\n', 'Code-based template was processed correctly, newline after statemets ate')
        

        t.endAsync(async0)
    })
    
})    
