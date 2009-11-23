Class('Shotenjin.Joosed.Template', {
    
    have : {
        escapeTable : { 
            '&'     : '&amp;', 
            '<'     : '&lt;', 
            '>'     : '&gt;', 
            '"'     : '&quot;' 
        }
    },
    
    has : {
        stash                   : null,
        
        startTag                : '[%',
        endTag                  : '%]',
        
        statementTagModifier    : '\\',
        expressionTagModifier   : '=',
        
        sources                 : { is : 'rw' },
        isCompiled              : false,
        
        compiled                : null
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
        },
            
        
        expandStashToVarsCode : function (stash) {
            var buf = []
            
            Joose.O.each(stash || {}, function (value, name) {
                buf.push("var ", name, " = stash['", name, "']\n")
            })
            
            return buf.join('')
        },
        
        
        render : function (stash) {
            if (!this.isCompiled) this.compile()
            
            return this.compiled.call(this, Joose.O.getMutableCopy(stash))
        },
        
        
        setSources : function (sources) {
            this.isCompiled = false
            
            this.sources = sources 
        },
        
        
        compile : function () {
            this.compiled = eval(this.parse(this.sources))
            
            this.isCompiled = true
        },
        
        
        parse : function (source) {
            source = this.trimMulti(source || '')

            var statementRegexSource = this.escapeRe(this.startTag + this.statementTagModifier) + '((?:.|\\n)*?)' + this.escapeRe(this.endTag) + '\\n?'
            var statementRegex = new RegExp(statementRegexSource, 'g')
            
            
            var result = [
                'var __a = (function (stash) { ',
                    'var _output = []; var _me = this; ',
                    'eval(this.expandStashToVarsCode(stash)); '
            ]
            
            this.splitAndProcess(result, statementRegex, source, this.emitExpressions, this.emitCode)
            
            result.push(
                    '; return _output.join(""); ',
                '}); __a'
            )
            
            return result.join('')
        },
        
        
        emitCode : function (result, match) {
            result.push(match[1])
        },
        
        
        emitExpressions : function (result, source) {
            var expressionRegexSource = this.escapeRe(this.startTag) + '((' + this.escapeRe(this.expressionTagModifier) + ')?((?:.|\\n)*?))' + this.escapeRe(this.endTag) + '\\n?'
            var expressionRegex = new RegExp(expressionRegexSource, 'g')
            
            
            result.push(
                ';_output.push('
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
            
            if (match[2] == this.expressionTagModifier)
                result.push(match[3])
            else
                result.push(
                    '_me.escapeXml(' + match[1] + ')'
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
        }
        
        
    }
    //eof methods
    
})
