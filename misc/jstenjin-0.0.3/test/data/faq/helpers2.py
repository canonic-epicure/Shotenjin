## define helper method
def link_to(label, href=None, action=None, id=None):
    if not href and action:
        if id:
            href = "/%s/%s/%s" % (controller_name, action, id)
        else:
            href = "/%s/%s" % (controller_name, action)
    return '<a href="%s">%s</a>' % (href, label)

## import all helper methods to use preprocessing
import tenjin
from tenjin.helpers import *

## 
controller_name = 'user'
context = { 'user': {'id': 123, 'name': 'Tom&Jerry'} }
engine = tenjin.Engine(preprocess=True)
print '***** preprocessed *****'
print engine.get_template('helpers2.pyhtml', context).script,
print '***** output *****'
print engine.render('helpers2.pyhtml', context),
