StartTest(function(t) {
    
	t.plan(6)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin.Joosed.Template', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin.Joosed.Template, "Shotenjin.Joosed.Template is here")
        
        
        var tenjin = new Shotenjin.Joosed.Template()        
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - empty template')
        
        var parsed = tenjin.parse('')
        
        t.ok(parsed == 'var __a = (function (stash) { this.startContext(); eval(this.expandStashToVarsCode(stash)); ; return this.endContext(); }); __a', 'Empty template was parsed correctly')

        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - mostly whitespace template')
        
        parsed = tenjin.parse("    foo  'bar'     \n   baz <tag/>   \n")
        
        t.ok(parsed == "var __a = (function (stash) { this.startContext(); eval(this.expandStashToVarsCode(stash)); ;__contexts[0].output.push('    foo  \\\'bar\\\'     \\n   baz <tag/>   \\n', \"\"); ; return this.endContext(); }); __a", 'White space was handled correctly + escaping works')
        
        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - escaped expression')
        
        parsed = tenjin.parse("[% name[1] %]")
        
        t.ok(parsed == "var __a = (function (stash) { this.startContext(); eval(this.expandStashToVarsCode(stash)); ;__contexts[0].output.push(__me.escapeXml( name[1] ), \"\"); ; return this.endContext(); }); __a", 'Escaped expression was parsed correctly')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - unescaped expression')

        parsed = tenjin.parse("[%= name %]")
        
        t.ok(parsed == "var __a = (function (stash) { this.startContext(); eval(this.expandStashToVarsCode(stash)); ;__contexts[0].output.push( name , \"\"); ; return this.endContext(); }); __a", 'Unescaped expression was parsed correctly')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - statements #1')
        
        parsed = tenjin.parse("[%\\ for(var i in stash) {\n this.someFunc(p1, p2)\n } %]")
        
        t.ok(parsed == 'var __a = (function (stash) { this.startContext(); eval(this.expandStashToVarsCode(stash));  for(var i in stash) {\n this.someFunc(p1, p2)\n } ; return this.endContext(); }); __a', 'Unescaped expression was parsed correctly')
        

        t.endAsync(async0)
    })
    
})    