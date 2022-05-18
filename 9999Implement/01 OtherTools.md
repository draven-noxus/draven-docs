替换同级文件夹下文件名

```powershell
@echo off
title the char replace
mode con cols=60 lines=20
::not equals or  alert
setlocal EnableDelayedExpansion & color 0a
:1
set a=
set b=
set c=
cls&echo.
set /p a= get replaced the name:
cls&echo.
set /p b= input the '!a!' ,if not replace '!a!', please enter or  continue the new char or string:
for /f "delims=" %%a in ('dir /b /a /a-d') do (
if "%%~fa" neq "%~0" (
set xz=%%~na
ren "%%~fa" "!xz:%a%=%b%!%%~xa" ))
cls&echo.&set /p c= over, input 0 return, else exits
if "!c!"=="0" (goto 1) else (exit)
GOTO :EOF
```

