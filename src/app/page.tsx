import Image from "next/image";
import Link from "next/link";

const links = [
  {
    title: "구글 드라이브 폴더",
    href: "https://drive.google.com/drive/folders/abc123",
    image: "/images/google-drive.png",
  },
  {
    title: "PPT 템플릿",
    href: "https://docs.google.com/presentation/d/xyz456",
    image: "/images/ppt.png",
  },
  {
    title: "엑셀 보고서",
    href: "https://docs.google.com/spreadsheets/def789",
    image: "/images/excel.png",
  },
];

export default function Home() {
  return (
      <main className="min-h-screen bg-white py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-10">자료 링크 모음</h1>

        <div className="grid gap-6 grid-cols-2">
          {links.map((item, index) => (
              <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  className="flex flex-col items-center border rounded-lg p-4 shadow hover:shadow-lg transition duration-200"
              >
                <div className="w-24 h-24 relative mb-4">
                  <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                  />
                </div>
                <span className="text-lg font-medium text-center">{item.title}</span>
              </Link>
          ))}
        </div>
      </main>
  );
}