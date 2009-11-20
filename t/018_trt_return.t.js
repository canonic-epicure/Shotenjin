StartTest(function(t) {
    
	t.plan(6)
    
    var async0 = t.beginAsync()
    
    use('JooseX.CPS.Continuation', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS.Continuation, "JooseX.CPS.Continuation is here")
        
        
        //======================================================================================================================================================================================================================================================            
        //t.diag('Nesting with RETURN')
        
        var async1  = t.beginAsync()
        var cont1   = new JooseX.CPS.Continuation()
        var scope1  = {}
        
        cont1.TRY(function () {
            
            this.CONT.RETURN('return1')
            
        }, scope1).THEN(function () {
            
            t.fail("'THEN' reached after 'RETURN'")
            
        }).NEXT(function (res) {
            
            t.pass("'NEXT' reached after 'RETURN'")
            
            t.ok(res == 'return1', "'NEXT' received correct result")
            
            
            this.CONT.TRY(function () {
                
                t.pass("Nested 'TRY' reached")
                
                this.CONT.RETURN('return2')
                
            }).NOW()
            
        }).THEN(function (res) {
            
            t.pass("OUTER 'THEN' reached after 'RETURN' from nested 'TRY'")
            
            t.ok(res == 'return2', "'THEN' received correct result")
            
            t.endAsync(async1)
        })
        
        
        t.endAsync(async0)
    })
    
})    