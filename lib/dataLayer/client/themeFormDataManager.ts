export async function uploadThemeImage(
  file: File,
  index: number | string,
  suffix: AllowedImageFormat
): Promise<boolean> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("index", `${index}`);
  formData.append("suffix", suffix);

  try {
    const response = await fetch("/api/themeMaker/uploadImage", {
      method: "POST",
      body: formData,
    });

    return response.ok;
  } catch (error) {
    console.error("Error uploading theme image file:", error);
    return false;
  }
}
