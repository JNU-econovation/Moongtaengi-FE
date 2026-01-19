import React, { useState } from 'react';
import cross from '../assets/icons/common/cross.svg';

// --- 타입 정의 ---
interface CollectionItem {
    type: string;
    displayName: string;
    rarity: 'COMMON' | 'RARE' | 'EPIC' | 'UNIQUE';
    description: string;
    unlocked: boolean;
    unlockedAt: string | null;
    imageUrl: string;
}

interface CollectionData {
    equippedIcon: string;
    collections: CollectionItem[];
}

// --- 데이터 ---
const MOCK_DATA: CollectionData = {
    equippedIcon: "DEFAULT",
    collections: [
        { type: "DEFAULT", displayName: "기본 뭉탱이", rarity: "COMMON", description: "회원가입 시 기본 지급", unlocked: true, unlockedAt: "2026-01-19T11:19:48.050465", imageUrl: "https://s3.ap-northeast-2.amazonaws.com/moongtaengi-bucket/collections/default.png" },
        { type: "ECONO_SPECIAL", displayName: "에코노 뭉탱이", rarity: "COMMON", description: "에코노 코드로 스터디 참여", unlocked: false, unlockedAt: null, imageUrl: "https://s3.ap-northeast-2.amazonaws.com/moongtaengi-bucket/collections/econo-special.png" },
        { type: "SPECIAL", displayName: "스페셜 뭉탱이", rarity: "RARE", description: "스페셜 코드로 스터디 참여", unlocked: false, unlockedAt: null, imageUrl: "https://s3.ap-northeast-2.amazonaws.com/moongtaengi-bucket/collections/special.png" },
        { type: "PRO", displayName: "프로 뭉탱이", rarity: "RARE", description: "100 XP 달성", unlocked: false, unlockedAt: null, imageUrl: "https://s3.ap-northeast-2.amazonaws.com/moongtaengi-bucket/collections/pro.png" },
        { type: "MASTER", displayName: "마스터 뭉탱이", rarity: "EPIC", description: "300 XP 달성", unlocked: false, unlockedAt: null, imageUrl: "https://s3.ap-northeast-2.amazonaws.com/moongtaengi-bucket/collections/master.png" },
        { type: "BUNCH", displayName: "뭉탱이 다발", rarity: "EPIC", description: "4인 이상 스터디 참여", unlocked: false, unlockedAt: null, imageUrl: "https://s3.ap-northeast-2.amazonaws.com/moongtaengi-bucket/collections/bunch.png" },
        { type: "TREASURE_BAG", displayName: "보물주머니 뭉탱이", rarity: "UNIQUE", description: "7개 이상 컬렉션 해금", unlocked: false, unlockedAt: null, imageUrl: "https://s3.ap-northeast-2.amazonaws.com/moongtaengi-bucket/collections/treasure-bag.png" },
        { type: "WOODEN_PICKAXE", displayName: "나무곡괭이 뭉탱이", rarity: "COMMON", description: "모든 온보딩 미션 완료", unlocked: false, unlockedAt: null, imageUrl: "https://s3.ap-northeast-2.amazonaws.com/moongtaengi-bucket/collections/wooden-pickaxe.png" }
    ]
};

