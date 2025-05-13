import Link from "next/link";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center h-14 px-4 lg:px-6 bg-white border-b border-gray-200">
      <Logo />
    </header>
  );
}

function Logo() {
  return (
    <h1 className="flex">
      <Link href="/start" className="flex items-center">
        <span className="relative flex items-center">
          <i className="w-7 h-7 lg:w-8 lg:h-8 bg-secondary rounded-full" />
          <i className="relative left-[-10px] lg:left-[-12px] w-7 h-7 lg:w-8 lg:h-8 bg-primary rounded-full" />
        </span>
        <span className="relative left-[-4px] lg:left-[-5px] text-lg lg:text-xl font-bold">
          작당
        </span>
      </Link>
    </h1>
  );
}

export { Header };
