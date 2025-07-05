import Profile from "@/feature/author/Profile";
import Masterpiece from "@/feature/author/Masterpiece";
import WorkList from "@/feature/author/WorkList";

export default function WriterPage() {
  return (
    <div>
      <Profile />
      <Masterpiece />
      <WorkList />
    </div>
  );
}
