StartTest(function(t) {
    
	t.plan(3)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin.Joosed', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin.Joosed.my, "Shotenjin.Joosed.my is here")
        
        var tenjin = Shotenjin.Joosed.my
        
        t.ok(tenjin.escapeXml('<xml><"more"></xml>') == '&lt;xml&gt;&lt;&quot;more&quot;&gt;&lt;/xml&gt;', 'XML escaping works')
        
        t.ok(tenjin.trim('  string   ') == 'string', 'Trimming works')
        
        
        t.endAsync(async0)
    })
    
})    