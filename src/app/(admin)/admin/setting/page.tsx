import MyInformation from "@/feature/admin/setting/MyInformation";
import AccountDelete from "@/feature/admin/setting/AccountDelete";

export default function AdminSettingPage() {
  return (
    <div className="space-y-6 m-auto px-4 lg:px-0 lg:w-[900px]">
      <h2 className="mb-6 text-lg font-bold">Setting</h2>
      <MyInformation />
      <AccountDelete />
    </div>
  );
}
