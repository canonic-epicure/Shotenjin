StartTest(function(t) {
    
	t.plan(4)
    
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
            
            this.CONT.CONTINUE()
            
        }, scope1).NEXT(function (res) {
            
            t.pass("'NEXT' reached after 'TRY'")
            
            this.CONT.CONTINUE('return2')
            
        }).THEN(function (res) {
            
            t.pass("'THEN' reached after 'CONTINUE' from 'NEXT'")
            
            t.ok(res == 'return2', "'THEN' received correct result")
            
            t.endAsync(async1)
        })
        
        
        t.endAsync(async0)
    })
    
})    