StartTest(function(t) {
    
	t.plan(14)
    
    var async0 = t.beginAsync()
	
    use('JooseX.CPS', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS, "JooseX.CPS is here")
        t.ok(JooseX.CPS.Builder, "JooseX.CPS.Builder is here")
        t.ok(JooseX.CPS.Continuation, "JooseX.CPS.Continuation is here")

        //======================================================================================================================================================================================================================================================
        t.diag('Class creation')
        
        Class('CPS.Enabled', {
            
            trait : JooseX.CPS,
            
            continued : {
                
                methods : {
                    
                    checkEven : function (param1, param2) {
                        
                        var cont        = this.getCONTINUE()
                        var my_throw    = this.getTHROW()
                        
                        setTimeout(function () {
                            if ((param1 + param2) % 2 == 0) 
                                cont('even')
                            else
                                my_throw('odd')
                        }, 1)
                    }
                }
            }
        
        })
        
        t.ok(CPS.Enabled, 'CPS.Enabled class was created')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Class instantiation')
        
        var cps = new CPS.Enabled()
        
        t.ok(cps, "'CPS.Enabled' class was instantiated")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Basic method call - with error')
        
        var async1 = t.beginAsync()
        
        var res1 = cps.checkEven(1, 10)
        
        t.ok(res1 instanceof JooseX.CPS.Continuation, "Continued methods returned an instance of 'JooseX.CPS.Continuation'")
        
        res1.THEN(function () {
            
            t.fail("'THEN' was reached in presense of error")
            
        }).CATCH(function (e) {
            t.ok(e == 'odd', 'Odd sum was detected')
            
            this.CONTINUE('recover')
            
        }).FINALLY(function () {
            
            t.pass("'FINALLY' was reached anyway #1")
            
            this.CONTINUE('finally')
            
        }).NEXT(function (res) {
            t.pass("'NEXT' was reached even in presense of error")
            
            t.ok(res == 'recover', 'NEXT received recovery value from CATCH, return value from FINALLY was ignored')
            
            t.endAsync(async1)
        })
        

        //======================================================================================================================================================================================================================================================
        t.diag('Basic method call - without error')
        
        var async2 = t.beginAsync()
        
        cps.checkEven(1, 11).THEN(function (res) {
            
            t.ok(res == 'even', 'Even sum was passed into THEN')
            
            t.pass("'THEN' was correctly reached")
            
            this.CONTINUE(res)
            
        }).CATCH(function (e) {
            
            t.fail("'CATCH' was reached in absense of error")
            
        }).FINALLY(function () {
            
            t.pass("'FINALLY' was reached anyway #2")
            
            this.CONTINUE()
            
        }).NEXT(function (res) {
            
            t.ok(res == 'even', 'Even sum was passed into THEN, return value from FINALLY was ignored')
            
            t.endAsync(async2)
        })
        
        
        t.endAsync(async0)
    })
    
})    