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
                        var pos = 1
                        
                        Joose.O.each(stash, function (value, name) {
                            if (pos % 2) {
                    %]
                                [% "name: [" + name + "], value: [" + value + "]" %]
                    [%\
                            } else {
                    %]
                                [% "value: [" + value + "], name: [" + name + "]" %]
                    [%\
                            }
                            
                            pos++
                        })
                    %]
                
                tj*/

                /* GENERATED BY SHOTENJIN.JOOSED HELPER, DO NOT MODIFY DIRECTLY */
                sources : '[%\\\nvar pos = 1\nJoose.O.each(stash, function (value, name) {\nif (pos % 2) {\n%]\n[% "name: [" + name + "], value: [" + value + "]" %]\n[%\\\n} else {\n%]\n[% "value: [" + value + "], name: [" + name + "]" %]\n[%\\\n}\npos++\n})\n%]'
            }
        
        })

        //======================================================================================================================================================================================================================================================
        t.diag('Rendering')
        
        t.ok(My.Template({ name1 : 'value1', name2 : 'value2' }) == 'name: [name1], value: [value1]\nvalue: [value2], name: [name2]\n', 'Complex template was rendered correctly')

        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Another formatting style + custom helper method')

        Class('My.Template1', {
            
            meta : 'Shotenjin',
            
            template : {
                /*tj
                    Passed:
                    [%\ var pos = 1; %]
                    [%\ Joose.O.each(stash, function (value, name) { %]
                    [%\     if (pos % 2) { %]
                                [% "name: [" + name + "], value: [" + value + "]" %]
                    [%\     } else { %]
                                [% "value: [" + value + "], name: [" + this.upperCaseHelper(name) + "]" %]
                    [%\     } %]
                    [%\     pos++ %]
                    [%\ }, this) %]
                
                tj*/

                /* GENERATED BY SHOTENJIN.JOOSED HELPER, DO NOT MODIFY DIRECTLY */
                sources : 'Passed:\n[%\\ var pos = 1; %]\n[%\\ Joose.O.each(stash, function (value, name) { %]\n[%\\     if (pos % 2) { %]\n[% "name: [" + name + "], value: [" + value + "]" %]\n[%\\     } else { %]\n[% "value: [" + value + "], name: [" + this.upperCaseHelper(name) + "]" %]\n[%\\     } %]\n[%\\     pos++ %]\n[%\\ }, this) %]'
            },
        
            
            methods : {
                
                upperCaseHelper : function (value) {
                    return value.toUpperCase()
                }
            }
        
        })

        //======================================================================================================================================================================================================================================================
        t.diag('Rendering')
        
        t.ok(My.Template1({ name1 : 'value1', name2 : 'value2' }) == 'Passed:\nname: [name1], value: [value1]\nvalue: [value2], name: [NAME2]\n', 'Complex template was rendered correctly #2 + helper method was called')
        
        
        t.endAsync(async0)
    })
    
})    
