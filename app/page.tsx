import ReadingBlur from "@/components/widgets/ReadingBlur";
import ThemeMakerWindow from "./design/theme-maker/ThemeMakerWindow";

export default function ThemeMakerPage() {
  return (
    <>
      <ReadingBlur className="md:hidden" />
      <ThemeMakerWindow />
    </>
  );
}
