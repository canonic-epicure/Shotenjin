StartTest(function(t) {
    
	t.plan(12)
    
    var async0 = t.beginAsync()
    
    use('JooseX.CPS.Continuation', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS.Continuation, "JooseX.CPS.Continuation is here")
        

        //======================================================================================================================================================================================================================================================
        t.diag('Instantiation')
        
        var cont = new JooseX.CPS.Continuation()
        
        t.ok(cont, "'JooseX.CPS.Continuation' was instantiated")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('CPS calls, desugared')
        

        //======================================================================================================================================================================================================================================================            
        t.diag('Simplest call')

        var async1 = t.beginAsync()
        
        cont.TRY(function (p1, p2) {
            
            t.pass('TRY was reached')
            
            t.ok(this == Joose.top, 'Scope was defaulted to global scope')
            t.ok(p1 == 1 && p2 == 10, 'Correct parameters were passed')
            
            this.CONT.CONTINUE('value')
            
        }, null, [ 1, 10 ]).THEN(function (res) {
            
            t.pass('THEN was reached')
            
            t.ok(res == 'value', "Next received correct return value")
            
            this.CONT.CONTINUE()
            
            t.endAsync(async1)
            
        }).NOW()
        
        
        
        //======================================================================================================================================================================================================================================================            
        //t.diag('Simple successfull call')
        
        var async2  = t.beginAsync()
        var cont2   = new JooseX.CPS.Continuation()
        var scope2  = {}

        
        cont2.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('Simple call - TRY')
            
            t.ok(this == scope2, "Scope was correctly passed into 'TRY'")
            
            t.ok(this.CONT.parent == cont2, "Current continuation is nested into 'cont2'")
            
            var CONTINUE = this.CONT.getCONTINUE()
            
            setTimeout(function () {
                CONTINUE('returnTo')
            }, 10)

            
        }, scope2).THEN(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('Simple call - NEXT')
            
            t.ok(this == scope2, "Scope was correctly propagated to 'NEXT'")
            
            t.ok(this.RESULT == 'returnTo', 'NEXT was reached with the correct RESULT')
            
            t.endAsync(async2)
        }).NOW()

        
        
        //======================================================================================================================================================================================================================================================            
        //t.diag('Call without CONTINUE')
        
        var async3  = t.beginAsync()
        var cont3   = new JooseX.CPS.Continuation()
        
        var thenReached = false
        
        cont3.TRY(function () {
            
        }, {}).THEN(function () {
            
            thenReached = true
        })

        setTimeout(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('Call without CONTINUE')
        
            t.ok(!thenReached, 'NEXT section was not reached without CONTINUE')
            
            t.endAsync(async3)
        }, 100)

        
        t.endAsync(async0)
    })
    
})    