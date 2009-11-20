## define helper method
def link_to(label, href=None, action=None):
    if not href and action:
        href = "/%s/%s" % (controller_name, action)
    return '<a href="%s">%s</a>' % (href, label)

## import all helper methods to use preprocessing
import tenjin
from tenjin.helpers import *

## 
controller_name = 'user'
engine = tenjin.Engine(preprocess=True)
print '***** preprocessed *****'
print engine.get_template('helpers1.pyhtml').script,
print '***** output *****'
print engine.render('helpers1.pyhtml'),
