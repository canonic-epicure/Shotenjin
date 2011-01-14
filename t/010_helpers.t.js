StartTest(function(t) {
    
	t.plan(3)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin.Template', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin.Template, "Shotenjin.Template is here")

        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Instantiation')
        
        var tenjin = new Shotenjin.Template()
        
        t.ok(tenjin, "'Shotenjin.Template' class was succesfully created")

        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Helper functions')
        
        
        t.ok(tenjin.escapeXml('<xml><"more"></xml>') == '&lt;xml&gt;&lt;&quot;more&quot;&gt;&lt;/xml&gt;', 'XML escaping works')
        
//        t.ok(tenjin.trim('  string   ') == 'string', 'Trimming works')
//        
//        t.ok(tenjin.trimMulti('  string1   \n   string2    \n    string3') == 'string1\nstring2\nstring3', 'Multi-line trimming works')
        
        
        t.endAsync(async0)
    })
    
})    