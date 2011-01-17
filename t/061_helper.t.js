StartTest(function(t) {
    
    t.plan(3)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin, "Shotenjin is here")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Integral test')

        Class('My.Template', {
            
            meta : 'Shotenjin',
            
            template : {
                /*tj
        
                    [%\
                        Joose.A.each(arr, function (value, index) {
                            if (index % 2) {
                    %]
                                [% "index: [" + index + "], value: [" + value + "]" %]
                    [%\
                            } else {
                    %]
                                [% "value: [" + value + "], index: [" + index + "]" %]
                    [%\
                            }
                        })
                    %]
                
                tj*/
            }
        
        })

        //======================================================================================================================================================================================================================================================
        t.diag('Rendering')
        
        t.ok(My.Template({ arr : [ 'foo', 'bar' ] }) == 'value: [foo], index: [0]\nindex: [1], value: [bar]\n', 'Complex template was rendered correctly')
        
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Another formatting style + custom helper method')

        Class('My.Template1', {
            
            meta : 'Shotenjin',
            
            template : {
                /*tj
                    [%\ Joose.A.each(arr, function (value, index) { %]
                    [%\     if (index % 2) { %]
                                [% "index: [" + index + "], value: [" + value + "]" %]
                    [%\     } else { %]
                                [% "value: [" + this.upperCaseHelper(value) + "], index: [" + index + "]" %]
                    [%\     } %]
                    [%\ }, this) %]
                
                tj*/
            },
        
            
            methods : {
                
                upperCaseHelper : function (value) {
                    return value.toUpperCase()
                }
            }
        
        })

        //======================================================================================================================================================================================================================================================
        t.diag('Rendering')
        
        t.ok(My.Template1({ arr : [ 'foo', 'bar' ] }) == 'value: [FOO], index: [0]\nindex: [1], value: [bar]\n', 'Complex template was rendered correctly #2 + helper method was called')
        
        
        t.endAsync(async0)
    })
    
})    
