"use client";
import { useState } from "react";
import WorkItem from "./components/WorkItem";
import { AuthorProfile, AuthorWork } from "@/feature/user/type";
import WorkDialog from "./blocks/work/WorkDialog";

interface WorkListProps {
  user: AuthorProfile;
}

export default function WorkList({ user }: WorkListProps) {
  const [selectedWork, setSelectedWork] = useState<AuthorWork | null>(null);

  if (user.user_works.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="font-bold text-lg mb-3">모든 작품</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {user.user_works.map((work) => (
          <WorkItem
            key={work.id}
            work={work}
            onClick={() => setSelectedWork(work)}
          />
        ))}
      </div>
      <WorkDialog
        open={!!selectedWork}
        onOpenChange={(open) => {
          if (!open) setSelectedWork(null);
        }}
        work={selectedWork ?? undefined}
      />
    </section>
  );
}
