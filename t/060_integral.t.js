StartTest(function(t) {
    
    t.plan(2)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin.Joosed', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin.Joosed, "Shotenjin.Joosed is here")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Integral test')

        Template('Table.Cell', {
            template : '<td>[% text %]</td>'
        })
        
        
        Template('Table.Row', {
            template : '<tr>[%\\ Joose.A.each(row, function (cell, index) { %][%= Table.Cell({ text : cell }) %][%\\})%]</tr>'
        })
        
        
        Template('Table', {
            template : '<table>[%\\ Joose.A.each(table, function (row, index) { %][%= Table.Row({ row : row }) %][%\\})%]</table>'
        })
        

        //======================================================================================================================================================================================================================================================
        t.diag('Rendering')
        
        
        var tableData = [
            [ '1',  '1', '2' ],
            [ '3',  '5', '8' ],
            [ '13','21','34' ]
        ]
        
        t.ok(Table({ table : tableData }) == '<table><tr><td>1</td><td>1</td><td>2</td></tr><tr><td>3</td><td>5</td><td>8</td></tr><tr><td>13</td><td>21</td><td>34</td></tr></table>', 'Integral template was rendered correctly')
        
        t.endAsync(async0)
    })
    
})    
