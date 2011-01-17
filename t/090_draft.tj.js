Class('My.Template', {
    
    meta : 'Shotenjin',
    
    template : {
        /*tj

            [%\
                var pos = 1
                
                Joose.O.each(stash, function (value, name) {
                    if (pos % 2) {
            %]
            
                        [% "name: [" + name + "], value: [" + value + "]" %]
                        
            [%\
                    } else {
            %]
                        [% "value: [" + value + "], name: [" + name + "]" %]
            [%\
                    }
                    
                    pos++
                })
            %]
        
        tj*/
    },

    
    methods : {
        
        customFunc : function (p1, p2) {
            return format(p1, p2, this.stash.p3)
        }
    }
})




Class('Yah.Component', {

    does : 'Shotenjin.Methods',

    
    methods : {
        
        usualMethod : function () {

            var rowContent = this.row([ el1, el2 ])
            
            this.el.update(rowContent)
        }
    },


    templates : {
    
        cell : {
            /*tj(file:abc.tj.html)tj*/
        },
        
        row : {
            /*tj
            
                [%\ var superContent = this.SUPER(stash) %]
                
                Escaped content from super method : [% superContent %] 
                
                Raw content from super method : [%= superContent %]
            
            tj*/
        },
        
        
        foo : {
            /*tj
            
                [%\ var wrappedContent = this.wrapper('row', stash, function () { %]
                
                    
                
                [% }) %]
                
                Escaped content from super method : [% wrappedContent %] 
                
                Raw content from super method : [%= wrappedContent %]
                
                Content from row: [%= this.row %]
            
            tj*/
        }
    }
})


var comp = new Yah.Component({
    
    templates : {
        
        row : {}
    }
})




value = function (stash) {
    
    var template = this.templates[ name ] = this.templates[ name ] || new Tpl()
    
    return template.render(stash, this)
}