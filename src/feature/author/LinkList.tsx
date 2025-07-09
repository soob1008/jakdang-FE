import { AuthorLink } from "@/feature/user/type";

interface LinkListProps {
  links: AuthorLink[];
}

export default function LinkList({ links }: LinkListProps) {
  if (!links || links.length === 0) {
    return null; // No links to display
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-bold">링크</h2>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md hover:border-primary transition-all duration-200 bg-white text-center text-sm font-medium text-gray-700 hover:text-primary"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
