StartTest(function(t) {
    
	t.plan(22)
    
    var async0 = t.beginAsync()
	
    use('JooseX.CPS', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS, "JooseX.CPS is here")
        t.ok(JooseX.CPS.Builder, "JooseX.CPS.Builder is here")
        t.ok(JooseX.CPS.Continuation, "JooseX.CPS.Continuation is here")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Class creation')
        
        
        Class('Base', {
            
            has : {
                sumBaseCalled       : false,
                sumBaseParams       : null
            },
            
            methods : {
                
                sum : function (param1, param2) {
                    
                    t.ok(this.overrideCalled, "'override' modifier was alredy called")
                    t.ok(this.beforeCalled, "'before' modifier was alredy called")
                    t.ok(!this.sumBaseCalled, "Base method wasn't called yet")
                    
                    t.ok(this.beforeParams[0] == param1 && this.beforeParams[1] == param2, "Base method was called with correct arguments")
                    
                    this.sumBaseParams = arguments
                    this.sumBaseCalled = true
                    
                    return param1 + param2
                }
            }
        })
        t.ok(Base, 'Base class was created')
        
        
        Class('CPS.Enabled', {
            
            isa : Base,
            
            trait : JooseX.CPS,
            
            has : {
                beforeCalled : false,
                beforeParams : null
            },
            
            continued : {
                
                before : {
                    sum : function (param1, param2) {
                        
                        t.ok(this.overrideCalled, "'override' modifier was alredy called")
                        t.ok(!this.beforeCalled, "'before' modifier wasn't called yet")
                        t.ok(!this.sumBaseCalled, "Base method wasn't called yet")
                        
                        t.ok(this.overrideParams[0] == param1 && this.overrideParams[1] == param2, "'before' modifier was called with correct arguments")
                        
                        this.beforeParams = arguments
                        this.beforeCalled = true
                        
                        var cont = this.getCONTINUE()
                        
                        setTimeout(function () {
                            cont()
                        }, 1)
                    }
                }
                
            }
        
        })
        
        t.ok(CPS.Enabled, 'CPS.Enabled class was created')

        
        Class('CPS.Enabled.Further', {
            
            isa : CPS.Enabled,
            
            has : {
                overrideCalled : false,
                overrideParams : null
            },
            
            
            continued : {
                
                override : {
                    
                    sum : function (param1, param2) {
                        
                        t.ok(!this.overrideCalled, "'override' modifier wasn't called yet")
                        t.ok(!this.beforeCalled, "'before' modifier wasn't called yet")
                        t.ok(!this.sumBaseCalled, "Base method wasn't called yet")
                        
                        this.overrideParams = arguments
                        this.overrideCalled = true
                        
                        this.SUPER(param1, param2).NOW()
                    }
                }
            }
        
        })
        
        t.ok(CPS.Enabled.Further, 'CPS.Enabled.Further class was created. Trait for metaclass was inherited')
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Call to continued method modified with before/override')
        
        var async1 = t.beginAsync()
        
        var further = new CPS.Enabled.Further()
        
        further.sum(1, 1).NEXT(function (res) {
            
            t.pass("'THEN' was reached")
            
            t.ok(res == 2, ".. with the correct result")
            
            t.ok(this.overrideCalled, "'override' modifier was alredy called")
            t.ok(this.beforeCalled, "'before' modifier was alredy called")
            t.ok(this.sumBaseCalled, "Base method was alredy called")
            
            t.endAsync(async1)
        })
        
        
        t.endAsync(async0)
    })
    
})    