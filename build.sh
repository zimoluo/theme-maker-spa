SCRIPT_DIR=$(dirname "$(realpath "$0")")

if [ "$(pwd)" != "$SCRIPT_DIR" ]; then
    echo "Error: Script is not running in the intended directory."
    echo "Current directory: $(pwd)"
    echo "Expected directory: $SCRIPT_DIR"
    exit 1
fi

npm install
if [ $? -ne 0 ]; then
    echo "npm install failed. Aborting."
    exit 1
fi
echo "npm install completed successfully."

rm -rf ./out
npm run build
