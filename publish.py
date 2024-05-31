import subprocess
import boto3
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
import mimetypes
import platform


def main():

    # Load environment variables
    load_dotenv('.env.local')

    # AWS credentials from .env.local
    AWS_KEY_ID = os.getenv('ZIMO_WEB_AWS_KEY_ID')
    AWS_SECRET_KEY = os.getenv('ZIMO_WEB_AWS_SECRET_KEY')

    # S3 bucket details
    BUCKET_NAME = 'zimo-web-theme-maker-spa'
    BUCKET_REGION = 'us-east-2'

    # Path to the shell script
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

    # Initialize boto3 S3 client
    s3_client = boto3.client(
        's3',
        region_name=BUCKET_REGION,
        aws_access_key_id=AWS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_KEY
    )

    # Create index.html content
    update_time = (datetime.now(timezone.utc) +
                   timedelta(minutes=5)).strftime('%Y-%m-%d %H:%M:%S UTC')

    index_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Under Maintenance</title>
</head>
<body>
    <h1>This website is currently being updated via an automated script.</h1>
    <p>Please check back and refresh the webpage by {update_time}. The actual completion time might be earlier.</p>
    <p>Thank you for your patience.</p>
</body>
</html>
"""

    # Write index.html to a file
    index_path = 'index.html'
    with open(index_path, 'w') as file:
        file.write(index_content)

    # Upload index.html to the S3 bucket root
    s3_client.upload_file(index_path, BUCKET_NAME, 'index.html',
                          ExtraArgs={'ContentType': 'text/html'})
    print("index.html uploaded to S3 bucket.")

    # List and delete all objects in the S3 bucket except index.html
    objects_to_delete = s3_client.list_objects_v2(Bucket=BUCKET_NAME)
    delete_keys = []
    if 'Contents' in objects_to_delete:
        for obj in objects_to_delete['Contents']:
            if obj['Key'] != 'index.html':
                delete_keys.append({'Key': obj['Key']})

    if delete_keys:
        s3_client.delete_objects(
            Bucket=BUCKET_NAME,
            Delete={'Objects': delete_keys}
        )
        print("Deleted all objects in the S3 bucket except index.html.")

    def get_content_type(file_path):
        content_type, _ = mimetypes.guess_type(file_path)
        if content_type is None:
            content_type = 'binary/octet-stream'
        return content_type

    # Upload all files in the ./out directory to the S3 bucket root except index.html
    out_dir = './out'
    for root, dirs, files in os.walk(out_dir):
        for file in files:
            if file == 'index.html':
                continue
            file_path = os.path.join(root, file)
            s3_key = os.path.relpath(file_path, out_dir)
            s3_client.upload_file(file_path, BUCKET_NAME, s3_key, ExtraArgs={
                                  'ContentType': get_content_type(file_path)})
            print(f"Uploaded {file_path} to S3 bucket as {s3_key}.")

    # Upload index.html at the last
    s3_client.upload_file('./out/index.html', BUCKET_NAME, 'index.html', ExtraArgs={
                          'ContentType': 'text/html'})
    print("Final index.html uploaded to S3 bucket.")

    print("Script execution completed.")


if __name__ == '__main__':
    main()
