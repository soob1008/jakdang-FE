import Image from "next/image";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PostDialog } from "@/feature/profile/dialog/PostDialog";
import { WorkDialog } from "@/feature/profile/dialog/WorkDialog";
import UserInfo from "@/feature/profile/UserInfo";
import AuthorInfo from "@/feature/profile/AuthorInfo";
import AuthorIntro from "@/feature/profile/AuthorIntro";

export default function ProfilePage() {
  return (
    <div className="space-y-10 pb-40">
      {/* 사용자 정보 */}
      <UserInfo />
      {/* 작가 정보 */}
      <AuthorInfo />

      {/* 작가 한줄 소개 */}
      <AuthorIntro />
      {/* 글 등록 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-base lg:text-lg">글 등록</h3>
          <PostDialog />
        </div>

        <div className="border border-gray-200 rounded-md text-sm text-gray-500 p-4">
          등록된 글이 없습니다.
        </div>
      </section>

      {/* 작품 등록 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-base lg:text-lg">작품 등록</h3>
          <WorkDialog />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="overflow-hidden">
              <div className="w-full h-40 bg-gray-100">
                <Image
                  src="/test.png"
                  alt="작품 이미지"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="px-4 pb-3 text-sm">
                <CardTitle className="text-base">랑과 나의 사막</CardTitle>
                {/* <CardDescription className="text-xs">소설</CardDescription> */}
                <p className="text-sm text-gray-500">
                  랑과 나의 사막에서 펼쳐지는 아름다운 이야기
                </p>
                <div className="flex items-center justify-between mt-4">
                  <a href="#" className="text-primary hover:text-primary/80">
                    링크
                  </a>
                  <p className="text-gray-500">수정하기</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
