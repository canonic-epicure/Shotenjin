StartTest(function(t) {
    
	t.plan(7)
    
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
        t.diag('Parsing - empty template')
        
        var parsed = Test.meta.parse('')
        
        t.ok(parsed == '(function (stash) { var _output = []; var _me = this; eval(this.meta.expandStashToVarsCode(stash)); ; return _output.join(""); })', 'Empty template was parsed correctly')


        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - mostly whitespace template')
        
        parsed = Test.meta.parse("    foo  'bar'     \n   baz <tag/>   \n")
        
        t.ok(parsed == "(function (stash) { var _output = []; var _me = this; eval(this.meta.expandStashToVarsCode(stash)); ;_output.push('foo  \\\'bar\\\'\\nbaz <tag/>\\n', \"\"); ; return _output.join(\"\"); })", 'White space was handled correctly + escaping works')
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - escaped expression')
        
        parsed = Test.meta.parse("[% name[1] %]")
        
        t.ok(parsed == "(function (stash) { var _output = []; var _me = this; eval(this.meta.expandStashToVarsCode(stash)); ;_output.push(_me.escape( name[1] ), \"\"); ; return _output.join(\"\"); })", 'Escaped expression was parsed correctly')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - unescaped expression')

        parsed = Test.meta.parse("[%= name %]")
        
        t.ok(parsed == "(function (stash) { var _output = []; var _me = this; eval(this.meta.expandStashToVarsCode(stash)); ;_output.push( name , \"\"); ; return _output.join(\"\"); })", 'Unescaped expression was parsed correctly')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - statements #1')
        
        parsed = Test.meta.parse("[%\\ for(var i in stash) {\n this.someFunc(p1, p2)\n } %]")
        
        t.ok(parsed == '(function (stash) { var _output = []; var _me = this; eval(this.meta.expandStashToVarsCode(stash));  for(var i in stash) {\nthis.someFunc(p1, p2)\n} ; return _output.join(""); })', 'Unescaped expression was parsed correctly')
        

        t.endAsync(async0)
    })
    
})    