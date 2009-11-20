Class('Shotenjin.Joosed.Template', {
    
    meta : 'Shotenjin.Joosed.Meta',
    
    
    has : {
        stash : null
    },
    
    
    my : {
        
        has : {
            targetMeta : null
        },
        
    
        methods : {

            render : function (stash) {
                var templateClass = this.targetMeta.c
                
                return new templateClass().render(stash)
            },
            
            
            renderAndWrap : function (templateClass, stash) {
            }
            
            
        }
    },

    
    methods : {
        
        render : function (stash) {
            this.stash = stash
            
            var compiled = this.meta.compiled
            
            return compiled.call(this, stash)
        },
        
        
        renderAndWrap : function (templateClass, stash) {
        },
        
        
        'include' : function (templateClass, stash) {
        
        } 
        
    }
    
})






Shotenjin.Template.prototype = {


	render: function(_context) {
		if (_context) {
			eval(Shotenjin._setlocalvarscode(_context));
		}
		else {
			_context = {};
		}
		return eval(this.program);
	},

};


/*
 *  convenient function
 */
Shotenjin.render = function(template_str, context) {
	var template = new Shotenjin.Template();
	template.convert(template_str);
	var output = template.render(context);
	return output;
};

