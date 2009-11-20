StartTest(function(t) {
    
	t.plan(1)
    
    var async1 = t.beginAsync()
	
    use('JooseX.CPS', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS, "JooseX.CPS is here")
        

        //======================================================================================================================================================================================================================================================
        t.diag('Creation')
        
        Class('CPSEnabled', {
            
            trait : JooseX.CPS,
            
            
            continued : {
                
                
                cpsMeta : JooseX.CPS.Continuation,
                
                methods : {
                    
//                //hypotetical call with callback
//                xhr : function (params) {
//            
//                    setTimeout(function () {
//                        if (params.error)
//                            params.errback.call(params.scope || Joose.top, params.value1 || 'value1', params.value2 || 'value2', params)
//                        else
//                            params.callback.call(params.scope || Joose.top, params.value1 || 'value1', params.value2 || 'value2', params)
//                    }, 1)
//                }
                    
                    
                    async1 : function (CPS, param1, param2) {
                    },
                    
                    
                    async2 : function () {
                    },
                    
                    
                    async3 : function () {
                    }
                },
                
                
                after : {
                    async1 : function (CPS, param1, param2) {
                        CPS.CONTINUE()
                    }
                }
            }
        
        })
        
        t.ok(CPSEnabled, 'CPSEnabled class was created')
        
        
        var cps = new Class.With.CPS.Enabled()
        
        this <- cps
        
        this.async1(p1, p2).NEXT(
        
            this.async2(p3, p4)
            
        ).NEXT(
        
            this.async3(p4, p5)
            
        ).NEXT(function () {
            
            if (this.RESULT == '...') 
                this.async4().NOW()
            else
                this.CONTINUE()
        })
        

        
        
        this.async1(p1, p2).OR(
        
            this.async2(p3, p4)
            
        ).AND(
        
            this.async3(p4, p5)
            
        ).NEXT(function () {
            
            if (this.RESULT == '...') 
                this.async4().NOW()
            else 
                if (this.RESULT) this.CONTINUE()
        })
        
        
        
        
        
        
        try {
            console.log('outer try')
            try {
                console.log('inner try')
                throw 'a'
            } finally {
                console.log('inner fin')
            }
        
        } catch (e) {
            console.log('catch')
        } finally {
            console.log('outer fin')
        }        
        
        
        
        
        try {
            console.log('outer try')
            try {
                console.log('inner try')
                throw 'a'
            } finally {
                console.log('inner fin')
                throw 'b'
            }
        
        } catch (e) {
            console.log('caught:' + e)
        } finally {
            console.log('outer fin')
        }        

        
        
        try {
            console.log('outer try')
            try {
                console.log('inner try')
                throw 'a'
            } catch (e) {
                console.log('inner catch')
                throw 'b'
            }
        
        } catch (e) {
            console.log('outer catch')
        } finally {
            console.log('outer fin')
        }        
        
        
        
        
        
        
        
        cps.checkEven(1, 11).THEN(function (res) {
            
            if (cps.bar(baz) > 1) this.CONTINUE()
            
            this.CONTINUE()
            
        }).THEN(function () {
            if (cps.baz(bar) > 1) this.CONTINUE()
            
            this.CONTINUE()
        }).CATCH(function (e) {
            t.fail("'CATCH' was reached in absense of error")
        }).FINALLY(function () {
            
            t.pass("'FINALLY' was reached even in absense of error")
            
            this.CONTINUE()
            
        }).NEXT(function (res) {
            
            foo.bar()
            
        })
        
        
        try {
            cps.checkEvent(1, 11)
            if (cps.bar(baz) > 1) return
            cps.baz(bar)
        } catch (e) {
        } finally {
            
        }
            
        try {
            foo.bar()
        }
        
        
        
        
    })
    
})    