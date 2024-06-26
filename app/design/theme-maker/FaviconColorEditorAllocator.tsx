"use client";

import { Fragment, ReactNode } from "react";
import { useFaviconEditor } from "./FaviconEditorContext";
import FaviconGradientStopsPositionGenerator from "./FaviconGradientStopsPositionGenerator";
import FaviconColorPanelPropsGenerator from "./FaviconColorPanelPropsGenerator";
import FaviconAngleEditor from "./FaviconAngleEditor";
import editorStyle from "./favicon-editor.module.css";

export default function FaviconColorEditorAllocator() {
  const { faviconConfig } = useFaviconEditor();

  const faviconColorEditor = (
    <Fragment key="faviconColorEditor">
      <div className="h-4 pointer-events-none select-none" aria-hidden="true" />
      <div className={`${editorStyle.angleAndStopPositionGrid}`}>
        <FaviconAngleEditor />
        <FaviconGradientStopsPositionGenerator />
      </div>
      <div className="h-4 pointer-events-none select-none" aria-hidden="true" />
      <div className="w-full h-56 grid">
        <FaviconColorPanelPropsGenerator />
      </div>
    </Fragment>
  );

  const propertiesEditorMap: Record<FaviconMode, ReactNode> = {
    backdrop: null,
    custom: null,
    outline: null,
    overall: faviconColorEditor,
    separate: faviconColorEditor,
  };

  return propertiesEditorMap[faviconConfig.mode];
}
