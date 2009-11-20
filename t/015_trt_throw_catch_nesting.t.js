StartTest(function(t) {
    
	t.plan(8)
    
    var async0 = t.beginAsync()
    
    use('JooseX.CPS.Continuation', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS.Continuation, "JooseX.CPS.Continuation is here")
        

        //======================================================================================================================================================================================================================================================
        //t.diag('THROW from nested TRY')

        var async1  = t.beginAsync()
        var cont1   = new JooseX.CPS.Continuation()
        
        cont1.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('THROW with NEXT')
            
            
            this.CONT.TRY(function () {
                
                throw 'error1'
                
            }).NOW()
            
            
        }, {}).CATCH(function (e) {
            
            t.ok(e == 'error1', "Error thrown from nested 'TRY' was caught correctly")
            
            this.CONT.CONTINUE()
            
        }).NEXT(function () {
            
            t.pass("'NEXT' was reached")
            
            t.endAsync(async1)
        })

        
        
        //======================================================================================================================================================================================================================================================
        //t.diag('Nested THROW/CATCH #1')

        var async2  = t.beginAsync()
        var cont2   = new JooseX.CPS.Continuation()
        
        cont2.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('Nested THROW/CATCH #1')
            
            
            this.CONT.TRY(function () {
                
                throw 'error2'
                
            }).CATCH(function (e) {
            
                t.ok(e == 'error2', "Innermost throw was caught correctly")
                
                throw 'error22'
                
            }).NOW()
            
            
        }, {}).CATCH(function (e) {
            
            t.ok(e == 'error22', "Error thrown from 'CATCH' was caught correctly")
            
            this.CONT.CONTINUE()
            
        }).NEXT(function () {
            
            t.pass("'NEXT' was reached")
            
            t.endAsync(async2)
        })
        
        
        //======================================================================================================================================================================================================================================================
        //t.diag('Nested THROW/CATCH #2')

        var async3  = t.beginAsync()
        var cont3   = new JooseX.CPS.Continuation()
        
        cont3.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('Nested THROW/CATCH #2')
            
            
            this.CONT.TRY(function () {
                
                this.CONT.THROW('error3')
                
            }).CATCH(function (e) {
            
                t.ok(e == 'error3', "Innermost 'THROW' was caught correctly")
                
                this.CONT.CONTINUE('recover3')
                
            }).NOW()
            
            
        }, {}).CATCH(function (e) {
            
            t.fail("'CATCH' for handled exception was reached")
            
            this.CONT.CONTINUE()
            
        }).NEXT(function (res) {
            
            t.ok(res == 'recover3', "Control flow after handled exception is correct")
            
            t.endAsync(async3)
        })

        
        t.endAsync(async0)
    })
    
})    