import { Align } from "@/feature/types";

interface TextBlockProps {
  title: string;
  content: string;
  isActive: boolean;
  align: Align;
}

export default function TextBlock({}: TextBlockProps) {
  return <div>Text Block</div>;
}
