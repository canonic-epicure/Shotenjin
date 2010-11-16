var input = '\
<ul>\n\
<?js for (var i = 0, n = items.length; i < n; i++) { ?>\n\
  <li>${items[i]}</li>\n\
<?js } ?>\n\
</ul>\n\
';
load('shotenjin.js');
var context = {items: ['AAA','BBB','CCC']};
var output = Shotenjin.render(input, context);
