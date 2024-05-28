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
    </div>
  );
}
