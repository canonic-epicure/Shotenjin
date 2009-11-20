StartTest(function(t) {
    
	t.plan(47)
    
    var async0 = t.beginAsync()
	
    use('JooseX.CPS', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS, "JooseX.CPS is here")
        t.ok(JooseX.CPS.Builder, "JooseX.CPS.Builder is here")
        t.ok(JooseX.CPS.Continuation, "JooseX.CPS.Continuation is here")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Class creation')
        
        
        Class('CPS.Enabled1', {
            
            trait : JooseX.CPS,
            
            has : {
                process1Called : false
            },
            
            continued : {
                
                methods : {
                    
                    process1 : function (param1, param2) {
                        this.process1Called = true
                        
                        if (param1 < 0 || param2 < 0) throw "Error"
                        
                        this.CONTINUE(param1 + param2)
                    }
                }
            }
        })
        t.ok(CPS.Enabled1, 'CPS.Enabled1 class was created')
        
        
        Class('CPS.Enabled2', {
            
            trait : JooseX.CPS,
            
            has : {
                one     : null,
                
                process2Called : false,
                process3Called : false,
                process4Called : false,
                
                sequencedCalled : false
            },
            
            
            continued : {
                
                methods : {
                    
                    process2 : function (param1, param2) {
                        t.ok(this.sequencedCalled, "'sequenced2' was called")
                        t.ok(!this.process2Called, "'process2' wasn't called yet")
                        t.ok(!this.one.process1Called, "'one.process1' wasn't called yet")
                        t.ok(!this.process3Called, "'process3' wasn't called yet")
                        t.ok(!this.process4Called, "'process4' wasn't called yet")
                        
                        this.process2Called = true
                        
                        this.one.attachScope(this).process1(param1, param2).now()
                    },
                    
                    
                    process3 : function (param1, param2) {
                        t.ok(this.sequencedCalled, "'sequenced2' was called")
                        t.ok(this.process2Called, "'process2' was called")
                        t.ok(this.one.process1Called, "'one.process1' was called")
                        t.ok(!this.process3Called, "'process3' wasn't called yet")
                        t.ok(!this.process4Called, "'process4' wasn't called yet")
                        
                        this.process3Called = true
                        
                        this.CONTINUE()
                    },
                    
                    
                    process4 : function (param1, param2) {
                        t.ok(this.sequencedCalled, "'sequenced2' was called")
                        t.ok(this.process2Called, "'process2' was called")
                        t.ok(this.one.process1Called, "'one.process1' was called")
                        t.ok(this.process3Called, "'process3' was called")
                        t.ok(!this.process4Called, "'process4' wasn't called yet")
                        
                        this.process4Called = true
                        
                        this.CONTINUE()
                    },
                    
                    
                    sequenced2 : function (param1, param2) {
                        t.ok(!this.sequencedCalled, "'sequenced2' wasn't called yet")
                        t.ok(!this.process2Called, "'process2' wasn't called yet")
                        t.ok(!this.one.process1Called, "'one.process1' wasn't called yet")
                        t.ok(!this.process3Called, "'process3' wasn't called yet")
                        t.ok(!this.process4Called, "'process4' wasn't called yet")
                        
                        this.sequencedCalled = true
                        
                        this.process2(param1, param2)
                        this.process3(param1, param2)
                        this.process4(param1, param2)
                        
                        this.NOW()
                    }
                }
            }
        })
        
        t.ok(CPS.Enabled2, 'CPS.Enabled2 class was created')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Call to sequenced continued methods')
        
        var async1 = t.beginAsync()
        
        var obj = new CPS.Enabled2({
            one : new CPS.Enabled1()
        })
        
        obj.sequenced2(1, 10).next(function () {
            t.ok(this.sequencedCalled, "'sequenced2' was called")
            t.ok(this.process2Called, "'process2' was called")
            t.ok(this.one.process1Called, "'one.process1' was called")
            t.ok(this.process3Called, "'process3' was called")
            t.ok(this.process4Called, "'process4' was called")
            
            t.endAsync(async1)
        })
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Call to sequenced continued methods with exception from nested')
        
        var async2 = t.beginAsync()
        
        var obj2 = new CPS.Enabled2({
            one : new CPS.Enabled1()
        })
        
        obj2.sequenced2(-1, -10).THEN(function () {
            
            t.fail("'THEN' reached after exception")
            
        }).CATCH(function (e) {
            
            t.pass("'CATCH' reached after exception")
            
            t.ok(e == 'Error', '.. with the correct exception value')
            
            t.ok(this.sequencedCalled, "'sequenced2' was called")
            t.ok(this.process2Called, "'process2' was called")
            t.ok(this.one.process1Called, "'one.process1' was called")
            t.ok(!this.process3Called, "'process3' wasn't called")
            t.ok(!this.process4Called, "'process4' wasn't called")
            
            t.endAsync(async2)
            
        }).NOW()
        
        
        t.endAsync(async0)
    })
    
})    