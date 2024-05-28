import BackgroundAnimation from "./BackgroundAnimation";
import BackgroundImage from "./BackgroundImage";
import NavbarWrapper from "./NavbarWrapper";
import MenuEntriesLayout from "./menu/MenuEntriesLayout";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function MainPageElements({ children, className = "" }: Props) {
  return (
    <>
      <BackgroundImage />
      <BackgroundAnimation />
      <NavbarWrapper menuContent={<MenuEntriesLayout />} />
      <main className={className}>{children}</main>
    </>
  );
}
