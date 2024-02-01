#!/bin/sh
#
# A hook that will verify PHP syntax in changed files before committing.
# The hook should exit with a non-zero staus after issuing an appropriate
# message if it wants to halt the commit.

status=0
for file in $(git status --porcelain | grep '.php' | grep -ve '^D' | grep -ve '-R' | awk '{ print $2; }'); do
        msg=$(php -l $file);

        if [ $? -gt 0 ]; then
                printf '\e[5;32;41mPre-commit error found. Won''t commit:\e[m '
                status=1
                echo $msg;
        fi
done

exit $status
