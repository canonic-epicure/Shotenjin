Name
====

Shotenjin.Joosed - Post-modern JavaScript templating engine


SYNOPSIS
========

Always classic:

        var tenjin = new Shotenjin.Joosed.Template({
            sources : 'Hello [% world %]'
        })
        
        var rendered = tenjin.render({
            world : 'world'
        })
        
        
Post-modern:

          
        Template('Table.Cell', {
            template : '<td>[% text %]</td>'
        })
        
        
        Template('Table.Row', {
            use : 'Table.Cell',
        
            template : '<tr>[%\\ Joose.A.each(row, function (cell, index) { %][%= Table.Cell({ text : cell }) %][%\\})%]</tr>'
        })
        
        
        Template('Table', {
            use : 'Table.Row',
        
            template : '<table>[%\\ Joose.A.each(table, function (row, index) { %][%= Table.Row({ row : this.helper(row) }) %][%\\})%]</table>',
            
            methods : {
            
                helper : function () { ... }
            }
        })
        

        var tableData = [
            [ '1',  '1', '2' ],
            [ '3',  '5', '8' ],
            [ '13','21','34' ]
        ]
        
        
        var rendered = new Table({ table : tableData })
        
        // -or-
        
        var rendered = Table({ table : tableData })
        
Less-noisy with the helper script:

          
        Template('Chapter', {
            
            template : {
                /*tj
                    <h2>[% title %]</h2>
                    <p> [% content %]</p>
                tj*/

                /* GENERATED BY SHOTENJIN.JOOSED HELPER, DO NOT MODIFY DIRECTLY */
                sources : '<h2>[% title %]</h2>\n<p> [% content %]</p>'
            }
        })
        
        
        Template('Book', {
            
            template : {
                /*tj
                    [%\ this.wrap(Chapter, { title : 'Chapter1' }, function () { %]                     
                        Text of first chapter.
                    [%\ }); %]

                    [%\ this.wrap(Chapter, { title : 'Chapter2' }, function () { %]
                        Text of second chapter.
                    [%\ }) %]
                tj*/

                /* GENERATED BY SHOTENJIN.JOOSED HELPER, DO NOT MODIFY DIRECTLY */
                sources : '[%\\ this.wrap(Chapter, { title : \'Chapter1\' }, function () { %]                     \nText of first chapter.\n[%\\ }); %][%\\ this.wrap(Chapter, { title : \'Chapter2\' }, function () { %]\nText of second chapter.\n[%\\ }) %]'
            }
        })

        var rendered = Book()


DESCRIPTION
===========

