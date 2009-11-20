Class('My.Template', {
    
    meta : 'Shotenjin.Joosed',
    
    template : {
        /*tj
            Hello [% name %]!
            <ul>
            [%\
                for (var i = 0, n = items.length; i < n; i++) { 
            %]
                    <li>[%= items[i] %]</li>
            [% 
                } 
            %]
            </ul>
        
        
            <div class="thumbnail photoThumbnailMid medium12">
                
                <p class="centered ">[%js name %]</p>
                
                <div class="x-rawbackground paper1 photo">
                    ${ App.my('/Travel::MainLayout.center/Travel::Photo::Single',{ 'photo_id' = current_photo.id } ) } <img width=170 height=170 src="[% src(current_photo.path, 170, 170, 'place') %]"></a>
                    
                    <?= this.customFunc({ 'photo_id' = current_photo.id }) ?>.my('/Travel::MainLayout.center/Travel::Photo::Single', ) }
                </div>
                \
                <div class="righted">
                    ${ I18n.words.added_by }: [% a('/Travel::MainLayout.center/Travel::User::Single',{ 'user_id' = current_photo.creator_id } ) %]<span class="lightgray2">[% current_photo.creator %]</span></a><br>
                </div>
            </div>
        tj*/
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


