import createMDX from "@next/mdx";
import rehypeStarryNight from "rehype-starry-night";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      })
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

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeStarryNight],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
