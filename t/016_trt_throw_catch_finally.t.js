StartTest(function(t) {
    
	t.plan(29)
    
    var async0 = t.beginAsync()
    
    use('JooseX.CPS.Continuation', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS.Continuation, "JooseX.CPS.Continuation is here")
        

        //======================================================================================================================================================================================================================================================
        //t.diag('THROW from nested TRY')

        var async1  = t.beginAsync()
        var cont1   = new JooseX.CPS.Continuation()
        
        var finally1Reached = false
        var finally2Reached = false
        var catchReached    = false
        
        cont1.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('THROW from nested TRY')
            
            this.CONT.TRY(function () {
                
                throw 'error1'
                
            }).FINALLY(function () {
                
                finally1Reached = true
                
                t.pass("'FINALLY1' was reached #1")
                
                t.ok(!catchReached, "'CATCH' not yet reached")
                t.ok(!finally2Reached, "'FINALLY2' not yet reached")
                
                this.CONT.CONTINUE()
                
            }).NOW()
            
        }, {}).CATCH(function (e) {
            
            catchReached = true
            
            t.ok(e == 'error1', "Error thrown from nested 'TRY' was caught correctly")
            
            t.ok(!finally2Reached, "'FINALLY2' not yet reached")
            
            this.CONT.CONTINUE()
            
        }).FINALLY(function () {
            
            finally2Reached = true
                
            t.pass("'FINALLY' was reached #2")
            
            t.ok(catchReached, "'CATCH' was reached")
            t.ok(finally1Reached, "'FINALLY1' was reached")
            
            this.CONT.CONTINUE()
            
        }).NEXT(function () {
            
            t.pass("'NEXT' was reached")
            
            t.endAsync(async1)
        })

        
        
        //======================================================================================================================================================================================================================================================
        //t.diag('THROW from FINALLY')

        var async11  = t.beginAsync()
        var cont11   = new JooseX.CPS.Continuation()
        
        var finally11Reached = false
        var finally22Reached = false
        var catch11Reached    = false
        
        cont11.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('THROW from nested TRY')
            
            this.CONT.TRY(function () {
                
                throw 'error11'
                
            }).FINALLY(function () {
                
                finally11Reached = true
                
                t.pass("'FINALLY11' was reached #1")
                
                t.ok(!catch11Reached, "'CATCH' not yet reached")
                t.ok(!finally22Reached, "'FINALLY22' not yet reached")
                
                throw 'error22'
                
            }).NOW()
            
        }, {}).CATCH(function (e) {
            
            catch11Reached = true
            
            t.ok(e == 'error22', "Caught exception is from FINALLY")
            
            t.ok(!finally22Reached, "'FINALLY2' not yet reached")
            
            this.CONT.CONTINUE()
            
        }).FINALLY(function () {
            
            finally22Reached = true
                
            t.pass("'FINALLY' was reached #2")
            
            t.ok(catch11Reached, "'CATCH' was reached")
            t.ok(finally11Reached, "'FINALLY11' was reached")
            
            this.CONT.CONTINUE()
            
        }).NEXT(function () {
            
            t.pass("Outer 'NEXT' was reached")
            
            t.endAsync(async11)
        })
        
        
        
        //======================================================================================================================================================================================================================================================
        //t.diag('THROW from CATCH')

        var async111  = t.beginAsync()
        var cont111   = new JooseX.CPS.Continuation()
        
        var catch111Reached   = false
        var catch222Reached   = false
        var finally222Reached = false
        
        cont111.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('THROW from CATCH')
            
            this.CONT.TRY(function () {
                
                throw 'error111'
                
            }).CATCH(function (e) {
                
                catch111Reached = true
                
                t.pass("'CATCH111' was reached #1")
                
                t.ok(e == 'error111', "Caught correct exception")
                
                t.ok(!catch222Reached, "'CATCH222' not yet reached")
                t.ok(!finally222Reached, "'FINALLY222' not yet reached")
                
                this.CONT.THROW('error222')
                
            }).NOW()
            
        }, {}).CATCH(function (e) {
            
            catch222Reached = true
            
            t.ok(e == 'error222', "Caught exception is from inner CATCH")
            
            t.ok(!finally222Reached, "'FINALLY222' not yet reached")
            
            this.CONT.CONTINUE()
            
        }).FINALLY(function () {
            
            finally222Reached = true
                
            t.pass("'FINALLY' was reached #2")
            
            t.ok(catch111Reached, "'CATCH111' was reached")
            t.ok(catch222Reached, "'CATCH222' was reached")
            
            this.CONT.CONTINUE()
            
        }).NEXT(function () {
            
            t.pass("Outer 'NEXT' was reached")
            
            t.endAsync(async111)
        })

        
        t.endAsync(async0)
    })
    
})    