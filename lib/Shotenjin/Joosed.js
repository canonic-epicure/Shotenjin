Class('Shotenjin.Joosed', {
    
    isa     : Joose.Meta.Class,
    meta    : Joose.Meta.Class,
    
    use : 'Shotenjin.Joosed.Template',
    
    
    has : {
        defaultSuperClass       : Joose.FutureClass('Shotenjin.Joosed.Template'),
        
        sources                 : null,
        compiled                : null
    },
    
    
    builder : {
        
        methods : {
            
            template : function (meta, info) {
                if (typeof info == 'string')
                    meta.sources = info
                else
                    meta.sources = info.source
            }
        }
    },
    
    
    after : {
        afterMutate : function () {
            this.compiled = eval(this.parse(this.sources))
        }
    },
    
    
    methods : {
        
        expandStashToVarsCode : function (stash) {
            var buf = []
            
            Joose.O.each(stash || {}, function (value, name) {
                buf.push("var ", name, " = stash['", name, "']\n")
            })
            
            return buf.join('')
        },
        
        
        parse : function (source) {
            var my = this.my
            var escapeRe = my.escapeRe
            
            source = my.trimMulti(source || '')

            var statementRegexSource = escapeRe(my.startTag + my.statementTagModifier) + '((?:.|\\n)*?)' + escapeRe(my.endTag) + '\\n?'
            var statementRegex = new RegExp(statementRegexSource, 'g')
            
            
            var result = [
                '(function (stash) { ',
                    'var _output = []; var _me = this; ',
                    'eval(this.meta.expandStashToVarsCode(stash)); '
            ]
            
            this.splitAndProcess(result, statementRegex, source, this.emitExpressions, this.emitCode)
            
            result.push(
                    '; return _output.join(""); ',
                '})'
            )
            
            return result.join('')
        },
        
        
        emitCode : function (result, match) {
            result.push(match[1])
        },
        
        
        emitExpressions : function (result, source) {
            var my = this.my
            var escapeRe = my.escapeRe
            
            var expressionRegexSource = escapeRe(my.startTag) + '((' + escapeRe(my.expressionTagModifier) + ')?((?:.|\\n)*?))' + escapeRe(my.endTag) + '\\n?'
            var expressionRegex = new RegExp(expressionRegexSource, 'g')
            
            
            result.push(
                '_output.push('
            )
            
            this.splitAndProcess(result, expressionRegex, source, this.emitText, this.emitExpression)
            
            result.push(
                    '""',  
                '); '
            )
        },
        
        
        emitText : function (result, source) {
            if (!source) return
            
            result.push("'", source.replace(/[\'\\]/g, '\\$&').replace(/\n/g, '\\n'), "', ")
        },
        
        
        emitExpression : function (result, match) {
            var my = this.my
            
            if (match[2] == my.expressionTagModifier)
                result.push(match[3])
            else
                result.push(
                    '_me.escape(' + match[1] + ')'
                )
                
                
            result.push(', ')
        },
        
        
        splitAndProcess : function (result, regex, source, processWhiteSpace, processMatch, scope) {
            var pos = regex.lastIndex = 0
            var match
            
            while ((match = regex.exec(source)) != null) {
                
                var whitespace = source.substring(pos, match.index)
                
                pos = match.index + match[0].length
                
                if (whitespace) processWhiteSpace.call(scope || this, result, whitespace)
                
                processMatch.call(scope || this, result, match)
            }
            
            var rest = pos == 0 ? source : source.substring(pos)
            
            if (rest) processWhiteSpace.call(scope || this, result, rest)
        },
        
        
        defaultConstructor : function () {
            var previousConstructor = this.SUPER()
            
            return function (stash) {
                previousConstructor.meta = arguments.callee.meta
                
                previousConstructor.call(this)
                
                return new String(this.render(stash))
            }
        }
    },
    //eof methods
    
    
    my : {
        
        meta : Joose.Meta.Class,
        
        have : {
            escapeTable         : { 
                '&'     : '&amp;', 
                '<'     : '&lt;', 
                '>'     : '&gt;', 
                '"'     : '&quot;' 
            },
            
            startTag    : '[%',
            endTag      : '%]',
            
            statementTagModifier    : '\\',
            expressionTagModifier   : '='
        },
        
        
        methods : {
            
            escapeRe : function (str) {
                return str.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
            },
            
            
            escapeSymbol : function (symbol) {
                return this.escapeTable[symbol] 
            },
            
            
            escapeXml : function (s) {
                var me = this
                
                return typeof s != 'string' ? s : s.replace(/[&<>"]/g, function (match) {
                    return me.escapeSymbol(match)
                })
            },

            
            trim : function (s) {
                return s.replace(/^\s+/, '').replace(/\s+$/, '')
            },
            
            
            trimMulti : function (s) {
                return s.replace(/^(.*)$/mg, this.trim)
            }
            
        }
        //eof my methods
    },
    //eof my
    
    
    body : function () {
        Joose.Namespace.Manager.my.register('Template', Shotenjin.Joosed)
    }
})


/**

Name
====


Shotenjin.Joosed - Some syntax sugar, enabling the [Continuation Passing Style](http://en.wikipedia.org/wiki/Continuation-passing_style) for Joose methods


SYNOPSIS
========

        Class("DataStore", {
        
            trait : JooseX.CPS,
        
            has: {
                data    : { is: "rw" }
            },
            
            continued : {
            
                methods : {
                
                    save : function (url) {
                    
                        XHR.request({
                            url      : url,
                            data     : this.data,
                        
                            callback : this.getCONTINUE(),
                            errback  : this.getTHROW()
                        })
                    }
                }
            }
        })
        
        var store = new DataStore({
            data : [ 1, 2, 3]
        })
        
        UI.maskScreen("Please wait")
        
        store.save('http://remote.site.com/webservice').THEN(function (response) {
            
            if (response.isOk) {           
                alert('Saved correctly')
                
                this.CONTINUE()
            } else
                this.THROW('still got the error')
            
        }).CATCH(function (e) {
        
            alert('Error during saving: ' + e)
            
            this.CONTINUE()
            
        }).FINALLY(function () {
        
            UI.removeScreenMask()
        })


DESCRIPTION
===========

`JooseX.CPS` is a trait for metaclasses, which enables "Continuation passing style" in Joose methods and method modifiers.

`JooseX.CPS` allows you to define special "continued" methods and method modifiers, which forms the *asynchronous interface* of the class, 
but behave just like ordinary methods in other aspects (can be inherited, composed from Role, etc).


`continued` BUILDER
===================

Adding `JooseX.CPS` trait will provide your class with the `continued` builder. This builder groups the declaration of the "asynchrounous part" of your class.
Inside it, you can use the following builders: `methods`, `override`, `after`, `before`. This builders have the same meaning as standard ones, however instead of usual, 
they defines the "continued" methods.


"Continued" methods
-------------------

"Continued" methods are methods which do not transfer the control flow with the standard `return` statement. Instead, to transfer the control flow from such method you need to call the
`CONTINUE` (or `RETURN`, or `THROW`) method in the current scope:


        Class("DataStore", {
        
            continued : {
            
                methods : {
                
                    save : function (url) {
                        if (!url.test(/^http/) { this.THROW("Invalid URL"); return }
                        
                        ...
                        
                        this.CONTINUE(result)
                    }
                }
            }
        })
        
The call to such method don't have to be synchronous - this naturally allows to use them as callbacks (or errbacks).

The `CONTINUE`, `RETURN` or `THROW` methods in the current scope are called "control flow" methods. 

Continued methods have the following features:

- They are executed strictly asynchronously (with `setTimeout(func, 0)`). You *cannot* rely that any of such method will be executed synchronously.

- You cannot return the value from it, in the usual meaning (with `return`). Any returned value will cause an error.

- Inside of each method, in the current scope, is available the special *continuation instance*: `this.CONT`
 
 Its an instance of [JooseX.CPS.Continuation][JooseX.CPS.Continuation]. All the "control flow" methods are actually executed as methods of this instance. 
 See the [JooseX.CPS.ControlFlow][JooseX.CPS.ControlFlow] for details.
    
- The parameters for any control flow method will became the arguments for the following scope. 


"Continued" method modifiers
----------------------------


EXAMPLES
========


GETTING HELP
============

This extension is supported via github issues tracker: [http://github.com/SamuraiJack/JooseX-CPS/issues](http://github.com/SamuraiJack/JooseX-CPS/issues)

For general Joose questions you can also visit #joose on irc.freenode.org. 


SEE ALSO
========

[http://github.com/SamuraiJack/JooseX-CPS/](http://github.com/SamuraiJack/JooseX-CPS/)

Web page of this extensions

[http://joose.github.com/Joose/doc/html/Joose.html](http://joose.github.com/Joose/doc/html/Joose.html)

General documentation for Joose


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

[JooseX.CPS.Continuation]: CPS/Continuation.html
[JooseX.CPS.ControlFlow]: CPS/ControlFlow.html

*/
