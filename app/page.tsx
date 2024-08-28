import AddContact from "./components/AddContact";
import { prisma } from "../app/lib/prisma";
import ContactList from "./components/ContactList";
import Image from "next/image";

export default async function Home() {
  const data = await prisma.contact.findMany();

  return (
    <main className="h-screen grid grid-rows-[1fr_1fr_6fr] grid-cols-[1fr_3fr_1fr] ">
      <div></div>
      {/* Top-center cell (2 borders) */}
      <div className="flex items-center justify-center border-l-2 border-r-2 border-Grey-60"></div>
      <div></div>
      {/* Middle-left cell (2 borders) */}
      <div className="flex items-center justify-end px-4 sm:px-6 border-t-2 border-b-2 border-Grey-60">
        <Image
          src="/svg/Back arrow.svg"
          alt="Back arrow"
          width={24}
          height={24}
        />
      </div>
      {/* Center cell (4 borders) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 border-2 border-Grey-60 min-w-[270px]">
        <h1 className="">Contacts</h1>
        <div className="flex items-center justify-end gap-3 md:pb-0 pb-3">
          <Image
            src="/svg/Settings.svg"
            alt="Settings"
            width={24}
            height={24}
          />
          <Image
            src="/svg/Profile pic.svg"
            alt="Profile pic"
            width={24}
            height={24}
          />
          <AddContact />
        </div>
      </div>
      {/* Middle-right cell (2 borders) */}
      <div className="flex items-center justify-start px-4 sm:px-6 border-t-2 border-b-2 border-Grey-60">
        <Image
          src="/svg/Light mode.svg"
          alt="light mode"
          width={24}
          height={24}
        />
      </div>
      <div></div>
      {/* Bottom-center cell (2 borders) */}
      <div className=" border-l-2 border-r-2 border-Grey-60 px-6">
        <ContactList data={data} />
      </div>
      <div></div>
    </main>
  );
}
