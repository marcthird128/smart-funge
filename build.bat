@echo off

echo Deleting old builds
rmdir /s /q build
mkdir build

echo Building...
cmd /c webpack