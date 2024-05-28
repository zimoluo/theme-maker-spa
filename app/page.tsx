import ReadingBlur from "@/components/widgets/ReadingBlur";
import { Metadata } from "next";
import ThemeMakerWindow from "./design/theme-maker/ThemeMakerWindow";

export const metadata: Metadata = {
  title: "Theme Maker - Zimo Web",
  description:
    "Customize the appearance and the aesthetics of Zimo Web using theme profiles.",
  keywords:
    "Zimo Web, Zimo Luo, Color, Personal Website, Color Palette, Palette, Theme, Design, Editor, Web app, Theme Editor, Theme Maker, Interactive, Responsive, Online editor",
};

export default function ThemeMakerPage() {
  return (
    <>
      <ReadingBlur className="md:hidden" />
      <ThemeMakerWindow />
    </>
  );
}
