StartTest(function(t) {
    
	t.plan(13)
    
    var async0 = t.beginAsync()
    
    use('JooseX.CPS.Continuation', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS.Continuation, "JooseX.CPS.Continuation is here")
        

        //======================================================================================================================================================================================================================================================
        //t.diag('Call with THROW/CATCH - simple error')

        var async1  = t.beginAsync()
        var cont1   = new JooseX.CPS.Continuation()
        var scope1  = {}

        
        cont1.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('Call with THROW/CATCH - simple error')
            
            this.CONT.THROW('error1')
            
        }, scope1).THEN(function () {
            
            t.fail("'THEN' was reached after exception")
            
        }).CATCH(function (e) {
            
            t.ok(this == scope1, "'CATCH' scope was copied from 'TRY'")
            
            t.ok(e == 'error1', "Error thrown via 'THROW' was caught")
            
            t.endAsync(async1)
            
            this.CONT.CONTINUE()
            
        }).FINALLY(function () {
            
            t.pass("'FINALLY' was reached")
            
            t.ok(this == scope1, "'FINALLY' scope was copied from 'TRY'")
            
            this.CONT.CONTINUE()
            
        }).NOW()



        //======================================================================================================================================================================================================================================================
        //t.diag('Call with THROW/CATCH - no error, plus FINALLY')

        var async15  = t.beginAsync()
        var cont15   = new JooseX.CPS.Continuation()
        var scope15  = {}

        cont15.TRY(function () {
            
            this.CONT.CONTINUE()
            
        }, {}).CATCH(function (e) {
            
            t.fail("'CATCH' was reached without 'THROW'")
            
            this.CONT.CONTINUE()
            
        }).FINALLY(function () {
            
            t.pass("'FINALLY' was reached")
            
            t.ok(this == scope15, "'FINALLY' scope was copied from arguments")
            
            t.endAsync(async15)
            
            this.CONT.CONTINUE()
            
        }, scope15).NOW()

        
        
        //======================================================================================================================================================================================================================================================
        //t.diag('Call with THROW/CATCH - native exceptions, THROW from THEN')

        var async2  = t.beginAsync()
        var cont2   = new JooseX.CPS.Continuation()
        var scope2  = {}

        
        cont2.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('Call with THROW/CATCH - native exceptions')
            
            t.pass("Initial 'TRY' was reached")
            
            this.CONT.CONTINUE()
            
        }).THEN(function () {
            
            throw 'error2'
            
            t.fail("Reached code after 'THROW'")
            
        }, {}).CATCH(function (e) {
            
            t.ok(this == scope2, "'CATCH' scope was taken from arguments")
            
            t.ok(e == 'error2', "Error thrown via native 'throw' was caught correctly")
            
            t.endAsync(async2)
            
            this.CONT.CONTINUE()
            
        }, scope2).NOW()
        
        
        
        //======================================================================================================================================================================================================================================================
        //t.diag('THROW with NEXT')

        var async3  = t.beginAsync()
        var cont3   = new JooseX.CPS.Continuation()
        
        cont3.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('THROW with NEXT')
            
            throw 'error3'
            
            t.fail("Reached code after 'THROW'")
            
        }, {}).CATCH(function (e) {
            
            t.ok(e == 'error3', "Error thrown via native 'throw' was caught correctly")
            
            this.CONT.CONTINUE()
            
        }).FINALLY(function () {
            
            t.pass("'FINALLY' was reached")
            
            this.CONT.CONTINUE()
            
        }).NEXT(function () {
            
            t.pass("'NEXT' was reached")
            
            t.endAsync(async3)
        })

        
        t.endAsync(async0)
    })
    
})    