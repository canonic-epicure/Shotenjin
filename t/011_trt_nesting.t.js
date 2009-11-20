StartTest(function(t) {
    
	t.plan(19)
    
    var async0 = t.beginAsync()
    
    use('JooseX.CPS.Continuation', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS.Continuation, "JooseX.CPS.Continuation is here")
        
        
        //======================================================================================================================================================================================================================================================            
        //t.diag("'TRY' nesting")
        
        var async4      = t.beginAsync()
        var cont4       = new JooseX.CPS.Continuation()
        var scope4      = {}
        var scope4Then  = {}

        cont4.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag("'TRY' nesting - TRY")
            
            t.ok(this == scope4, "Scope was correctly passed into 'TRY' #2")
            
            var CONT = this.CONT
            
            
            setTimeout(function () {
                
                CONT.TRY(function () {
                    
                    t.ok(this == scope4, "Scope was correctly passed into nested 'TRY' #1")
                    
                    this.CONT.CONTINUE('returnTo')
                }).NOW()
                
            }, 10)
            
        }, scope4).THEN(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag("'TRY' nesting - NEXT")
            
            t.ok(this == scope4Then, "Scope was correctly passed into 'NEXT'")
            
            t.ok(this.RESULT == 'returnTo', 'NEXT was reached from the nested TRY with the correct result')
            
            t.endAsync(async4)
            
        }, scope4Then).NOW()

        
        
        //======================================================================================================================================================================================================================================================            
        //t.diag('Try/Then nesting')
        
        var async5      = t.beginAsync()
        var cont5       = new JooseX.CPS.Continuation()
        var scope5      = {}
        
        cont5.TRY(function (cont) {
            //======================================================================================================================================================================================================================================================            
            t.diag('Try/Then nesting - TRY')
            
            t.ok(this == scope5, "Scope was correctly passed into 'TRY' #3")
            
            var CONT = this.CONT
            
            
            setTimeout(function () {
                
                CONT.TRY(function () {
                    
                    t.ok(this == scope5, "Scope was correctly passed into nested 'TRY' #2")
                    
                    this.CONT.CONTINUE('returnTo2')
                    
                }).THEN(function () {
                    
                    t.ok(this == scope5, "Scope was correctly passed into nested 'NEXT'")
                    
                    this.CONT.CONTINUE(this.RESULT)
                }).NOW()
                
            }, 10)
            
        }, scope5).THEN(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('Try/Then nesting - NEXT')
            
            t.ok(this == scope5, "Scope was correctly passed into outer 'NEXT'")
            
            t.ok(this.RESULT == 'returnTo2', 'NEXT was reached from the nested TRY/NEXT with the correct result :)')
            
            t.endAsync(async5)
        }).NOW()
        
        
        
        //======================================================================================================================================================================================================================================================            
        //t.diag('More Try/Then nesting')
        
        var async6  = t.beginAsync()
        var cont6   = new JooseX.CPS.Continuation()
        var scope6  = {}
        
        cont6.TRY(function () {
            
            var CONT = this.CONT
            
            setTimeout(function () {
                
                CONT.TRY(function () {
                    
                    this.CONT.CONTINUE('returnTo2')
                    
                }).THEN(function () {
                    //======================================================================================================================================================================================================================================================            
                    t.diag('More Try/Then nesting - TRY')
                    
                    t.ok(this.RESULT == 'returnTo2', 'NEXT was reached from the nested TRY with the correct result')
                    
                    
                    this.CONT.TRY(function () {
                        
                        t.ok(this == scope6, "Scope was correctly passed into most nested 'TRY'")
                        
                        this.CONT.CONTINUE('result3')
                        
                    }).THEN(function () {
                        
                        t.ok(this == scope6, "Scope was correctly passed into most nested 'NEXT'")
                        
                        t.ok(this.RESULT == 'result3', 'Another NEXT was reached from the nested TRY with the correct result')
                        
                        this.CONT.CONTINUE('result4')
                    }).NOW()
                    
                }).NOW()
                
            }, 10)
            
        }, scope6).NEXT(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('More Try/Then nesting - NEXT')
            
            t.ok(this == scope6, "Scope was correctly passed into outer 'NEXT'")
            
            t.ok(this.RESULT == 'result4', 'Outer NEXT was reached from the nested TRY/NEXT/THEN with the correct result')
            
            
            this.CONT.TRY(function () {
                
                t.ok(this == scope6, "Scope was correctly passed into nested 'TRY' of outer 'NEXT'")
                
                this.CONT.CONTINUE('result5')
                
            }).THEN(function () {
                
                t.ok(this == scope6, "Scope was correctly passed into nested 'NEXT' of outer 'NEXT'")
                
                t.ok(this.RESULT == 'result5', '.. as well as result')
                
                this.CONT.CONTINUE()
                
                t.endAsync(async6)
            }).NOW()
        })
        
        
        t.endAsync(async0)
    })
    
})    