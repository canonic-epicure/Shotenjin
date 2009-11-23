StartTest(function(t) {
    
    t.plan(17)
    
    var async0 = t.beginAsync()
    
    use('Shotenjin.Joosed', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Shotenjin.Joosed, "Shotenjin.Joosed is here")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Instantiation')
        
        Template('Test', {
            template : ''
        })
        
        t.ok(Test, "'Template' class was succesfully created")
        

        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - empty template')
        
        var tt = new Test()
        
        t.ok(new Test() == '', 'Empty template was rendered correctly #1')
        t.ok(Test.my.render() == '', 'Empty template was rendered correctly #2')
        t.ok(Test() == '', 'Empty template was rendered correctly #3')
        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - mostly whitespace template')
        
        Test.meta.extend({
            template : "    foo  'bar'     \n   baz <tag/>   \n"
        })
        
        t.ok(new Test() == "foo  'bar'\nbaz <tag/>\n", 'Whitespace generally bypassed unmodified, except trimming #1')
        t.ok(Test.my.render() == "foo  'bar'\nbaz <tag/>\n", 'Whitespace generally bypassed unmodified, except trimming #2')
        t.ok(Test() == "foo  'bar'\nbaz <tag/>\n", 'Whitespace generally bypassed unmodified, except trimming #3')
        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - escaped expression')
        
        Test.meta.extend({
            template : "[% name[1] %]"
        })
        
        t.ok(new Test({ name : [ 'tenjin', '<"shotenjin">'] }) == "&lt;&quot;shotenjin&quot;&gt;", 'Variables was correctly expanded from stash, whitespace was ignored, escaping occured #1')
        t.ok(Test.my.render({ name : [ 'tenjin', '<"shotenjin">'] }) == "&lt;&quot;shotenjin&quot;&gt;", 'Variables was correctly expanded from stash, whitespace was ignored, escaping occured #2')
        t.ok(Test({ name : [ 'tenjin', '<"shotenjin">'] }) == "&lt;&quot;shotenjin&quot;&gt;", 'Variables was correctly expanded from stash, whitespace was ignored, escaping occured #3')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Rendering - unescaped expression')
        
        Test.meta.extend({
            template : "[%= name[1] %]"
        })
        
        t.ok(new Test({ name : [ 'tenjin', '<"shotenjin">'] }) == '<"shotenjin">', 'Variables was correctly expanded from stash, whitespace was ignored, no escaping occured #1')
        t.ok(Test.my.render({ name : [ 'tenjin', '<"shotenjin">'] }) == '<"shotenjin">', 'Variables was correctly expanded from stash, whitespace was ignored, no escaping occured #2')
        t.ok(Test({ name : [ 'tenjin', '<"shotenjin">'] }) == '<"shotenjin">', 'Variables was correctly expanded from stash, whitespace was ignored, no escaping occured #3')
        
        //======================================================================================================================================================================================================================================================
        t.diag('Parsing - statements')
        
        Test.meta.extend({
            template : 
                '[%\\\n' + 
                '    Joose.O.each(stash, function (value, name) {\n' + 
                '%]\n' + 
                '        [% "name: [" + name + "], value: [" + value + "]\\n" %]\n' + 
                '[%\\\n' + 
                '    })\n' + 
                '%]\n'
        })
        
        t.ok(new Test({ name1 : 'value1', name2 : 'value2' }) == 'name: [name1], value: [value1]\nname: [name2], value: [value2]\n', 'Code-based template was processed correctly #1')
        t.ok(Test.my.render({ name1 : 'value1', name2 : 'value2' }) == 'name: [name1], value: [value1]\nname: [name2], value: [value2]\n', 'Code-based template was processed correctly #2')
        t.ok(Test({ name1 : 'value1', name2 : 'value2' }) == 'name: [name1], value: [value1]\nname: [name2], value: [value2]\n', 'Code-based template was processed correctly #3')
        
        t.endAsync(async0)
    })
    
})    










Class('My.Template', {
    
    meta : 'Shotenjin.Joosed',
    
    template : {
        /*
		 * tj Hello [% name %]! <ul> [%\ for (var i = 0, n = items.length; i <
		 * n; i++) { %] <li>[%= items[i] %]</li> [% } %] </ul>
		 * 
		 * 
		 * <div class="thumbnail photoThumbnailMid medium12">
		 * 
		 * <p class="centered ">[%js name %]</p>
		 * 
		 * <div class="x-rawbackground paper1 photo"> ${
		 * App.my('/Travel::MainLayout.center/Travel::Photo::Single',{
		 * 'photo_id' = current_photo.id } ) } <img width=170 height=170 src="[%
		 * src(current_photo.path, 170, 170, 'place') %]"></a>
		 * 
		 * <?= this.customFunc({ 'photo_id' = current_photo.id })
		 * ?>.my('/Travel::MainLayout.center/Travel::Photo::Single', ) } </div> \
		 * <div class="righted"> ${ I18n.words.added_by }: [%
		 * a('/Travel::MainLayout.center/Travel::User::Single',{ 'user_id' =
		 * current_photo.creator_id } ) %]<span class="lightgray2">[%
		 * current_photo.creator %]</span></a><br> </div> </div> tj
		 */
        /* CREATED BY SHOTENJIN.JOOSED HELPER SCRIPT DO NOT MODIFY DIRECTLY */
        source : 'Hello #{name}\n...'
        /* CREATED BY SHOTENJIN.JOOSED HELPER SCRIPT DO NOT MODIFY DIRECTLY */        
    },

    
    methods : {
        
        customFunc : function (p1, p2) {
            return format(p1, p2, this.stash.p3)
        }
    }

})


[%\
    Joose.O.each(stash, function (value, name) {
%]
        [% "name: [" + name + "], value: [" + value + "]" %]
[%\
    })
%]


function (stash) {
    var _output = [];
    var _me = this;
    eval(this.meta.expandStashToVarsCode(stash));;
    _output.push('<tr>', "");
    Joose.A.each(row, function (cell, index) {;
        _output.push(' ', Table.Cell({
            text: cell
        }), '  ', "");
    });
    _output.push('</tr>', "");;
    return _output.join("");
}