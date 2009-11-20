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
        t.diag('Parsing - empty template')
        
        var parsed = Test.meta.parse('')
        
        t.ok(parsed == '(function (stash) { var output = []; eval(this.meta.expandStashToVarsCode()); return output.join(""); })', 'Empty template was parsed correctly')


        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - mostly whitespace template')
        
        parsed = Test.meta.parse("    foo  'bar'     \n   baz <tag/>   \n")
        
        t.ok(parsed == "(function (stash) { var output = []; eval(this.meta.expandStashToVarsCode()); output.push('foo  \\\'bar\\\'\\nbaz <tag/>\\n', \"\"); return output.join(\"\"); })", 'White space was handled correctly + escaping works')
        
        
        t.endAsync(async0)
    })
    
})    