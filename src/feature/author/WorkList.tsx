import WorkItem from "@/feature/author/components/WorkItem";

export default function WorkList() {
  return (
    <section>
      <h2 className="font-bold text-lg mb-3">작품</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {[1, 2].map((item) => (
          <WorkItem key={item} />
        ))}
      </div>
    </section>
  );
}
