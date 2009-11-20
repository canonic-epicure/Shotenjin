var LANGUAGES = [
    ['en', 'Engilish'],
    ['fr', 'French'],
    ['de', 'German'],
    ['es', 'Spanish'],
    ['ch', 'Chinese'],
    ['ja', 'Japanese'],
];

function link_to(label, options) {
    if (! options) options = {};
    var action = options.action || null;
    var id     = options.id     || null;
    var buf = ['/app'];
    if (action) { buf.push(action); }
    if (id)     { buf.push(id); }
    var url = buf.join('/');
    return "<a href=\""+escape(url)+"\">"+label+"</a>";
}
