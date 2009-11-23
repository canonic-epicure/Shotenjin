use inc::Module::JSAN::DSL;

name            Shotenjin.Joosed

version         0.01
author          'Nickolay (SamuraiJack) Platonov <root@symbie.org>'

abstract        'Post-modern javascript templating system'
license         mit


requires        Joose                           3.01
requires        JooseX.Meta.Lazy                0.01
requires        JooseX.Namespace.Depended       0.01

test_requires   Test.Run                        0.03

docs_markup     mmd

install_script  'script/shotenjin_embed.pl'