export default function Collection() {
    const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);

    // 대표 아이콘 찾기
    const equippedItem = MOCK_DATA.collections.find(
        (item) => (item.type === MOCK_DATA.equippedIcon)
    );

    return (
        <div className="min-h-full bg-[#121212] text-white p-6 font-sans flex flex-col items-center">

            {/* --- 상단: 나의 대표 아이콘 --- */}
            <section className="w-full text-center mb-6 mt-14">
                <h1 className="text-[#4AFFFC] text-5xl font-semibold mb-2">나의 대표 아이콘</h1>
                <p className="text-white text-xl font-semibold mb-8">
                    스터디 참여로 획득한 뭉탱이를 프로필에 장착하여 자신을 뽐내보세요.<br />
                    원하는 뭉탱이를 선택해서 자유롭게 변경할 수 있습니다
                </p>

                {equippedItem && (
                    <div className="flex flex-col w-64 mx-auto group cursor-pointer">
                        <div className="relative w-full h-64 rounded-xl overflow-hidden bg-[#2a2a2a] transition-transform">
                            <span className="absolute top-2 left-2 text-black text-[10px] font-semibold px-2 py-0.5 rounded-full font-semibold z-10 bg-gradient-to-r from-custom-gradient-blue to-custom-gradient-green">
                                {equippedItem.rarity}
                            </span>
                            <img
                                src={equippedItem.imageUrl}
                                alt={equippedItem.displayName}
                                className="w-full h-full object-cover"
                            />
                            <p className="absolute bottom-2 right-2 font-semibold text-lg px-1">{equippedItem.displayName}</p>
                        </div>

                        <span className="self-end mt-1 text-[#4AFFFC] text-sm hover:underline">
                            변경하기
                        </span>
                    </div>
                )}

            </section>

            <div className="w-[80%] h-px bg-white my-2 mb-28" />

            {/* --- 하단: 컬렉션 리스트 --- */}
            <section className="w-full flex flex-col items-center">
                <h2 className="text-6xl font-semibold text-center mb-14">처음 스터디를 시작할 때</h2>

                <div className="grid grid-cols-3 gap-4">
                    {MOCK_DATA.collections.map((item) => {
                        const isEquipped = item.type === MOCK_DATA.equippedIcon;

                        return (
                            <div
                                key={item.type}
                                onClick={() => setSelectedItem(item)}
                                className={`
                                    relative w-64 aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-200
                                    ${isEquipped ? 'border-1 border-[#4AFFFC]' : 'border border-gray-700 hover:border-gray-500'}
                                    bg-[#1e1e1e]
                            `}
                            >
                                {/* 뱃지 */}
                                <span className={`
                                    absolute top-2 left-2 w-[25%] text-[10px] text-center font-semibold px-2 py-0.5 rounded-full z-10
                                    ${item.unlocked
                                        ? 'text-black bg-gradient-to-r from-custom-gradient-blue to-custom-gradient-green'
                                        : 'bg-gray-600 text-gray-400'}
                                `}
                                >
                                    {item.unlocked ? item.rarity : 'Lock'}
                                </span>

                                {/* 이미지 */}
                                <img
                                    src={item.imageUrl}
                                    alt={item.displayName}
                                    className={`
                                        w-full h-full object-cover transition-all duration-300
                                        ${item.unlocked ? 'opacity-100' : 'opacity-60 blur-[4px] brightness-[0.4]'}
                                `}
                                />

                                {/* 텍스트 오버레이 */}
                                <div className="absolute bottom-2 right-2 text-center z-10 px-1">
                                    <span className="text-lg font-semibold text-white">
                                        {item.unlocked ? item.displayName : '??????'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* --- 팝업 모달 --- */}
            {selectedItem && (
                <div
                    onClick={() => setSelectedItem(null)}
                    className="fixed inset-0 bg-[#121212]/70 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-in fade-in duration-200"
                >
                    {/* 팝업창 */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative flex flex-col items-center bg-[#272727] text-white p-4 pt-12 rounded w-[50%] text-center shadow-2xl"
                    >

                        <button
                            onClick={() => { setSelectedItem(null) }}
                            className="absolute right-4 top-4 text-white transition-colors hover:opacity-70 cursor-pointer"
                            type="button"
                        >
                            <img src={cross} className="w-3.5 mt-1 mr-1 invert" />
                        </button>

                        <div className={`relative w-40 h-40 rounded-xl overflow-hidden
                                ${selectedItem.unlocked ? 'border-1 border-[#4AFFFC]' : 'border-1 border-[#606060'}`}>
                            <span 
                                className={`absolute top-2 left-2 text-black text-[10px] font-semibold px-2 py-0.5 rounded-full font-semibold z-10
                                    ${selectedItem.unlocked ? 'bg-gradient-to-r from-custom-gradient-blue to-custom-gradient-green' : 'bg-gray-700'}`}
                            >
                                {selectedItem.unlocked ? selectedItem.rarity : 'Lock'}
                            </span>
                            <img
                                src={selectedItem.imageUrl}
                                alt={selectedItem.displayName}
                                className={`w-full h-full object-cover ${selectedItem.unlocked ? 'bg-white' : 'blur-md brightness-50'}`}
                            />
                            <p className="absolute bottom-2 right-2 font-semibold text-lg px-1">
                                {selectedItem.unlocked ? selectedItem.displayName : '??????' }
                            </p>
                        </div>

                        <p className="text-xl text-[#4AFFFC] font-semibold mt-8 mb-3">
                            {selectedItem.unlocked ? selectedItem.displayName : '??????'}
                        </p>

                        <p className="text-white text-xl mb-6">
                            {selectedItem.description}
                        </p>

                        {/* {selectedItem.unlockedAt && (
                            <p className="text-gray-600 text-xs mb-6">
                                획득일: {new Date(selectedItem.unlockedAt).toLocaleDateString()}
                            </p>
                        )} */}

                        <button
                            onClick={() => setSelectedItem(null)}
                            className="px-6 rounded-full bg-white text-[#6D6D6D] text-sm font-semibold transition-colors hover:opacity-70 cursor-pointer"
                        >
                            변경하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}