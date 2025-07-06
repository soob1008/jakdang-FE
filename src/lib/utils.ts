import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function useMediaQuery(query: string): boolean {
//   const [matches, setMatches] = useState(false);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const media = window.matchMedia(query);
//     const handleChange = () => setMatches(media.matches);

//     handleChange(); // 초기 상태 설정
//     media.addEventListener("change", handleChange);
//     return () => media.removeEventListener("change", handleChange);
//   }, [query]);

//   return matches;
// }
