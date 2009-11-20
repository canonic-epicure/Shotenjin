StartTest(function(t) {
    
	t.plan(4)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin.Joosed', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin.Joosed.my, "Shotenjin.Joosed.my is here")

        
        //======================================================================================================================================================================================================================================================
        t.diag('Helper functions')
        
        var tenjin = Shotenjin.Joosed.my
        
        t.ok(tenjin.escapeXml('<xml><"more"></xml>') == '&lt;xml&gt;&lt;&quot;more&quot;&gt;&lt;/xml&gt;', 'XML escaping works')
        
        t.ok(tenjin.trim('  string   ') == 'string', 'Trimming works')
        
        t.ok(tenjin.trimMulti('  string1   \n   string2    \n    string3') == 'string1\nstring2\nstring3', 'Multi-line trimming works')
        
        
        t.endAsync(async0)
    })
    
})    