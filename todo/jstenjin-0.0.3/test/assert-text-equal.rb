###
### $Rev: 21 $
### 0.0.3
### Copyright(c) 2007-2008 kuwata-lab.com all rights reserved
###

require 'test/unit'
require 'tempfile'


module Test
  module Unit
    class TestCase

      def assert_text_equal(expected, actual, desc=nil, diffopt='-u', flag_cut=true)
        if expected == actual
          assert(true)
          return
        end
        if expected[-1] != ?\n || actual[-1] != ?\n
          expected += "\n"
          actual   += "\n"
        end
        begin
          expfile = Tempfile.new(".expected.")
          expfile.write(expected); expfile.flush()
          actfile = Tempfile.new(".actual.")
          actfile.write(actual);   actfile.flush()
          diff = `diff #{diffopt} #{expfile.path} #{actfile.path}`
        ensure
          expfile.close(true) if expfile
          actfile.close(true) if actfile
        end
        # cut 1st & 2nd lines
        message = flag_cut ? diff.gsub(/\A.*\n.*\n/, '') : diff
        message = "#{desc}\n#{message}" if desc
        #raise Test::Unit::AssertionFailedError.new(message)
        assert_block(message) { false }  # or assert(false, message)
      end

      alias assert_equal_with_diff assert_text_equal    # for compatibility
      alias assert_text_equals     assert_text_equal    # for typo

    end
  end
end
