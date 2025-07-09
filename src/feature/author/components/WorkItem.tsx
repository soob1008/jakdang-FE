import Image from "next/image";
import { AuthorWork } from "@/feature/user/type";

interface WorkItemProps {
  work: AuthorWork;
  onClick: (work: AuthorWork) => void;
}

export default function WorkItem({ work, onClick }: WorkItemProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(work)}
      className="flex flex-col items-start w-full text-left hover:opacity-90 transition"
    >
      <div className="overflow-hidden rounded w-full">
        <Image
          src={
            work?.image_url
              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${work.image_url}`
              : "/assets/basic_book.jpg"
          }
          width={240}
          height={240}
          alt={work?.title}
          className="object-contain h-56 w-full"
        />
      </div>
      <div className="mt-4 w-full">
        <h3 className="font-semibold truncate">{work?.title}</h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {work?.description}
        </p>
      </div>
    </button>
  );
}
