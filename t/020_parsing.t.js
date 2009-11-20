StartTest(function(t) {
    
	t.plan(1)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin.Joosed', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin.Joosed.my, "Shotenjin.Joosed.my is here")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Instantiation')
        
        var tenjin = new Shotenjin.Joosed()
        
        t.ok(tenjin, "'Shotenjin.Joosed' was succesfully instantiated")
        

        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - splitAndProcess')
        
        var res = []
        
        tenjin.splitAndProcess(res, /tag((?:.|\n)+)tag/g, '00000\n0000tag1111\n1111tag\n0000tag1111tag\n', 
            
            function (res, whitespace) { 
                res.push('{' + whitespace + '}')
            },
            
            function (res, match) { 
                res.push('[' + match[1] + ']')
            }
        )
        
        t.ok(res[0] == '{00000\n0000}', 'Whitespace #1 was processed correctly')
        
        
        t.endAsync(async0)
    })
    
})    