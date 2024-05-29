import { MetadataRoute } from "next";

const environment = "development";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Theme Maker",
    short_name: "Theme Maker",
    description: "Theme Maker of Zimo Web.",
    start_url: "/index.html",
    display: "standalone",
    icons: [
      {
        src: `/website-favicon/${environment}/favicon-96x96.png`,
        type: "image/png",
        sizes: "96x96",
      },
      {
        src: `/website-favicon/${environment}/favicon-192x192.png`,
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: `/website-favicon/${environment}/favicon-1024x1024.png`,
        type: "image/png",
        sizes: "1024x1024",
      },
      {
        src: `/website-favicon/${environment}/favicon-180x180.png`,
        type: "image/png",
        sizes: "180x180",
      },
    ],
  };
}