Shotenjin.Joosed is a Yet Another JavaScript Templating Engine, based on Shotenjin by [Makoto Kuwata](http://www.kuwata-lab.com/)
Shotenjin was ported to Joose, along with some improvements.

The main difference of Shotenjin from other templating solutions is that for the templating language it uses JavaScript itself. 
Thus, Shotenjin templates are not *compiled* into JavaScript, they are only *parsed*. 

   

SYNTAX
=======

Shotenjin uses 3 types of templating instructions. Keep in mind, that all them, in the same time, are just ordinary JavaScript expressions,
which are evaluted directly by the JavaScript engine of your choice, in the context of the templating function (see below for its internal structure). 


Escaped expressions
-------------------

Such expression are represented with the following construct

        [% name %]
        
        [% name + ' ' + surname %]
        
        [% Digest.MD5.my.md5_hex(response) %]

The value of the expression will be escaped before adding to template, according to this table:

        '&'     : '&amp;'
        '<'     : '&lt;' 
        '>'     : '&gt;' 
        '"'     : '&quot;'
    

Unescaped expressions
---------------------

Such expression are represented with the following construct

        [%= person.name %]
        
        [%= document.body.innerHTML %]

Memo - passed-through exactly (equally) as calculated

The value of the expression will *not* be escaped before adding to template. Thus, this expressions can be used to generate HTML markup.  
This instruction can be used to include the resulting content of another template for example, (see example with `Table` in Synopsys above)


Control statements
------------------

This type of instructions represent arbitrary JavaScript code, which will be added to templating function unmodified. So, generally, 
it shouldn't return a value, but should modify the control flow:

        [%\ for (var i = 0; i < persons.length; i++) { %]
                <tr><td>[% persons[i].name %]</td></tr>
        [%\ } %]        
                
        
        [%\ if (a == b) { %]
                <tr><td>[% person.name %]</td></tr>
        [%\ } else { %]        
                <tr><td>[% person.surname %]</td></tr>
        [%\ } %]

Multi-line code is ok:

        [%\
            var sum = 0
            
            Joose.A.each(persons, function (person, index) {
                sum += person.parameter
            })
        %]
        Totally: [% sum %]
        
Memo - lambda function in Haskell.

As you can see any code can be embedded into templating function, and you don't need to learn one more language to create a template.


USAGE
=====

Classic
-------

Shotenjin.Joosed can be used in "classic" way, in which you are responsible for instantiation and rendering. The following example
make that clear: 

        var tenjin = new Shotenjin.Joosed.Template({
            sources : 'Hello [% world %]'
        })
        
        var rendered = tenjin.render({
            world : 'Shotenjin'
        })


Post-modern
-----------

In the "post-modern" usage scenario, the template instance is embedded into Joose class:

        Class('My.Template', {
            meta : 'Shotenjin.Joosed',
            
            template : '<td>[% text %]</td>'
        })

Additional helper `Template` is introduced to simplify the declaration:

        Template('My.Template', {
        
            template : '<td>[% text %]</td>'
        })
        



Helper script
-------------


OOP
===

So we already saw, that Shotenjin template is a usual JavaScript code. In the same time, its an instance of `Shotenjin.Joosed.Template` class.
During evalution of the template, `this` value is associated with this instance, so naturally all the methods of this class are available.


Methods
-------

 - `this.render(Object stash)`
 
Renders the template using data, passed in `stash`


 - `this.capture(Function func)`
 
Captures the output, generated inside the passed function and returns it. For example:

    [%\ var names = this.capture(function () {
            for (var i = 1; i <= 5; i++) { 
    %]
                [% persons[i].name %]
    [%\     }
        })
    %]
    
    [% names %]
 
A *new context* is derived for the passed function and the output of the outer template isn't modified. 


 - `this.echo(Object str1, Object str2, ...)`
 
Escapes and adds a each of passed arguments to the output of the *current context*. Usually a *context* is a template itself, however nested contexts may be derived (see `this.capture` and `this.wrap`)


 - `this.wrap(Class|Shotenjin.Joosed.Template template, Object stash, Function func)`
 
First captures the content generated into the passed `func`, then assign it to the `content` key of the passed `stash` object and renders the wrapping template.
Wrapping `template` can be passed as the instance of `Shotenjin.Joosed.Template` or as Class.


 - `this.escapeXml(String str)`
 
Escapes reserved HTML symbols in the `str` and returns modified string. 



Empty template body
-------------------

In the simplest case of empty template body, the template function looks like:

    function (stash) { 
        this.startContext(); 
        
        eval(this.expandStashToVarsCode(stash));
         
        return this.endContext(); 
    }
    
This function accepts a single argument, which should be an `Object` (in JavaScript meaning) and which is called *stash*.
    
This statement

    eval(this.expandStashToVarsCode(stash));
    
creates a local variable for each key of the stash, so later, any key of the stash can accessed directly by its name.

Stash can be also accessed directly, if you prefer:

    [% stash.name %]
    
    [% stash.person.name %]


Ordinary text
-------------
    
If the template contains an ordinary text, like:

    foo 'bar'

its translated as:
    
    function (stash) { 
        this.startContext(); 
        
        eval(this.expandStashToVarsCode(stash));
        
        __contexts[0].output.push('foo  \'bar\'\\n', "");
         
        return this.endContext(); 
    }

    function (stash) { this.startContext(); eval(this.expandStashToVarsCode(stash)); ;  ; return this.endContext(); })
   


GETTING HELP
============

This extension is supported via github issues tracker: [http://github.com/SamuraiJack/Shotenjin-Joosed/issues](http://github.com/SamuraiJack/Shotenjin-Joosed/issues)

For general Joose questions you can also visit #joose on irc.freenode.org. 


SEE ALSO
========

[Jemplate](http://jemplate.net/)

Port of Template::Toolkit to JavaScript


[Closure Templates](http://code.google.com/closure/templates/)

Google solution 


[Ext.XTemplate](http://www.extjs.com/deploy/dev/docs/?class=Ext.XTemplate)

Templating solution of ExtJS framework


[http://joose.github.com/Joose/doc/html/Joose.html](http://joose.github.com/Joose/doc/html/Joose.html)

Documentation for Joose


BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at [http://github.com/SamuraiJack/Shotenjin-Joosed/issues](http://github.com/SamuraiJack/Shotenjin-Joosed/issues)



AUTHORS
=======

Nickolay Platonov [nplatonov@cpan.org](mailto:nplatonov@cpan.org)



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2009, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
