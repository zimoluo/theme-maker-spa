"use client";

import selectorStyle from "./layer-selector.module.css";
import GradientLayerRow from "./GradientLayerRow";
import { useGradientData } from "./GradientDataContext";
import LayerSelectorUtilButtons from "./LayerSelectorUtilButtons";

export default function GradientLayerSelector() {
  const { selectedLayer } = useGradientData();

  return (
    <div
      className={`rounded-xl bg-light bg-opacity-80 shadow-lg p-4 ${selectorStyle.container}`}
    >
      <div className="flex justify-end gap-2.5">
        <LayerSelectorUtilButtons />
      </div>
      <div className={`overflow-y-auto relative ${selectorStyle.gridWrapper}`}>
        <div className={`${selectorStyle.grid}`}>
          {selectedLayer.map((gradientData, index) => {
            return (
              <GradientLayerRow key={index} {...{ gradientData, index }} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
