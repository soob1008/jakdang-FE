import MyInformation from "@/feature/admin/setting/MyInformation";
import AccountDelete from "@/feature/admin/setting/AccountDelete";
import { fetchServer } from "@/lib/api/api.server";
import { Author } from "@/feature/user/type";

export default async function AdminSettingPage() {
  const { user }: { user: Author } = await fetchServer("/api/user", {
    next: { revalidate: 60, tags: ["user"] },
  });

  return (
    <div className="space-y-6 m-auto pt-10 px-4 lg:px-0 lg:w-[900px]">
      <MyInformation user={user} />
      <AccountDelete />
    </div>
  );
}
