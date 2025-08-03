import MainSlider from "@/components/mainSlider";
import ListSlider from "@/components/listSlider";

export default function Home() {
  return (
      <main className="min-h-screen p-2">
        <div className="mb-10">
          {/* 대문 사진 - 반응형 */}
          <MainSlider />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* 데스크톱: 2열 Flexbox */}
          <div className="hidden md:flex md:flex-wrap md:justify-center">
              <ListSlider />
          </div>

          {/* 모바일: 1열 중앙 정렬 */}
          <div className="md:hidden flex flex-col items-center">
              <ListSlider />
          </div>
        </div>
      </main>
  );
}