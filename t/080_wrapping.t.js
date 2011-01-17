StartTest(function(t) {
    
    t.plan(2)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin, "Shotenjin is here")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Template with wrapping')

        Template('Chapter', {
            
            template : {
                /*tj
                    <h2>[% title %]</h2>
                    <p> [% content %]</p>
                tj*/
            }
        })
        
        
        Template('Book', {
            
            template : {
                /*tj
                    [%\ this.wrapper(Chapter, { title : 'Chapter1' }, function () { %]                     
                        Text of first chapter.
                    [%\ }); %]
                    
                    [%\ this.wrapper(Chapter, { title : 'Chapter2' }, function () { %]
                        Text of second chapter.
                    [%\ }) %]
                tj*/
            }
        })

        //======================================================================================================================================================================================================================================================
        t.diag('Rendering')
        
        t.ok(Book() == '<h2>Chapter1</h2>\n<p> Text of first chapter.\n</p><h2>Chapter2</h2>\n<p> Text of second chapter.\n</p>', 'Wrapping works correctly')

        t.endAsync(async0)
    })
})    


