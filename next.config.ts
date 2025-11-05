import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import fs from 'fs';
 
const nextConfig: NextConfig = {
    // devServer: {
    //   https: {
    //     key: fs.readFileSync('./certificates/localhost.key'),
    //     cert: fs.readFileSync('./certificates/localhost.crt'),
    //   },
    // },
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);