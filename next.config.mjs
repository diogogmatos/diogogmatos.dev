import createMDX from "@next/mdx";
import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      }),
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      crypto: false,
      fs: false,
      path: false,
      os: false,
      net: false,
      tls: false,
      child_process: false,
    };
    return config;
  },
  // The OG image's fonts, which it finds through fonts.conf, so they aren't picked up on their own
  outputFileTracingIncludes: {
    "/api/og": [
      "./src/app/api/og/fonts.conf",
      "./src/app/fonts/Inter-Variable.ttf",
      "./src/app/fonts/PPEditorialNew-Regular.otf",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
    ],
  },
};

const withMDX = createMDX({});

// withContentCollections goes on the outside, since it returns a promise of the config. Another
// plugin around it gets the promise instead of the config, and everything above is lost
const finalConfig = await withContentCollections(withMDX(nextConfig));

if (finalConfig.experimental?.turbo) {
  finalConfig.turbopack = {};
  delete finalConfig.experimental.turbo;
}

export default finalConfig;
