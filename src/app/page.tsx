import Image from "next/image";
import Link from "next/link";
import {listLinks} from "@/data/data";
import MainSlider from "@/components/mainSlider";

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
            {listLinks.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    target="_blank"
                >
                  <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={120}
                      className="max-w-[400px] h-auto"
                  />
                </Link>
            ))}
          </div>

          {/* 모바일: 1열 중앙 정렬 */}
          <div className="md:hidden flex flex-col items-center">
            {listLinks.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    target="_blank"
                >
                  <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={120}
                      className="max-w-[400px] h-auto"
                  />
                </Link>
            ))}
          </div>
        </div>
      </main>
  );
}