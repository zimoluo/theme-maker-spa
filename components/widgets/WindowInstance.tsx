import { useState, useRef, useEffect } from "react";
import windowStyle from "./window-instance.module.css";
import { useDragAndTouch } from "@/lib/helperHooks";
import { WindowActionProvider } from "../contexts/WindowActionContext";
import { useWindow, windowSoftTopBorder } from "../contexts/WindowContext";
import { useSettings } from "../contexts/SettingsContext";

interface Props {
  data: WindowData;
}

const parseWindowDimension = (dimension: WindowDimension): string => {
  if (typeof dimension === "number") {
    return `${dimension}px`;
  }

  if (dimension === "fit") {
    return "auto";
  }

  return "auto";
};

const parseWindowPosition = (position: number): string => {
  return `${position}px`;
};

export default function WindowInstance({ data }: Props) {
  const { removeWindowByUniqueId, setActiveWindow } = useWindow();

  const [windowState, setWindowState] = useState<WindowState>({
    x: 20,
    y: 20,
    height: data.defaultHeight,
    width: data.defaultWidth,
    data,
  });

  const [isMounted, setIsMounted] = useState(false);

  const { settings } = useSettings();

  const windowRef = useRef<HTMLDivElement>(null);

  const [isInterpolating, setIsInterpolating] = useState(false);

  const [isCloseButtonActive, setIsCloseButtonActive] = useState(false);

  const [windowStateBeforeFullscreen, setWindowStateBeforeFullscreen] =
    useState<WindowState | null>(null);

  const [windowDraggingData, setWindowDraggingData] = useState({
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
  });
  const [isWindowDragging, setIsWindowDragging] = useState(false);

  const [windowResizingData, setWindowResizingData] = useState({
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    beginWindowX: 0,
    beginWindowY: 0,
    lastClientX: 0,
    lastClientY: 0,
    aspectRatio: 0,
  });
  const [isWindowResizing, setIsWindowResizing] = useState(false);

  const [windowProportions, setWindowProportions] = useState({
    xProportion: 0,
    yProportion: 0,
  });

  const canBeMoved = !data.disableMove;
  const canBeResizedAtAll =
    (!data.disableHeightAdjustment && typeof data.defaultHeight === "number") ||
    (!data.disableWidthAdjustment && typeof data.defaultWidth === "number");

  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const startWidth = windowRef.current?.offsetWidth || 0;
    const startHeight = windowRef.current?.offsetHeight || 0;
    setWindowResizingData({
      startX: clientX,
      startY: clientY,
      startWidth,
      startHeight,
      beginWindowX: windowState.x,
      beginWindowY: windowState.y,
      lastClientX: clientX,
      lastClientY: clientY,
      aspectRatio: startWidth / (startHeight || 1),
    });
    setIsWindowResizing(true);
  };

  const widthClassConfig =
    typeof data.defaultWidth === "number" ? "w-full" : "w-auto";
  const heightClassConfig =
    typeof data.defaultHeight === "number" ? "h-full" : "h-auto";

  const handleResizeMove = (e: MouseEvent | TouchEvent | KeyboardEvent) => {
    if (
      e instanceof KeyboardEvent &&
      (!isWindowResizing || !["Shift", "Alt"].includes(e.key))
    ) {
      return;
    }

    e.preventDefault();

    setWindowStateBeforeFullscreen(null);

    const {
      startX,
      startY,
      startWidth,
      startHeight,
      beginWindowX,
      beginWindowY,
      aspectRatio,
    } = windowResizingData;

    const clientX =
      e instanceof KeyboardEvent
        ? windowResizingData.lastClientX
        : "touches" in e
        ? e.touches[0].clientX
        : e.clientX;
    const clientY =
      e instanceof KeyboardEvent
        ? windowResizingData.lastClientY
        : "touches" in e
        ? e.touches[0].clientY
        : e.clientY;

    setWindowResizingData((prev) => ({
      ...prev,
      lastClientX: clientX,
      lastClientY: clientY,
    }));

    const beginCenterX = beginWindowX + startWidth / 2;
    const beginCenterY = beginWindowY + startHeight / 2;
    const isShiftPressed = e.shiftKey;
    const isAltPressed = e.altKey;
    const isCenterResizing =
      !!isAltPressed === !!(settings.windowResizeBehavior === "corner");

    if (
      (data.disableWidthAdjustment || data.disableHeightAdjustment) &&
      isShiftPressed
    ) {
      return;
    }

    let deltaX = clientX - startX;
    let deltaY = clientY - startY;

    const minAspect = isShiftPressed ? aspectRatio : 0;
    const maxAspect = isShiftPressed ? aspectRatio : Infinity;

    if (isShiftPressed) {
      if (deltaX / aspectRatio > deltaY) {
        deltaY = deltaX / aspectRatio;
      } else {
        deltaX = deltaY * aspectRatio;
      }
    }

    let isAdaptiveOnX = false;
    let isAdaptiveOnY = false;

    // This function pipes the deltaX and deltaY through all the constraints and returns the processed values.
    // It also takes into account the adaptive flag at the point of execution.
    // It's used for both the adaptive projection and the actual processing.
    const processDeltasAndGetDimensions = (deltaX: number, deltaY: number) => {
      let processedDeltaX = deltaX;
      let processedDeltaY = deltaY;

      // First restrict the window min max width height.
      processedDeltaX = Math.min(
        ((data.maxWidth ?? Infinity) -
          startWidth -
          (isAdaptiveOnX ? beginWindowX - 24 : 0)) /
          (isCenterResizing && !isAdaptiveOnX ? 2 : 1),
        Math.max(
          processedDeltaX,
          ((data.minWidth ?? 0) -
            startWidth -
            (isAdaptiveOnX ? beginWindowX - 24 : 0)) /
            (isCenterResizing && !isAdaptiveOnX ? 2 : 1)
        )
      );
      processedDeltaY = Math.min(
        ((data.maxHeight ?? Infinity) -
          startHeight -
          (isAdaptiveOnY ? beginWindowY - windowSoftTopBorder : 0)) /
          (isCenterResizing && !isAdaptiveOnY ? 2 : 1),
        Math.max(
          processedDeltaY,
          ((data.minHeight ?? 0) -
            startHeight -
            (isAdaptiveOnY ? beginWindowY - windowSoftTopBorder : 0)) /
            (isCenterResizing && !isAdaptiveOnY ? 2 : 1)
        )
      );

      // Then check the left and bottom viewport borders.
      const bottomRightX = isCenterResizing
        ? beginCenterX + startWidth / 2 + processedDeltaX
        : beginWindowX + startWidth + processedDeltaX;
      const bottomRightY = isCenterResizing
        ? beginCenterY + startHeight / 2 + processedDeltaY
        : beginWindowY + startHeight + processedDeltaY;

      if (bottomRightX > window.innerWidth - 24) {
        processedDeltaX = isCenterResizing
          ? window.innerWidth - 24 - beginCenterX - startWidth / 2
          : window.innerWidth - 24 - beginWindowX - startWidth;
      } else if (bottomRightX < 24) {
        processedDeltaX = isCenterResizing
          ? 24 - beginCenterX - startWidth / 2
          : 24 - beginWindowX - startWidth;
      }

      if (bottomRightY > window.innerHeight - 36) {
        processedDeltaY = isCenterResizing
          ? window.innerHeight - 36 - beginCenterY - startHeight / 2
          : window.innerHeight - 36 - beginWindowY - startHeight;
      } else if (bottomRightY < windowSoftTopBorder) {
        processedDeltaY = isCenterResizing
          ? windowSoftTopBorder - beginCenterY - startHeight / 2
          : windowSoftTopBorder - beginWindowY - startHeight;
      }

      // Then check the aspect ratio limit of the window.
      if (
        (startWidth +
          processedDeltaX * (isCenterResizing && !isAdaptiveOnX ? 2 : 1) +
          (isAdaptiveOnX ? beginWindowX - 24 : 0)) /
          (startHeight +
            processedDeltaY * (isCenterResizing && !isAdaptiveOnY ? 2 : 1) +
            (isAdaptiveOnY ? beginWindowY - windowSoftTopBorder : 0)) >
        maxAspect
      ) {
        processedDeltaX =
          ((startHeight +
            processedDeltaY * (isCenterResizing && !isAdaptiveOnY ? 2 : 1) +
            (isAdaptiveOnY ? beginWindowY - windowSoftTopBorder : 0)) *
            maxAspect -
            startWidth -
            (isAdaptiveOnX ? beginWindowX - 24 : 0)) /
          (isCenterResizing && !isAdaptiveOnX ? 2 : 1);
        if (
          startWidth +
            processedDeltaX * (isCenterResizing && !isAdaptiveOnX ? 2 : 1) +
            (isAdaptiveOnX ? beginWindowX - 24 : 0) <
          (data.minWidth ?? 0)
        ) {
          processedDeltaY =
            ((data.minWidth ?? 0) / maxAspect -
              startHeight -
              (isAdaptiveOnY ? beginWindowY - windowSoftTopBorder : 0)) /
            (isCenterResizing && !isAdaptiveOnY ? 2 : 1);
          processedDeltaX =
            ((data.minWidth ?? 0) -
              startWidth -
              (isAdaptiveOnX ? beginWindowX - 24 : 0)) /
            (isCenterResizing && !isAdaptiveOnX ? 2 : 1);
        }
      } else if (
        (startWidth +
          processedDeltaX * (isCenterResizing && !isAdaptiveOnX ? 2 : 1) +
          (isAdaptiveOnX ? beginWindowX - 24 : 0)) /
          (startHeight +
            processedDeltaY * (isCenterResizing && !isAdaptiveOnY ? 2 : 1) +
            (isAdaptiveOnY ? beginWindowY - windowSoftTopBorder : 0)) <
        minAspect
      ) {
        processedDeltaY =
          ((startWidth +
            processedDeltaX * (isCenterResizing && !isAdaptiveOnX ? 2 : 1) +
            (isAdaptiveOnX ? beginWindowX - 24 : 0)) /
            minAspect -
            startHeight -
            (isAdaptiveOnY ? beginWindowY - windowSoftTopBorder : 0)) /
          (isCenterResizing && !isAdaptiveOnY ? 2 : 1);
        if (
          startHeight +
            processedDeltaY * (isCenterResizing && !isAdaptiveOnY ? 2 : 1) +
            (isAdaptiveOnY ? beginWindowY - windowSoftTopBorder : 0) <
          (data.minHeight ?? 0)
        ) {
          processedDeltaX =
            ((data.minHeight ?? 0) * minAspect -
              startWidth -
              (isAdaptiveOnX ? beginWindowX - 24 : 0)) /
            (isCenterResizing && !isAdaptiveOnX ? 2 : 1);
          processedDeltaY =
            ((data.minHeight ?? 0) -
              startHeight -
              (isAdaptiveOnY ? beginWindowY - windowSoftTopBorder : 0)) /
            (isCenterResizing && !isAdaptiveOnY ? 2 : 1);
        }
      }

      return {
        deltaX: processedDeltaX,
        deltaY: processedDeltaY,
      };
    };

    if (isCenterResizing && settings.windowResizeBehavior === "adaptive") {
      const projection = processDeltasAndGetDimensions(deltaX, deltaY);

      if (beginWindowX >= 24 && beginWindowX - projection.deltaX < 24) {
        isAdaptiveOnX = true;
      }

      if (
        beginWindowY >= windowSoftTopBorder &&
        beginWindowY - projection.deltaY < windowSoftTopBorder
      ) {
        isAdaptiveOnY = true;
      }

      // The overcounting check for adaptives.
      // If both are adaptive, we need to additionally project the width and "cut" the part and apply the min max aspect to see if the adaptive is still needed.
      if (isAdaptiveOnX && isAdaptiveOnY) {
        const projectedWidth =
          startWidth + projection.deltaX + beginWindowX - 24;
        const projectedHeight =
          startHeight + projection.deltaY + beginWindowY - windowSoftTopBorder;

        if (projectedWidth / projectedHeight > maxAspect) {
          const widthToCalculate = Math.max(
            projectedHeight * maxAspect,
            data.minWidth ?? 0
          );
          const newDeltaX = widthToCalculate - startWidth - (beginWindowX - 24);

          if (!(beginWindowX - newDeltaX < 24)) {
            isAdaptiveOnX = false;
          }
        }

        if (projectedWidth / projectedHeight < minAspect) {
          const heightToCalculate = Math.max(
            projectedWidth / minAspect,
            data.minHeight ?? 0
          );
          const newDeltaY =
            heightToCalculate -
            startHeight -
            (beginWindowY - windowSoftTopBorder);

          if (!(beginWindowY - newDeltaY < windowSoftTopBorder)) {
            isAdaptiveOnY = false;
          }
        }
      }
    }

    const finalDimensions = processDeltasAndGetDimensions(deltaX, deltaY);

    // This final width has considered adaptive.
    const finalWidth =
      startWidth +
      finalDimensions.deltaX * (isCenterResizing && !isAdaptiveOnX ? 2 : 1) +
      (isAdaptiveOnX ? beginWindowX - 24 : 0);
    const finalHeight =
      startHeight +
      finalDimensions.deltaY * (isCenterResizing && !isAdaptiveOnY ? 2 : 1) +
      (isAdaptiveOnY ? beginWindowY - windowSoftTopBorder : 0);

    let newX = isCenterResizing ? beginCenterX - finalWidth / 2 : beginWindowX;
    let newY = isCenterResizing ? beginCenterY - finalHeight / 2 : beginWindowY;

    if (isAdaptiveOnX) {
      newX = 24;
    }

    if (isAdaptiveOnY) {
      newY = windowSoftTopBorder;
    }

    if (data.disableWidthAdjustment) {
      newX = windowState.x;
    }

    if (data.disableHeightAdjustment) {
      newY = windowState.y;
    }

    setWindowState((prev) => ({
      ...prev,
      width: !data.disableWidthAdjustment ? finalWidth : prev.width,
      height: !data.disableHeightAdjustment ? finalHeight : prev.height,
      x: newX,
      y: newY,
    }));
  };

  const handleResizeEnd = () => {
    setIsWindowResizing(false);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setWindowDraggingData({
      startX: clientX,
      startY: clientY,
      startLeft: windowRef.current?.offsetLeft || 0,
      startTop: windowRef.current?.offsetTop || 0,
    });
    setIsWindowDragging(true);
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const { startX, startY, startLeft, startTop } = windowDraggingData;

    setWindowStateBeforeFullscreen(null);

    setWindowState((prev) => ({
      ...prev,
      x: Math.max(
        -(windowRef.current?.offsetWidth ?? 0) * 0.3 + 28,
        Math.min(
          startLeft + clientX - startX,
          window.innerWidth - (windowRef.current?.offsetWidth ?? 0) * 0.7 - 28
        )
      ),
      y: Math.max(
        -(windowRef.current?.offsetHeight ?? 0) + windowSoftTopBorder,
        Math.min(
          startTop + clientY - startY,
          window.innerHeight - 36 - (windowRef.current?.offsetHeight ?? 0)
        )
      ),
    }));
  };

  const handleDragEnd = () => {
    setIsWindowDragging(false);
  };

  const { handleStartDragging, handleStartTouching } = useDragAndTouch({
    onStart: handleDragStart,
    onMove: handleDragMove,
    onFinish: handleDragEnd,
  });

  const {
    handleStartDragging: handleStartResizing,
    handleStartTouching: handleStartTouchResizing,
  } = useDragAndTouch({
    onStart: handleResizeStart,
    onMove: handleResizeMove,
    onFinish: handleResizeEnd,
  });

  const expandWindowToScreen = () => {
    if (data.disableExpandToScreen) {
      return;
    }

    setIsInterpolating(true);

    if (windowStateBeforeFullscreen) {
      setWindowState(windowStateBeforeFullscreen);
      setWindowStateBeforeFullscreen(null);
    } else {
      setWindowStateBeforeFullscreen({ ...windowState });
      setWindowState((prev) => {
        const fullWidth =
          !data.disableWidthAdjustment && typeof prev.width === "number"
            ? Math.max(
                data.minWidth ?? prev.width,
                Math.min(data.maxWidth ?? Infinity, window.innerWidth - 56)
              )
            : windowRef.current?.offsetWidth || 0;

        const fullHeight =
          !data.disableHeightAdjustment && typeof prev.height === "number"
            ? Math.max(
                data.minHeight ?? prev.height,
                Math.min(data.maxHeight ?? Infinity, window.innerHeight - 108)
              )
            : windowRef.current?.offsetHeight || 0;

        const centerX = window.innerWidth / 2 - fullWidth / 2;
        const centerY = window.innerHeight / 2 - fullHeight / 2;

        return {
          ...prev,
          x: data.disableMove ? prev.x : centerX,
          y: data.disableMove ? prev.y : centerY,
          width:
            !data.disableWidthAdjustment && typeof prev.width === "number"
              ? fullWidth
              : prev.width,
          height:
            !data.disableHeightAdjustment && typeof prev.height === "number"
              ? fullHeight
              : prev.height,
        };
      });
    }

    setTimeout(() => {
      setIsInterpolating(false);
    }, 300);
  };

  const updateWindowProportions = () => {
    if (windowRef.current) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      setWindowProportions({
        xProportion:
          (windowState.x + windowRef.current.offsetWidth / 2) / windowWidth,
        yProportion:
          (windowState.y + windowRef.current.offsetHeight + 16) / windowHeight,
      });
    }
  };

  const repositionWindow = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    setWindowState((prev) => ({
      ...prev,
      x:
        Math.round(windowProportions.xProportion * windowWidth) -
        (windowRef.current?.offsetWidth || 0) / 2,
      y:
        Math.round(windowProportions.yProportion * windowHeight) -
        (windowRef.current?.offsetHeight || 0) -
        16,
    }));
  };

  const closeThisWindow = () => {
    removeWindowByUniqueId(data.uniqueId);
  };

  const setThisWindowActive = () => {
    setActiveWindow(data.uniqueId);
  };

  useEffect(() => {
    if (windowRef.current) {
      const { style } = windowRef.current;
      style.width = parseWindowDimension(windowState.width);
      style.height = parseWindowDimension(windowState.height);
      style.left = parseWindowPosition(windowState.x);
      style.top = parseWindowPosition(windowState.y);
    }
  }, [windowState]);

  useEffect(() => {
    updateWindowProportions();
  }, [
    windowState.x,
    windowState.y,
    windowRef.current?.offsetHeight,
    windowRef.current?.offsetWidth,
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (!isWindowDragging && !isWindowResizing) {
        setWindowStateBeforeFullscreen(null);
        repositionWindow();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowProportions, isWindowDragging, isWindowResizing]);

  useEffect(() => {
    window.addEventListener("keydown", handleResizeMove);
    window.addEventListener("keyup", handleResizeMove);

    return () => {
      window.removeEventListener("keydown", handleResizeMove);
      window.removeEventListener("keyup", handleResizeMove);
    };
  }, [windowResizingData, isWindowResizing, windowState]);

  useEffect(() => {
    setWindowState((prev) => ({
      ...prev,
      x: data.defaultCenterX
        ? Math.max(
            24,
            Math.min(
              data.defaultCenterX - (windowRef.current?.offsetWidth ?? 0) / 2,
              window.innerWidth - (windowRef.current?.offsetWidth ?? 0) - 24
            )
          )
        : prev.x,
      y: data.defaultCenterY
        ? Math.max(
            56,
            Math.min(
              data.defaultCenterY - (windowRef.current?.offsetHeight ?? 0) / 2,
              window.innerHeight - 36 - (windowRef.current?.offsetHeight ?? 0)
            )
          )
        : prev.y,
    }));
    setIsMounted(true);
  }, []);

  return (
    <div
      ref={windowRef}
      className={`absolute pointer-events-auto select-auto ${
        isInterpolating ? "transition-all duration-300 ease-out" : ""
      }`}
      style={{
        zIndex: data.layer || 0,
      }}
      onMouseDown={setThisWindowActive}
    >
      <div
        className={`relative ${widthClassConfig} ${heightClassConfig} ${
          windowStyle.mountAnimator
        } ${
          isMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className={`relative ${widthClassConfig} ${heightClassConfig}`}>
          <div className="absolute right-0 bottom-0 -translate-y-4 -translate-x-4 h-0 w-0">
            {canBeResizedAtAll && (
              <div
                className={`h-10 w-10 p-1 group ${
                  isWindowResizing ? "cursor-grabbing" : ""
                }`}
              >
                <div
                  className={`w-full h-full touch-none ${
                    isWindowResizing ? "" : "cursor-grab"
                  }`}
                  onMouseDown={handleStartResizing}
                  onTouchStart={handleStartTouchResizing}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 512 512"
                    className={`w-full h-auto aspect-square ${
                      isWindowResizing
                        ? "opacity-90 scale-[1.18]"
                        : "opacity-30 group-hover:opacity-80 group-hover:scale-110"
                    } transition-all duration-300 ease-out`}
                  >
                    <path
                      className="stroke-saturated"
                      strokeLinecap="round"
                      strokeWidth={145}
                      d="M389.032 129.005a316.213 316.213 0 0 1-266.789 254.72"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div
            className={`relative rounded-xl ${widthClassConfig} ${heightClassConfig} shadow-xl ${
              windowStyle.mountBlurAnimator
            } ${isMounted ? "backdrop-blur-xl" : "backdrop-blur-0"} ${
              data.allowOverflow ? "" : "overflow-hidden"
            }`}
          >
            <WindowActionProvider
              closeWindow={closeThisWindow}
              setActiveWindow={setThisWindowActive}
            >
              {data.content}
            </WindowActionProvider>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-4 h-0 flex items-center justify-center w-full">
            {!data.disableClose && (
              <div
                className={`${
                  windowStyle.closeButtonContainer
                } aspect-square transition-all duration-300 group ease-out flex items-center justify-center ${
                  isWindowDragging
                    ? "pointer-events-none opacity-0 select-none"
                    : ""
                }`}
                onMouseOver={() => setIsCloseButtonActive(true)}
                onMouseLeave={() => setIsCloseButtonActive(false)}
              >
                <button
                  className="w-5/6 h-5/6 aspect-square"
                  onClick={closeThisWindow}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    className="w-full h-auto aspect-square"
                  >
                    <path
                      d={`${
                        isCloseButtonActive
                          ? "M400 800c220.914 0 400-179.086 400-400S620.914 0 400 0 0 179.086 0 400s179.086 400 400 400Zm113.282-574.533c17.085-17.085 44.787-17.085 61.872 0 17.085 17.086 17.085 44.787 0 61.872L462.183 400.311l112.97 112.971c17.086 17.086 17.086 44.787 0 61.872-17.084 17.086-44.786 17.086-61.87 0L400.31 462.183l-112.972 112.97c-17.085 17.086-44.786 17.086-61.872 0-17.085-17.084-17.085-44.786 0-61.87L338.44 400.31 225.467 287.34c-17.085-17.086-17.085-44.787 0-61.872s44.787-17.086 61.872 0l112.972 112.971 112.971-112.972Z"
                          : "M400 800c220.914 0 400-179.086 400-400S620.914 0 400 0 0 179.086 0 400s179.086 400 400 400Zm175.154-574.533c17.085-17.085-17.085-17.085 0 0 17.085 17.086 0 0 0 0L400 400l175.154 175.154c17.085 17.086 17.085-17.085 0 0-17.085 17.086 17.085 17.086 0 0L400 400 225.467 575.154c-17.085 17.085 17.086 17.085 0 0-17.085-17.085-17.085 17.085 0 0L400 400 225.467 225.468c-17.085-17.086-17.085 17.085 0 0s-17.085-17.086 0 0L400 400l175.154-174.533Z"
                      }`}
                      style={{
                        fillRule: "evenodd",
                        strokeWidth: 0,
                      }}
                      transform="translate(112 112)"
                      className="transition-all duration-300 ease-out fill-saturated opacity-30 group-hover:opacity-80"
                    />
                  </svg>
                </button>
              </div>
            )}
            {canBeMoved && (
              <div
                className={`${
                  isWindowDragging
                    ? windowStyle.dragBarContainerOn
                    : isCloseButtonActive
                    ? windowStyle.dragBarContainerCloseActive
                    : windowStyle.dragBarContainer
                } flex items-center justify-center group transition-all duration-300 ease-out ${
                  isWindowDragging ? "cursor-grabbing" : ""
                }`}
              >
                <div
                  className={`${windowStyle.dragBar} ${
                    isWindowDragging
                      ? "opacity-90"
                      : "cursor-grab opacity-30 group-hover:opacity-80"
                  } bg-saturated transition-all duration-300 ease-out rounded-full touch-none`}
                  onMouseDown={handleStartDragging}
                  onTouchStart={handleStartTouching}
                  onDoubleClick={expandWindowToScreen}
                />
              </div>
            )}
            {!data.disableClose && canBeMoved && (
              <div
                className={`pointer-events-none select-none opacity-0 bg-none bg-transparent border-0 border-none ${windowStyle.closeButtonContainer} aspect-square`}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
