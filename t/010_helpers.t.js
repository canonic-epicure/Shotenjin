StartTest(function(t) {
    
	t.plan(5)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin.Joosed.Template', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin.Joosed.Template, "Shotenjin.Joosed.Template is here")

        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Instantiation')
        
        var tenjin = new Shotenjin.Joosed.Template()
        
        t.ok(tenjin, "'Shotenjin.Joosed.Template' class was succesfully created")

        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Helper functions')
        
        
        t.ok(tenjin.escapeXml('<xml><"more"></xml>') == '&lt;xml&gt;&lt;&quot;more&quot;&gt;&lt;/xml&gt;', 'XML escaping works')
        
        t.ok(tenjin.trim('  string   ') == 'string', 'Trimming works')
        
        t.ok(tenjin.trimMulti('  string1   \n   string2    \n    string3') == 'string1\nstring2\nstring3', 'Multi-line trimming works')
        
        
        t.endAsync(async0)
    })
    
})    