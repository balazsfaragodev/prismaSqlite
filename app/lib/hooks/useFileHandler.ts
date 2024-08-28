import { useAtom } from "jotai";
import { fileAtom, previewUrlAtom } from "../atoms/atoms";
import { computeSHA256 } from "../util";
import { getSignedURL } from "../actions";

const useFileHandler = () => {
  const [file, setFile] = useAtom(fileAtom);
  const [previewUrl, setPreviewUrl] = useAtom(previewUrlAtom);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (newFile) {
      const url = URL.createObjectURL(newFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFileUpload = async (): Promise<{ url: string }> => {
    if (!file) throw new Error("No file to upload");

    const checksum = await computeSHA256(file);

    const signedURLResult = await getSignedURL({
      fileSize: file.size,
      fileType: file.type,
      checksum,
    });

    if (signedURLResult.failure !== undefined) {
      throw new Error(signedURLResult.failure);
    }

    const { url } = signedURLResult.success;

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    return { url };
  };

  const handleFileDelete = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
  };

  return {
    file,
    previewUrl,
    setFile,
    setPreviewUrl,
    handleFileChange,
    handleFileUpload,
    handleFileDelete,
  };
};

export default useFileHandler;
