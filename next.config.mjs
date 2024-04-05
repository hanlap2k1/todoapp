/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async headers() {
        return [
          {
            source: '/about',
            headers: [
              {
                key: 'x-custom-header',
                value: 'my custom header value',
              },
              {
                key: 'x-another-custom-header',
                value: 'my other custom header value',
              },
            ],
          },
        ]
      },
};

export default nextConfig;
