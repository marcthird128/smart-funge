@echo off

echo Clearing test folder
rmdir /s /q test
mkdir test

echo Copying...
copy build\bundle.min.js test\bundle.min.js
copy src\html\index.html test\index.html
xcopy src\assets test\assets /s /i

echo Setup complete. test files ready in ./test

echo Done.
