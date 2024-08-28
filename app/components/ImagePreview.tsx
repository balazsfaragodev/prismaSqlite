import Image from "next/image";
import Button from "./Button";
import { ButtonType, ImagePreviewProps } from "../lib/types";

const ImagePreview: React.FC<ImagePreviewProps> = ({
  previewUrl,
  handleFileChange,
  handleFileDelete,
  inputId,
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-[5.5rem] h-[5.5rem] rounded-full overflow-hidden border-2 border-Grey-60 flex items-center justify-center">
        <Image
          alt="contact image"
          blurDataURL="/images/Default.png"
          className="object-cover w-full h-full"
          placeholder="blur"
          src={previewUrl || "/images/Default.png"}
          width={88}
          height={88}
        />
      </div>
      <div className="flex justify-end items-center gap-2">
        <Button
          buttonType={ButtonType.PRIMARY}
          onClick={() => document.getElementById(inputId)?.click()}
          className="flex items-center space-x-2 whitespace-nowrap"
        >
          <Image
            src={previewUrl ? "/svg/Change.svg" : "/svg/Add.svg"}
            alt={previewUrl ? "Change" : "Add"}
            width={24}
            height={24}
          />
          {previewUrl ? "Change picture" : "Add picture"}
          <input
            id={inputId}
            className="hidden"
            name="media"
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
          />
        </Button>
        {previewUrl && (
          <Button onClick={handleFileDelete} buttonType={ButtonType.PRIMARY}>
            <Image src="/svg/Delete.svg" alt="Delete" width={24} height={24} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
