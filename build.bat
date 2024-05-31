@echo off
setlocal

REM Get the directory of the script
set "SCRIPT_DIR=%~dp0"
set "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"

REM Check if the current directory is the same as the script's directory
if /I "%cd%" neq "%SCRIPT_DIR%" (
    echo Error: Script is not running in the intended directory.
    echo Current directory: %cd%
    echo Expected directory: %SCRIPT_DIR%
    exit /b 1
)

REM Run npm install
echo Running npm install...
npm install
if %errorlevel% neq 0 (
    echo npm install failed. Aborting.
    exit /b 1
)
echo npm install completed successfully.

REM Remove the ./out directory
if exist out (
    rmdir /s /q out
    if %errorlevel% neq 0 (
        echo Failed to remove the .\out directory. Aborting.
        exit /b 1
    )
)

REM Run npm run build
echo Running npm run build...
npm run build
if %errorlevel% neq 0 (
    echo npm run build failed. Aborting.
    exit /b 1
)
echo npm run build completed successfully.

endlocal
