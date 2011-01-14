Class('Shotenjin', {
    
    isa     : Joose.Meta.Class,
    meta    : Joose.Meta.Class,
    
    does    : 'JooseX.Meta.Lazy',
    
    use     : 'Shotenjin.Template',
    
    
    
    has : {
        defaultSuperClass       : Joose.I.FutureClass('Shotenjin.Template'),
        
        templateInstance        : {
            
            lazy : function () {
                return new this.c(this.forceInstance)
            }
        },
        templateSources         : null,
        
        forceInstance           : Joose.I.Object
    },
    
    
    builder : {
        
        methods : {
            
            template : function (meta, info) {
                if (typeof info == 'string')
                    meta.templateSources = info
                else
                    meta.templateSources = info.sources
            }
        }
    },
    
    
    after : {
        
        afterMutate : function () {
            this.getTemplateInstance().setSources(this.templateSources)
        }
    },
    
    
    methods : {
        
        defaultConstructor : function () {
            var meta = this
            var previous = this.SUPER()
            
            return function (stash) {
                if (stash == meta.forceInstance) 
                    return previous.call(this)
                else
                    return new String(meta.templateInstance.render(stash))
            }
        }        
    },

    
    body : function () {
        Joose.Namespace.Manager.my.register('Template', Shotenjin)
    }
})
