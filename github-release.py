import subprocess
import requests
import os
from dotenv import load_dotenv
import platform
import shutil
import json
import zipfile


def main():
    # Load environment variables
    load_dotenv('.env.local')

    # GitHub credentials and repository details
    GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
    GITHUB_REPO = os.getenv('GITHUB_REPO')
    GITHUB_API_URL = f'https://api.github.com/repos/{GITHUB_REPO}/releases'

    VERSION = '1.6.2'

    # Determine the script to run based on the operating system
    if platform.system() == 'Windows':
        shell_script_path = 'build.bat'
    else:
        shell_script_path = './build.sh'

    # Execute the shell script
    try:
        result = subprocess.run([shell_script_path], check=True, shell=True)
        print("Shell script executed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error executing shell script: {e}")
        exit(1)

    # Function to check if a tag exists on GitHub

    def tag_exists(tag_name):
        response = requests.get(
            f'https://api.github.com/repos/{GITHUB_REPO}/git/refs/tags/{tag_name}')
        return response.status_code == 200

    def delete_github_release(tag_name):
        headers = {
            'Authorization': f'token {GITHUB_TOKEN}',
            'Accept': 'application/vnd.github.v3+json'
        }
        # Get the release information
        response = requests.get(GITHUB_API_URL, headers=headers)
        if response.status_code == 200:
            releases = response.json()
            for release in releases:
                if release['tag_name'] == tag_name:
                    release_id = release['id']
                    # Delete the release
                    delete_release_url = f"{GITHUB_API_URL}/{release_id}"
                    delete_response = requests.delete(
                        delete_release_url, headers=headers)
                    if delete_response.status_code == 204:
                        print("Existing release deleted successfully.")
                    else:
                        print(
                            f"Failed to delete the release: {delete_response.status_code}")
                        print(delete_response.json())
                        exit(1)
                    break
        else:
            print(f"Failed to get releases: {response.status_code}")
            print(response.json())
            exit(1)

        # Delete the tag
        tag_url = f"https://api.github.com/repos/{GITHUB_REPO}/git/refs/tags/{tag_name}"
        delete_tag_response = requests.delete(tag_url, headers=headers)
        if delete_tag_response.status_code == 204:
            print("Existing tag deleted successfully.")
        else:
            print(
                f"Failed to delete the tag: {delete_tag_response.status_code}")
            print(delete_tag_response.json())
            exit(1)

    def create_github_release(tag_name, release_name, description):
        headers = {
            'Authorization': f'token {GITHUB_TOKEN}',
            'Accept': 'application/vnd.github.v3+json'
        }
        payload = {
            'tag_name': tag_name,
            'name': release_name,
            'body': description,
            'draft': False,
            'prerelease': False
        }

        response = requests.post(GITHUB_API_URL, json=payload, headers=headers)

        if response.status_code == 201:
            print("GitHub release created successfully.")
            return response.json()
        else:
            print(f"Failed to create GitHub release: {response.status_code}")
            print(response.json())
            exit(1)

    # Get the tag name from the user
    tag_name = f'v{VERSION}'

    # Check if the tag already exists
    if tag_exists(tag_name):
        confirm = input(
            f"Tag {tag_name} already exists. Do you want to overwrite it? (yes/no): ")
        if confirm.lower() != 'yes':
            print("Release aborted.")
            exit(0)
        else:
            delete_github_release(tag_name)

    description = "This is an automated release. Check the commit history for details."
    description_file_path = './github-release-description.json'

    if os.path.isfile(description_file_path):
        try:
            with open(description_file_path, 'r') as f:
                descriptions = json.load(f)
                if tag_name in descriptions and isinstance(descriptions[tag_name], list):
                    description = '\n'.join(descriptions[tag_name])
        except json.JSONDecodeError:
            print("Error reading JSON file. Using default description.")
        except Exception as e:
            print(f"Unexpected error: {e}. Using default description.")

    # Define the release details
    release_name = f"Theme Maker SPA {tag_name}"

    # Create the GitHub release
    release_info = create_github_release(tag_name, release_name, description)

    # Copy LICENSE file to the ./out directory
    shutil.copy('LICENSE', './out')

    # Remove all .DS_STORE files in the ./out directory
    for root, dirs, files in os.walk('./out'):
        for file in files:
            if file == '.DS_STORE':
                os.remove(os.path.join(root, file))

    # Create a ZIP file of the ./out directory
    zip_filename = f'theme-maker-build-{tag_name}.zip'
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk('./out'):
            for file in files:
                file_path = os.path.join(root, file)
                zipf.write(file_path, os.path.relpath(file_path, './out'))

    # Function to upload an asset to a GitHub release

    def upload_asset_to_release(upload_url, file_path):
        headers = {
            'Authorization': f'token {GITHUB_TOKEN}',
            'Content-Type': 'application/octet-stream'
        }
        with open(file_path, 'rb') as f:
            response = requests.post(upload_url, headers=headers, data=f)
        if response.status_code == 201:
            print(f"Asset {file_path} uploaded successfully.")
        else:
            print(
                f"Failed to upload asset {file_path}: {response.status_code}")
            print(response.json())

    # Upload the ZIP file to the release
    asset_upload_url = release_info['upload_url'].replace(
        "{?name,label}", f"?name={zip_filename}")
    upload_asset_to_release(asset_upload_url, zip_filename)

    print("Script execution completed.")


if __name__ == '__main__':
    main()
