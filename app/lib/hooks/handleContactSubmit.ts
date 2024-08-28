import { deleteOldImage, saveContact } from "../actions";

interface HandleContactSubmitProps {
  initialData?: { id: string; fileUrl?: string };
  file: File | null;
  handleFileUpload: () => Promise<{ url: string }>;
  form: HTMLFormElement;
}

const handleContactSubmit = async ({
  initialData,
  file,
  handleFileUpload,
  form,
}: HandleContactSubmitProps) => {
  let fileUrl: string = "";

  if (file) {
    const signedURLResult = await handleFileUpload();
    fileUrl = signedURLResult.url.split("?")[0];
    // If there is an existing URL and the new file's URL is different from it
    if (initialData?.fileUrl && fileUrl !== initialData.fileUrl) {
      await deleteOldImage(initialData.fileUrl);
    }
  } else if (initialData?.fileUrl && fileUrl === initialData.fileUrl) {
    // If no new file is uploaded, but there is an existing image to retain
    fileUrl = initialData.fileUrl;
  } else if (initialData?.fileUrl && !file) {
    // If no new file is uploaded, but there is an existing image that should be deleted
    await deleteOldImage(initialData.fileUrl);
    fileUrl = ""; // Set fileUrl to an empty string since there's no new image
  }

  const formData = new FormData(form);
  formData.append("fileUrl", fileUrl);

  await saveContact(initialData?.id || null, formData);
};

export default handleContactSubmit;
