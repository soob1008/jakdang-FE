"use client";

import { Button } from "@/shared/ui/button";
import WorkList from "@/feature/admin/works/WorkList";

import { Work } from "@/entities/work/model/type";

export const works: Work[] = [
  {
    id: "w1",
    title: "고양이의 오후",
    createdAt: "2025-10-10T14:30:00Z",
    updatedAt: "2025-10-11T08:20:00Z",
    thumbnailUrl: "/assets/basic_book.jpg",
    type: "SINGLE",
    isPublished: true,
    publishedAt: "2025-10-11T09:00:00Z",
    description: "햇살 아래 졸고 있는 고양이의 하루를 담은 짧은 에세이.",
    content: "오늘도 고양이는 창가에서 조용히 햇살을 마신다...",
    tags: ["에세이", "고양이", "감성"],
    authorId: "user1",
    visibility: "PUBLIC",
    stats: { views: 320, likes: 58, comments: 6, cheers: 14 },
  },
  {
    id: "w2",
    title: "겨울 숲의 그림자",
    createdAt: "2025-10-01T12:00:00Z",
    updatedAt: "2025-10-05T15:45:00Z",
    thumbnailUrl: "/assets/basic_book.jpg",
    type: "SINGLE",
    isPublished: false,
    isScheduled: true,
    scheduledAt: "2025-10-20T09:00:00Z",
    description: "눈 덮인 숲 속에서 느낀 고요함을 글로 남겼다.",
    content: "발자국 소리만이 들리던 겨울의 오후...",
    tags: ["겨울", "자연", "산문"],
    authorId: "user1",
    visibility: "UNLISTED",
    stats: { views: 0, likes: 0, comments: 0, cheers: 0 },
  },
  {
    id: "w3",
    title: "빛과 그림자 사이",
    createdAt: "2025-09-15T10:00:00Z",
    updatedAt: "2025-09-30T18:00:00Z",
    thumbnailUrl: "/assets/basic_book.jpg",
    type: "SERIES",
    isPublished: true,
    publishedAt: "2025-09-30T20:00:00Z",
    description: "도시의 밤을 살아가는 인물들의 짧은 이야기 모음.",
    tags: ["소설", "도시", "연재"],
    authorId: "user2",
    visibility: "PUBLIC",
    stats: { views: 1042, likes: 188, comments: 22, cheers: 45 },
    episodes: [
      {
        id: "ep1",
        title: "1화. 불빛 아래",
        order: 1,
        isPublished: true,
        publishedAt: "2025-09-20T09:00:00Z",
        content: "도심의 불빛은 언제나 사람을 감춘다...",
      },
      {
        id: "ep2",
        title: "2화. 그림자 속으로",
        order: 2,
        isPublished: true,
        publishedAt: "2025-09-25T09:00:00Z",
        content: "그림자 속에서 우리는 진짜를 본다.",
      },
    ],
  },
  {
    id: "w4",
    title: "파란 잔상",
    createdAt: "2025-10-09T08:00:00Z",
    updatedAt: "2025-10-12T10:30:00Z",
    thumbnailUrl: "/assets/basic_book.jpg",
    type: "SINGLE",
    isPublished: true,
    publishedAt: "2025-10-12T11:00:00Z",
    description: "어린 시절의 여름 바다를 그리며 쓴 짧은 회상문.",
    content: "파란 잔상 속에는 언제나 소금기 섞인 바람이 있다.",
    tags: ["회상", "여름", "바다"],
    authorId: "user3",
    visibility: "PUBLIC",
    stats: { views: 514, likes: 92, comments: 10, cheers: 20 },
  },
  {
    id: "w5",
    title: "별의 노래",
    createdAt: "2025-08-10T09:00:00Z",
    updatedAt: "2025-09-10T09:00:00Z",
    thumbnailUrl: "/assets/basic_book.jpg",
    type: "SERIES",
    isPublished: true,
    publishedAt: "2025-09-10T10:00:00Z",
    description: "밤하늘을 여행하는 별의 관점에서 쓴 짧은 연작 시.",
    tags: ["시", "연재", "우주"],
    authorId: "user2",
    visibility: "PUBLIC",
    stats: { views: 1820, likes: 245, comments: 30, cheers: 60 },
    episodes: [
      {
        id: "ep1",
        title: "1화. 별의 탄생",
        order: 1,
        isPublished: true,
        publishedAt: "2025-08-15T10:00:00Z",
        content: "어둠 속에서 첫 빛이 태어났다.",
      },
      {
        id: "ep2",
        title: "2화. 여행의 시작",
        order: 2,
        isPublished: true,
        publishedAt: "2025-08-20T10:00:00Z",
        content: "별은 길을 잃지 않는다. 단지 방향을 잊을 뿐.",
      },
      {
        id: "ep3",
        title: "3화. 소멸의 노래",
        order: 3,
        isPublished: true,
        publishedAt: "2025-09-05T10:00:00Z",
        content: "빛이 사라질 때, 진짜 이야기가 시작된다.",
      },
    ],
  },
];

export default function WorksContainer() {
  return (
    <div className="px-10">
      {/* 작품 제목 및 추가 */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="font-semibold">작품 관리</h2>
          <p className="text-gray-500 text-sm">작품을 관리하세요.</p>
        </div>
        <Button onClick={() => {}}>작품 추가</Button>
      </div>

      {/* 작품 리스트 */}
      <WorkList works={works} />
    </div>
  );
}
