"use client";

import CrossIcon from "@/components/assets/CrossIcon";
import DuplicateIcon from "@/components/assets/entries/DuplicateIcon";
import ReverseIcon from "@/components/assets/entries/ReverseIcon";
import { useInputParser } from "@/lib/helperHooks";
import { isStringNumber } from "@/lib/generalHelper";
import { useGradientStopsPosition } from "./GradientStopsPositionContext";

export default function StopsEditorUtil() {
  const {
    appendGradientStop,
    modifyGradientStop,
    gradientStops,
    deleteGradientStop,
    gradientStopIndex,
    currentGradientStop,
    updateGradientStopsDirectly,
  } = useGradientStopsPosition();

  const duplicateCurrentStop = () => {
    const newCurrentGradientStopData = structuredClone(currentGradientStop);

    const offset = 5;
    newCurrentGradientStopData.at +=
      newCurrentGradientStopData.at > 100 - offset ? -offset : offset;

    appendGradientStop(newCurrentGradientStopData);
  };

  const reverseStops = () => {
    const clonedStops = structuredClone(gradientStops);

    const modifiedStops = clonedStops.map((stop): GradientStop => {
      stop.at = Math.max(0, Math.min(100, 100 - stop.at));
      return stop;
    });

    updateGradientStopsDirectly(modifiedStops);
  };

  const [displayAt, handleAtInputChange] = useInputParser<number>({
    value: currentGradientStop.at,
    setValue: (newAt: number) =>
      modifyGradientStop({
        at: newAt,
      }),
    isValid: isStringNumber,
    formatValue: (rawInput: string) =>
      Math.max(0, Math.min(100, parseFloat(parseFloat(rawInput).toFixed(2)))) ||
      0,
  });

  return (
    <div className="flex items-center justify-center h-8 mb-1 w-full gap-1">
      <div className="shrink-0 flex items-center justify-center text-sm gap-1.5">
        <p>At</p>
        <input
          value={displayAt}
          onChange={handleAtInputChange}
          className="w-12 h-6 bg-none bg-pastel bg-opacity-80 rounded-md text-sm text-center py-0.5 px-1"
        />
      </div>
      <div className="flex-grow select-none pointer-events-none" />
      <div className="h-full w-auto flex items-center gap-2.5 shrink-0">
        {gradientStops.length > 2 && (
          <button
            className="h-5 w-auto aspect-square transition-transform duration-300 ease-out hover:scale-110"
            onClick={() => deleteGradientStop(gradientStopIndex)}
          >
            <CrossIcon className="h-full w-auto aspect-square" />
          </button>
        )}
        <button
          className="h-5 w-auto aspect-square transition-transform duration-300 ease-out hover:scale-110"
          onClick={duplicateCurrentStop}
        >
          <DuplicateIcon className="h-full w-auto aspect-square" />
        </button>
        <button
          className="h-5 w-auto aspect-square transition-transform duration-300 ease-out hover:scale-110"
          onClick={reverseStops}
        >
          <ReverseIcon className="h-full w-auto aspect-square" />
        </button>
      </div>
    </div>
  );
}