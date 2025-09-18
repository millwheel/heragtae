import MainLinks from "@/components/mainLinks";
import SubLinks from "@/components/subLinks";

export default function Home() {
    return (
        <main className="min-h-screen p-2">
            <div className="mb-10">
                <div className="flex flex-col items-center text-center space-y-10">
                    <div className="max-w-4xl w-full px-4 space-y-3 mt-5">
                        {/* 타이틀 */}
                        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold leading-tight">
                            <span className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                                보증911
                            </span>{" "}
                            믿을 수 있는 중개 플랫폼
                        </h2>

                        {/* 본문 */}
                        <p className="text-base md:text-lg">
                            제휴 사이트의 운영자와 계약을 맺고, 문제 발생 시 보증911이 사용자 피해에 개입합니다.
                        </p>
                        <p className="text-base md:text-lg">
                            보증911의 기준에 부합하는 사이트만 추천되며, 실시간 모니터링이 지속됩니다.
                        </p>
                    </div>

                    {/* 대문 사진 - 반응형 */}
                    <div className="my-2">
                        <MainLinks />
                    </div>

                </div>
            </div>

            <div className="max-w-6xl mx-auto mb-10">
                <SubLinks />
            </div>
        </main>
    );
}
