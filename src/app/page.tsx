import MainSlider from "@/components/mainSlider";
import SubSlider from "@/components/subSlider";

export default function Home() {
  return (
      <main className="min-h-screen p-2">
        <div className="mb-10">
            <div className="flex justify-center">
              {/* 대문 사진 - 반응형 */}
              <MainSlider />
            </div>
        </div>

        <div className="max-w-6xl mx-auto">
            <SubSlider />
        </div>
      </main>
  );
}