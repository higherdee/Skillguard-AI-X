import Settings from "@/components/settings";
import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <TopNav />
        <main className="p-6">
          <Settings />
        </main>
      </div>
    </div>
  );
}
