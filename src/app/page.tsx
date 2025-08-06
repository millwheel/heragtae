import MainLinks from "@/components/mainLinks";
import SubLinks from "@/components/subLinks";

export default function Home() {
  return (
      <main className="min-h-screen p-2">
        <div className="mb-10">
            <div className="flex justify-center">
              {/* 대문 사진 - 반응형 */}
              <MainLinks />
            </div>
        </div>

        <div className="max-w-6xl mx-auto">
            <SubLinks />
        </div>
      </main>
  );
}