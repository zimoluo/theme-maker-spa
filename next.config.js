/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "./",
  output: "export",
  images: {
    domains: [
      "zimo-web-bucket.s3.us-east-2.amazonaws.com",
      "lh3.googleusercontent.com",
      "uimg.ngfiles.com",
    ],
  },
};

module.exports = nextConfig;
