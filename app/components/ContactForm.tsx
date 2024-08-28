import { ContactFormProps } from "../lib/types";

const ContactForm: React.FC<ContactFormProps> = ({ initialData }) => {
  return (
    <>
      <label>
        <span>Name</span>
        <input
          name="name"
          id="name"
          type="text"
          placeholder="Jamie Wright"
          defaultValue={initialData.name}
          className="w-full"
        />
      </label>
      <label>
        <span>Phone number</span>
        <input
          name="phone"
          id="phone"
          type="text"
          placeholder="+01 234 5678"
          defaultValue={initialData.phone}
          className="w-full"
        />
      </label>
      <label>
        <span>Email address</span>
        <input
          name="email"
          id="email"
          type="text"
          placeholder="jamie.wright@mail.com"
          defaultValue={initialData.email}
          className="w-full"
        />
      </label>
    </>
  );
};

export default ContactForm;
