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
};

const withMDX = createMDX({});

export default withMDX(withContentCollections(nextConfig));
