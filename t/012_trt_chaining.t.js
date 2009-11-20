StartTest(function(t) {
    
	t.plan(9)
    
    var async0 = t.beginAsync()
    
    use('JooseX.CPS.Continuation', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS.Continuation, "JooseX.CPS.Continuation is here")
        
        
        //======================================================================================================================================================================================================================================================            
        //t.diag('Chained NEXT')
        
        var async7  = t.beginAsync()
        var cont7   = new JooseX.CPS.Continuation()
        var scope7  = {}
        
        cont7.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('Chained NEXT - TRY')
            
            t.ok(this.CONT.parent == cont7, "Current continuation is nested into 'cont7'")
            
            t.ok(this == scope7, "Scope was correctly passed into 'TRY'")
            
            this.CONT.CONTINUE('result7')
            
        }, scope7)
        

        var cont9 = cont7.THEN(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('Chained NEXT - NEXT #1')
            
            t.ok(this.CONT.parent == cont9, "Current continuation is nested into 'cont9'")
            
            t.ok(this == scope7, "Scope was correctly propagated to 'NEXT'")
            
            t.ok(this.RESULT == 'result7', 'NEXT #1 was reached with the correct RESULT')
            
            this.CONT.CONTINUE('result7-2')
            
        })
        
        
        var cont11 = cont9.THEN(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('Chained NEXT - NEXT #2')
            
            t.ok(this.CONT.parent == cont11, "Current continuation is nested into 'cont11'")

            t.ok(this == scope7, "Scope was correctly propagated to 2nd 'NEXT'")
            
            t.ok(this.RESULT == 'result7-2', 'NEXT #2 was reached with the correct RESULT')
            
            t.endAsync(async7)
        })
        
        cont11.NOW()
        
        t.endAsync(async0)
    })
    
})    