"use client";

import ImportIcon from "@/components/assets/entries/ImportIcon";
import { useTheme } from "@/components/contexts/ThemeContext";
import { useToast } from "@/components/contexts/ToastContext";
import { isValidThemeDataConfig } from "@/lib/themeMaker/themeConfigTypeGuard";
import { useRef } from "react";

export default function ImportProfileButton() {
  const { appendToast } = useToast();
  const { insertThemeProfile } = useTheme();
  const uploadProfileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadButtonClick = () => {
    if (!uploadProfileInputRef || !uploadProfileInputRef.current) {
      return;
    }

    uploadProfileInputRef.current.click();
  };

  const handleProfileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const validProfiles: ThemeDataConfig[] = [];
    let successCount = 0;

    for (const file of Array.from(files)) {
      if (file.size / 1024 / 1024 > 20) {
        appendToast({
          title: "Theme Maker",
          description: `Profile ${file.name} must be within 20 MB.`,
        });
        continue;
      }

      try {
        const fileContents = await readFileAsText(file);
        const parsedData = JSON.parse(fileContents);

        if (!isValidThemeDataConfig(parsedData)) {
          throw new Error("Invalid profile config object.");
        }

        validProfiles.push(parsedData);
        successCount++;
      } catch (error) {
        console.log(
          `Error uploading theme maker profile from file ${file.name}:`,
          error
        );
      }
    }

    if (validProfiles.length > 0) {
      const result = insertThemeProfile(validProfiles);

      if (result) {
        const description =
          successCount === files.length
            ? "All profiles imported."
            : `Imported ${successCount} out of ${files.length} profiles.`;

        appendToast({
          title: "Theme Maker",
          description,
        });
      }
    } else {
      appendToast({
        title: "Theme Maker",
        description: "No valid profiles were imported.",
      });
    }

    event.target.value = "";
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error("Failed to read file"));
        }
      };

      reader.onerror = (e) => {
        reject(new Error("Error reading file"));
      };

      reader.readAsText(file);
    });
  };

  return (
    <button
      onClick={uploadButtonClick}
      className="transition-transform hover:scale-110 duration-300 ease-in-out w-7 h-auto aspect-square shrink-0"
    >
      <input
        type="file"
        ref={uploadProfileInputRef}
        onChange={handleProfileUpload}
        multiple={true}
        accept=".json,application/json"
        className="w-0 h-0 m-0 p-0 border-none border-0 absolute opacity-0 pointer-events-none select-none"
      />
      <ImportIcon className="w-full h-auto aspect-square" />
    </button>
  );
}
