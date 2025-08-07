import { Button } from "@/components/ui/button";

import ThemeDesign from "./ThemeDesign";
import WallPaperDesign from "./WallPaperDesign";

export default function PageDesignEditor() {
  return (
    <article className="pr-2 flex flex-col gap-4 pt-4 pl-10 pb-24 max-w-[900px] w-full mx-auto lg:max-w-none">
      <div className="flex items-center justify-between pb-2">
        <h2 className="font-bold">꾸미기</h2>
        <div className="flex items-center gap-2">
          <Button type="button" className="w-fit">
            반영하기
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        <ThemeDesign />
        <WallPaperDesign />
      </div>
    </article>
  );
}
