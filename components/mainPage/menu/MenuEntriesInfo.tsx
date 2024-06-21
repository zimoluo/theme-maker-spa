import Link from "next/link";

export default function MenuEntriesInfo() {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <p className="text-center text-sm">
        &copy; 2024 Zimo Luo. All rights reserved. Version {process.env.version}
        . Software released under{" "}
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
  );
}
