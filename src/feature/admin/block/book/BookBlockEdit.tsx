"use client";

import { useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { Card, CardContent } from "@/shared/ui/card";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Label } from "@/shared/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import Image from "next/image";
import { SearchBookList } from "@/feature/admin/types";
import { ChangeEvent } from "react";
import { uploadImage } from "@/shared/lib/api/api.client";
import { handleAction } from "@/shared/lib/api/action";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { format } from "date-fns";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";

type BookDocument = {
  title: string;
  authors: string[];
  publisher: string;
  datetime: string;
  isbn: string;
  thumbnail: string;
};

export default function BookBlockEdit({ index }: { index: number }) {
  const namePrefix = `blocks_draft.${index}.data`;
  const { control, register, setValue, watch } = useFormContext();
  const mode = watch(`${namePrefix}.mode`) as "search" | "manual";
  const book = watch(`${namePrefix}.${mode}`) || null;

  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchBookList[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedIsbn, setSelectedIsbn] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  const handleSearch = async (pageNum: number = 1) => {
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(
          query
        )}&page=${pageNum}&size=10`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
          },
        }
      );

      const data = await res.json();

      const books: SearchBookList[] = data.documents.map(
        (doc: BookDocument) => ({
          title: doc.title,
          author: doc.authors?.join(", ") || "알 수 없음",
          publisher: doc.publisher || "알 수 없음",
          publish_date: doc.datetime
            ? doc.datetime.split("T")[0]
            : "알 수 없음",
          isbn: doc.isbn?.split(" ")[0] || `no-isbn-${Math.random()}`,
          thumbnail: doc.thumbnail || "",
        })
      );

      setResults(books);
      setPage(pageNum);
      setIsEnd(data.meta.is_end);
    } catch (error) {
      console.error("Error fetching Kakao book data:", error);
      setResults([]);
    }
  };

  const handleApply = () => {
    const selected = results.find((b) => b.isbn === selectedIsbn);
    if (selected) {
      setValue(`${namePrefix}.search`, selected);
      setOpen(false);
      setQuery("");
      setSelectedIsbn(null);
      setResults([]);
    }
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await handleAction(() => uploadImage(file, watch("user_id")), {
      successMessage: "책 이미지가 업로드되었습니다.",
      errorMessage: "이미지 업로드 실패",
      onSuccess: ({ imagePath }) => {
        // 공통 thumbnail 저장 (manual/search 관계없이 덮어씀)
        setValue(`${namePrefix}.thumbnail`, imagePath);
      },
    });
  };

  const uploadedThumbnail = watch(`${namePrefix}.thumbnail`);

  return (
    <div className="space-y-6">
      {/* 등록 방식 선택 */}
      <RadioGroup
        defaultValue="search"
        className="flex gap-6"
        value={mode || "search"}
        onValueChange={(val) =>
          setValue(`${namePrefix}.mode`, val as "search" | "manual")
        }
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="search" id={`search-${index}`} />
          <Label htmlFor={`search-${index}`}>책 검색하기</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="manual" id={`manual-${index}`} />
          <Label htmlFor={`manual-${index}`}>직접 등록하기</Label>
        </div>
      </RadioGroup>
      <input
        type="hidden"
        {...register(`${namePrefix}.mode`)}
        value={mode || "search"}
      />

      {/* 공통: 이미지 업로드 */}
      <div className="">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
          >
            이미지 업로드
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            className="hidden"
            onChange={handleUpload}
          />
          <p className="mt-1 text-xs text-gray-500">
            권장 크기: 2:3 비율 (예: 400x600px, 800x1200px)
          </p>
        </div>
        {/* 이미지 미리보기 */}
        {uploadedThumbnail && (
          <div className="mt-3 w-32 aspect-[2/3] relative border rounded overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${uploadedThumbnail}`}
              alt="미리보기"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* 책 검색하기 모드 */}
      {mode === "search" && (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button type="button">책 검색하기</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>책 검색</DialogTitle>
              </DialogHeader>
              <form
                className="flex gap-2 mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(1);
                }}
              >
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="책 제목 / 저자 / ISBN"
                />
                <Button type="submit" disabled={!query.trim()}>
                  검색
                </Button>
              </form>

              {/* 검색 결과 */}
              <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
                {results.length === 0 && (
                  <p className="flex items-center justify-center pt-10 text-sm text-gray-500">
                    검색 결과가 없습니다.
                  </p>
                )}
                <RadioGroup
                  value={selectedIsbn || ""}
                  onValueChange={setSelectedIsbn}
                  className="space-y-2"
                >
                  {results.map((book: SearchBookList) => (
                    <Card
                      key={book.isbn}
                      className={`cursor-pointer ${
                        selectedIsbn === book.isbn ? "border-primary" : ""
                      }`}
                      onClick={() => setSelectedIsbn(book.isbn!)}
                    >
                      <CardContent className="flex gap-4 p-4 items-center">
                        {book.thumbnail ? (
                          <Image
                            src={book.thumbnail}
                            alt={book.title}
                            width={50}
                            height={70}
                            className="rounded object-cover"
                          />
                        ) : (
                          <div className="w-[50px] h-[70px] bg-gray-200 rounded" />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold">{book.title}</p>
                          <p className="text-sm text-gray-600">{book.author}</p>
                          <p className="mt-2 text-xs text-gray-500">
                            {book.publisher} · {book.publish_date}
                          </p>
                        </div>
                        <RadioGroupItem
                          value={book.isbn!}
                          className="sr-only"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </RadioGroup>
              </div>

              {/* 페이지네이션 */}
              {results.length > 0 && (
                <div className="flex justify-between items-center mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => handleSearch(page - 1)}
                  >
                    이전
                  </Button>
                  <span className="text-sm text-gray-500">페이지 {page}</span>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isEnd}
                    onClick={() => handleSearch(page + 1)}
                  >
                    다음
                  </Button>
                </div>
              )}

              <DialogFooter className="mt-4">
                <Button
                  type="button"
                  onClick={handleApply}
                  disabled={!selectedIsbn}
                >
                  적용
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* 선택한 책 미리보기 (텍스트 정보) */}
          {book && (
            <div className="flex flex-col mt-4 space-y-1 text-sm">
              <h3 className="font-bold text-base">{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.publisher}</p>
              <p>{book.publish_date}</p>
              {book.isbn && (
                <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
              )}
            </div>
          )}
        </>
      )}

      {book && mode === "manual" && (
        <div className="space-y-4">
          {/* 책 제목 */}
          <FormField
            control={control}
            name={`${namePrefix}.manual.title`}
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>책 제목</FormLabel>
                <FormControl>
                  <Input placeholder="책 제목 입력" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 저자 */}
          <FormField
            control={control}
            name={`${namePrefix}.manual.author`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>저자</FormLabel>
                <FormControl>
                  <Input placeholder="저자 입력" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 출판사 */}
          <FormField
            control={control}
            name={`${namePrefix}.manual.publisher`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>출판사</FormLabel>
                <FormControl>
                  <Input placeholder="출판사 입력" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 출간일 */}
          <FormField
            control={control}
            name={`${namePrefix}.manual.publish_date`}
            render={({ field }) => {
              const value = field.value ? new Date(field.value) : undefined;
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>출간일</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            !value && "text-muted-foreground"
                          }`}
                        >
                          {value ? format(value, "yyyy-MM-dd") : "출간일 선택"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={value}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      )}
    </div>
  );
}
