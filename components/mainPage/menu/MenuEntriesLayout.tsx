import Link from "next/link";
import MenuEntriesSettings from "./MenuEntriesSettings";
import MenuEntriesUtility from "./MenuEntriesUtility";

export default function MenuEntriesLayout() {
  return (
    <div className="h-full w-full overflow-y-auto px-6 md:px-8 py-8">
      <div className="rounded-2xl w-full bg-widget-40 shadow-lg px-6 py-0 my-6 text-lg md:text-xl border-primary border-0.8 border-opacity-20">
        <MenuEntriesSettings />
      </div>

      <div className="rounded-2xl w-full bg-widget-40 shadow-lg px-6 py-0 my-6 text-lg md:text-xl border-primary border-0.8 border-opacity-20">
        <MenuEntriesUtility />
      </div>

      <div className="w-full flex items-center justify-center p-4">
        <p className="text-center text-sm">
          &copy; 2024 Zimo Luo. All rights reserved. Software released under{" "}
          <Link
            target="_blank"
            href="https://www.gnu.org/licenses/agpl-3.0.en.html"
            className="hover:underline underline-offset-2"
          >
            GNU&nbsp;AGPL&nbsp;3.0
          </Link>
          .{" "}
          <Link
            target="_blank"
            href="https://www.zimoluo.me/management/terms-of-use-theme-maker"
            className="hover:underline underline-offset-2"
          >
            Terms&nbsp;of&nbsp;Use
          </Link>{" "}
          apply.
        </p>
      </div>
    </div>
  );
}
