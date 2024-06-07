"use client";

import { Fragment } from "react";
import MenuUtilityButton from "./MenuUtilityButton";

export default function MenuEntriesUtility() {
  return ["resetSettings", "resetProfiles"].map((item, index) => (
    <Fragment key={item}>
      {index !== 0 && (
        <div className="border-primary border-0.4 border-opacity-20" />
      )}
      <MenuUtilityButton
        utility={item as MenuUtility}
        needsConfirm={["resetProfiles", "resetSettings"].includes(item)}
      />
    </Fragment>
  ));
}
