import Image from "next/image";
import Link from "next/link";
import {lintLinks, mainLinks} from "@/data/data";
import SliderWrapper from "@/components/image_slider";

export default function Home() {
  return (
      <main className="min-h-screen p-2">
        <div className="mb-10">
          {/* 대문 사진 - 반응형 */}
          <div className="flex justify-center ">
              <SliderWrapper>
                  {mainLinks.map((item, index) => (
                      <Link
                          key={index}
                          href={item.href}
                          target="_blank"
                      >
                          <Image
                              src={item.image}
                              alt={item.title}
                              width={1200}
                              height={400}
                              className="w-full max-w-5xl h-auto"
                          />
                      </Link>
                  ))}
              </SliderWrapper>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">

          {/* 데스크톱: 2열 Flexbox */}
          <div className="hidden md:flex md:flex-wrap md:justify-center">
            {lintLinks.map((item, index) => (
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
            {lintLinks.map((item, index) => (
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