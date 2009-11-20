StartTest(function(t) {
    
	t.plan(12)
    
    var async0 = t.beginAsync()
    
    use('JooseX.CPS.Continuation', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS.Continuation, "JooseX.CPS.Continuation is here")
        
        
        var xhrRequest = function (params) {
            
            setTimeout(function () {
                if (params.error)
                    params.errback.call(params.scope || Joose.top, params.value1 || 'value1', params.value2 || 'value2', params)
                else
                    params.callback.call(params.scope || Joose.top, params.value1 || 'value1', params.value2 || 'value2', params)
            }, 5)
        }
        
        
        //======================================================================================================================================================================================================================================================            
        t.diag('Try/Return/Then used as usual errbacks')
        
        var async1  = t.beginAsync()
        
        var cont1   = new JooseX.CPS.Continuation()
        var scope1  = {}
        var scope2  = {}
        
        cont1.TRY(function () {
            
            t.ok(this == scope1, "Scope was correctly passed into 'TRY'")
            
            xhrRequest({
                error       : true,
                errback     : this.CONT.getTHROW(),
                scope       : scope2
            })
            
        }, scope1).CATCH(function (result1, result2, params) {
            //======================================================================================================================================================================================================================================================            
            t.diag('Try/Return/Then used as usual errbacks - CATCH')
            
            t.ok(this == scope2, "Scope was correctly passed into 'CATCH'")
            
            t.ok(result1 == 'value1', 'Parameter for errback was passed to wrapper function #1')
            t.ok(result2 == 'value2', 'Parameter for errback was passed to wrapper function #2')
            t.ok(params.scope == scope2, 'Parameter for errback was passed to wrapper function #3')
            
            t.endAsync(async1)
            
            this.CONT.CONTINUE()
            
        }, scope2).NOW()

        
        
        //======================================================================================================================================================================================================================================================            
        t.diag('Try/Return/Then used as usual errbacks, chained & nested')
        
        var async3  = t.beginAsync()
        
        var cont3   = new JooseX.CPS.Continuation()
        
        var scope5  = {}
        
        cont3.TRY(function () {
            
            this.CONT.TRY(function () {
                
                xhrRequest({
                    error       : true,
                    errback     : this.CONT.getTHROW(),
                    value1      : 'yo'
                })
                
            }).CATCH(function (res1) {
                
                t.pass("Inner 'CATCH' reached")
                
                if (res1 == 'yo') 
                    this.CONT.THROW('foo')
                else
                    this.CONT.THROW('bar')
                
            }).NOW()
            
        }, scope5).CATCH(function (res) {
            
            t.ok(this == scope5, "Scope was correctly passed into outer 'CATCH'")
            t.ok(res == 'foo', "Control flow was correct")
            
            xhrRequest({
                callback    : this.CONT.getCONTINUE(),
                value2      : 'yo2'
            })
            
        }).NEXT(function (res1, res2, params) {
            
            t.ok(this == scope5, "Scope was correctly propagated")
            t.ok(res2 == 'yo2', "Correct arguments received")
            
            throw 'yo3'
            
        }).CATCH(function (e) {
            
            t.ok(e == 'yo3', "Caught correct exception")
            
            t.endAsync(async3)
        })
        
        
        t.endAsync(async0)
    })
    
})    