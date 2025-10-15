import AccountDelete from "@/feature/admin/setting/AccountDelete";
import MyInformation from "@/feature/admin/setting/MyInformation";
import { fetchServerAPI } from "@/shared/lib/api/api.server";
import { Author } from "@/entities/author/model/types";

export default async function AdminSettingPage() {
  const user = await fetchServerAPI<Author>("/users/me");

  return (
    <div className="space-y-6 m-auto pt-8 px-4 lg:px-0 lg:w-[900px]">
      <MyInformation user={user} />
      <AccountDelete />
    </div>
  );
}
