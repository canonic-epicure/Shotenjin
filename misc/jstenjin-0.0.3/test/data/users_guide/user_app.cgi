#!/usr/bin/env js -f

load('tenjin.js');

// set action ('create' or 'edit')
var action = 'create';

// set context data
var title, params;
if (action == 'create') {
    title = 'Create User';
    params = {};
}
else {
    title = 'Edit User';
    params = {
        name: 'Margalette',
        email: 'meg@example.com',
        gender: 'f',
        id: 123
    };
}
var context = { title: title, params: params };

// create engine object
var layout = ':layout';   // or 'user_layout.jshtml'
var engine = new Tenjin.Engine({prefix:'user_', postfix:'.jshtml', layout:layout});

// evaluate template
var template_name = ':'+action;   // ':create' or ':edit'
var output = engine.render(template_name, context);
print(output);
