import entryStyle from "./misc-entry.module.css";
import MiscEntryInput from "./MiscEntryInput";

const miscEntries: (keyof ThemeMiscOptions)[] = ["readingBlur"];

export default function MiscEntryArea() {
  return (
    <div
      className={`w-full ${entryStyle.height} bg-light bg-opacity-80 rounded-xl shadow-lg p-4 grid grid-cols-1 items-start overflow-y-auto gap-4`}
    >
      {miscEntries.map((entry, index) => {
        return <MiscEntryInput key={index} entry={entry} />;
      })}
    </div>
  );
}
