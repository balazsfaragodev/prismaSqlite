import Image from "next/image";
import { ContactDetailsProps } from "../lib/types";

const ContactDetails: React.FC<ContactDetailsProps> = ({
  name,
  phone,
  fileUrl,
}) => {
  return (
    <div className="flex md:justify-between gap-4">
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-Grey-60 flex items-center justify-center">
        <Image
          alt="contact image"
          blurDataURL={"/images/Default.png"}
          className="object-cover w-full h-full"
          placeholder="blur"
          src={fileUrl || "/images/Default.png"}
          width={40}
          height={40}
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3>{name}</h3>
        <div className="message secondary">{phone}</div>
      </div>
    </div>
  );
};

export default ContactDetails;
