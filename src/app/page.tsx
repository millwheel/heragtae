import Image from "next/image";
import Link from "next/link";

const links = [
  {
    title: "원벳원",
    href: "https://1bet1.one/?regcode=TV82",
    image: "/images/원벳원-400x120-TV82.jpg",
  },
  {
    title: "트윈스",
    href: "https://tw-aaa.com/?code=82TV",
    image: "/images/트윈스-400120.jpg",
  },
  {
    title: "로이더벳",
    href: "https://rd-365.com/login.asp",
    image: "/images/로이더벳_400x120.jpg",
  },
  {
    title: "와이벳",
    href: "https://ybyb77.com/?joinCd=82TV",
    image: "/images/ybet-400x120.png",
  },
  {
    title: "도라에몽",
    href: "https://do-1111.com/",
    image: "/images/do-400x120.jpg",
  },
  {
    title: "벳클라우드",
    href: "https://bc-4q.com/_views/6_main/main.php",
    image: "/images/벳클라우드_400x120.png",
  }
];

export default function Home() {
  return (
      <main className="min-h-screen py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-10">자료 링크 모음</h1>

        {/* 반응형 컨테이너 */}
        <div className="max-w-6xl mx-auto">

          {/* 데스크톱: 2열 Flexbox */}
          <div className="hidden md:flex md:flex-wrap md:justify-center">
            {links.map((item, index) => (
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
            {links.map((item, index) => (
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