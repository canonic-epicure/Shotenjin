Name
====

Shotenjin.Joosed - 'Post-modern javascript templating system'


SYNOPSIS
========

        Template('Table.Cell', {
            template : '<td>[% text %]</td>'
        })
        
        
        Template('Table.Row', {
            template : '<tr>[%\\ Joose.A.each(row, function (cell, index) { %][%= Table.Cell({ text : cell }) %][%\\})%]</tr>'
        })
        
        
        Template('Table', {
            template : '<table>[%\\ Joose.A.each(table, function (row, index) { %][%= Table.Row({ row : row }) %][%\\})%]</table>'
        })
        

        var tableData = [
            [ '1',  '1', '2' ],
            [ '3',  '5', '8' ],
            [ '13','21','34' ]
        ]
        
        new Table({ table : tableData })
        
        -equal-
        
        Table.my.render({ table : tableData })
        
        -equal-
        
        Table({ table : tableData })


DESCRIPTION
===========




GETTING HELP
============

This extension is supported via github issues tracker: [http://github.com/SamuraiJack/JooseX-CPS/issues](http://github.com/SamuraiJack/JooseX-CPS/issues)

For general Joose questions you can also visit #joose on irc.freenode.org. 


SEE ALSO
========

[http://github.com/SamuraiJack/JooseX-CPS/](http://github.com/SamuraiJack/JooseX-CPS/)

Web page of this extensions

[http://joose.github.com/Joose/doc/html/Joose.html](http://joose.github.com/Joose/doc/html/Joose.html)

Documentation for Joose


BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at [http://github.com/SamuraiJack/JooseX-CPS/issues](http://github.com/SamuraiJack/JooseX-CPS/issues)



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
