StartTest(function(t) {
    
	t.plan(7)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin.Joosed', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin.Joosed.my, "Shotenjin.Joosed.my is here")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Instantiation')
        
        Template('Test', {
            
            meta : Shotenjin.Joosed,
            
            template : ''
        })
        
        t.ok(Test, "'Template' class was succesfully created")
        

        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - splitAndProcess')
        
        var res = []
        
        Test.meta.splitAndProcess(res, /tag((?:.|\n)+?)tag/g, '00000\n0000tag1111\n1111tag\n0000tag1111tag\n', 
            
            function (res, whitespace) { 
                res.push('{' + whitespace + '}')
            },
            
            function (res, match) { 
                res.push('[' + match[1] + ']')
            }
        )
        
        t.ok(res[0] == '{00000\n0000}', 'Whitespace #1 was processed correctly')
        t.ok(res[1] == '[1111\n1111]', 'Match #1 was processed correctly')
        t.ok(res[2] == '{\n0000}', 'Whitespace #2 was processed correctly')
        t.ok(res[3] == '[1111]', 'Match #2 was processed correctly')
        t.ok(res[4] == '{\n}', 'Trailing \\n was processed as whitespace')

        
        t.endAsync(async0)
    })
    
})    