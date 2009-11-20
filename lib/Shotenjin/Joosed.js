Role('JooseX.CPS', {
    
    use : [ 'JooseX.CPS.Builder', 'JooseX.CPS.ControlFlow' ], 

    
    has : {
        continuedBuilder : null
    },
    
    
    after : {
        
        processStem : function () {
            this.continuedBuilder = new JooseX.CPS.Builder({ targetMeta : this })
            
            this.addRole(JooseX.CPS.ControlFlow)
        }
    },
    
    
    builder : {
        
        methods : {
            
            continued : function (meta, info) {
                
                meta.continuedBuilder._extend(info)
            }
        }
        
    }

})


/**

Name
====


JooseX.CPS - Some syntax sugar, enabling the [Continuation Passing Style](http://en.wikipedia.org/wiki/Continuation-passing_style) for Joose methods


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
