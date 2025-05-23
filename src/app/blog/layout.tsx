import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
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
      url: "https://diogogmatos.dev/blog",
      type: "website",
      title: "Blog | Diogo Matos",
      description: "Check out blog posts about my projects and other topics.",
      images: [
        {
          url: "https://diogogmatos.dev/images/og.jpg",
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
          url: "https://diogogmatos.dev/images/og.jpg",
          width: 1200,
          height: 630,
          alt: "diogogmatos.dev",
        },
      ],
    },
    alternates: {
      canonical: "https://diogogmatos.dev/blog",
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
