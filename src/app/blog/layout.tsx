import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL("https://diogogmatos.dev"),
    title: "Blog | Diogo Matos",
    description: "Check out blog posts about my projects and other topics.",
    keywords: [
      "blog",
      "posts",
      "projects",
      "software engineer",
      "developer",
      "diogo matos",
    ],
    openGraph: {
      url: "/blog",
      type: "website",
      title: "Blog | Diogo Matos",
      description: "Check out blog posts about my projects and other topics.",
      images: [
        {
          url: "/images/og.jpg",
          width: 1200,
          height: 630,
          alt: "diogogmatos.dev",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | Diogo Matos",
      description: "Check out blog posts about my projects and other topics.",
      images: [
        {
          url: "/images/og.jpg",
          width: 1200,
          height: 630,
          alt: "diogogmatos.dev",
        },
      ],
    },
    alternates: {
      canonical: "/blog",
    },
  };
}

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
