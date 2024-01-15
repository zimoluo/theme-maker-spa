"use client";

import { useSettings } from "@/components/contexts/SettingsContext";
import Image from "next/image";
import homeStyle from "./home.module.css";
import { usePathname } from "next/navigation";

export default function HomeAnimatedBackground() {
  const { settings } = useSettings();
  const pathname = usePathname();

  return (
    <>
      {settings.backgroundRichness === "rich" && (
        <>
          <div
            className={`fixed inset-0 -z-20 flex items-center justify-center pointer-events-none select-none ${homeStyle["move-1"]}`}
          >
            <Image
              src="/theme/animated-background/home/moving-1.svg"
              height="0"
              width="0"
              className="object-cover w-full h-full"
              alt="Background moving image 1"
              placeholder="empty"
              aria-hidden="true"
              priority={true}
            />
          </div>

          <div
            className={`fixed inset-0 -z-20 flex items-center justify-center pointer-events-none select-none ${homeStyle["move-3"]}`}
          >
            <Image
              src="/theme/animated-background/home/moving-3.svg"
              height="0"
              width="0"
              className="object-cover w-full h-full"
              alt="Background moving image 3"
              placeholder="empty"
              aria-hidden="true"
              priority={true}
            />
          </div>
        </>
      )}

      {pathname === "/" && (
        <>
          <div className="absolute inset-0 -z-10 top-4 hidden md:block">
            <Image
              src="/theme/animated-background/home/zimo-text.svg"
              height="0"
              width="0"
              className="object-cover w-full h-auto"
              alt="Zimo Text"
              placeholder="empty"
              aria-hidden="true"
              priority={true}
            />
          </div>

          <div className="absolute inset-0 -z-10 top-4 md:hidden">
            <Image
              src="/theme/animated-background/home/zimo-text-mobile.svg"
              height="0"
              width="0"
              className="object-cover w-full h-auto"
              alt="Zimo Text"
              placeholder="empty"
              aria-hidden="true"
              priority={true}
            />
          </div>
        </>
      )}

      {settings.backgroundRichness === "rich" && (
        <div
          className={`fixed inset-0 -z-10 flex items-center justify-center pointer-events-none select-none ${homeStyle["move-2"]}`}
        >
          <Image
            src="/theme/animated-background/home/moving-2.svg"
            height="0"
            width="0"
            className="object-cover w-full h-full"
            alt="Background moving image 2"
            placeholder="empty"
            aria-hidden="true"
            priority={true}
          />
        </div>
      )}
    </>
  );
}
