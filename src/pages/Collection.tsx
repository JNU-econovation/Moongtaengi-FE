import React, { useState } from 'react';
import cross from '../assets/icons/common/cross.svg';
import { useCollectionQuery } from '../hooks/queries/useCollectionQuery';
import { useChangeCollectionMutation } from '../hooks/mutations/useChangeCollectionMutation';

interface CollectionItem {
    type: string;
    displayName: string;
    rarity: 'COMMON' | 'RARE' | 'EPIC' | 'UNIQUE';
    description: string;
    unlocked: boolean;
    unlockedAt: string | null;
    imageUrl: string;
}

export default function Collection() {

    const {data: collectionData} = useCollectionQuery();

    console.log(collectionData);

    const {mutate, isPending} = useChangeCollectionMutation();

    const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);

    if (!collectionData) return null;

    // 대표 아이콘 찾기
    const equippedItem = collectionData.collections.find(
        (item) => (item.type === collectionData.equippedIcon)
    );

    const handleChange = (selectedItem: CollectionItem) => {
        if (!selectedItem.unlocked) {
            setSelectedItem(null);
            return;
        }

        mutate(selectedItem.type);
        setSelectedItem(null);
    }

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

                        {/* <span className="self-end mt-1 text-[#4AFFFC] text-sm hover:underline">
                            변경하기
                        </span> */}
                    </div>
                )}

            </section>

            <div className="w-[80%] h-px bg-white mt-6 mb-30" />

            {/* --- 하단: 컬렉션 리스트 --- */}
            <section className="w-full flex flex-col items-center">
                <p className="text-6xl font-semibold text-center mb-14">처음 스터디를 시작할 때</p>

                <div className="grid grid-cols-3 gap-4">
                    {collectionData.collections.map((item) => {
                        const isEquipped = (item.type === collectionData.equippedIcon);

                        return (
                            <div
                                key={item.type}
                                onClick={() => setSelectedItem(item)}
                                className={`
                                    relative w-64 aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-200
                                    ${isEquipped ? 'border border-[#4AFFFC]' : 'border border-[#606060] hover:border-white'}
                                    bg-[#1e1e1e]
                            `}
                            >
                                {/* 뱃지 */}
                                <span className={`
                                    absolute top-2 left-2 w-[25%] text-[10px] text-center font-semibold px-2 py-0.5 rounded-full z-10
                                    ${item.unlocked
                                        ? 'text-black bg-gradient-to-r from-custom-gradient-blue to-custom-gradient-green'
                                        : 'bg-[#606060] text-black'}
                                `}
                                >
                                    {item.unlocked ? item.rarity : 'Lock'}
                                </span>

                                {/* 이미지 */}
                                <img
                                    src={item.imageUrl}
                                    alt={item.displayName}
                                    className='w-full h-full object-cover transition-all duration-300'
                                />

                                {/* 텍스트 오버레이 */}
                                <div className="absolute bottom-2 right-2 text-center z-10 px-1">
                                    <span className={`text-lg font-semibold ${item.unlocked ? 'text-white' : 'text-[#606060]'}`}>
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
                        className="relative flex flex-col items-center bg-[#272727] text-white p-4 pt-16 rounded w-[50%] text-center shadow-2xl"
                    >

                        {/* 닫기 버튼 */}
                        <button
                            onClick={() => { setSelectedItem(null) }}
                            className="absolute right-4 top-4 text-white transition-colors hover:opacity-70 cursor-pointer"
                            type="button"
                        >
                            <img src={cross} className="w-3.5 mt-1 mr-1 invert" />
                        </button>


                        <div className={`relative w-45 h-45 rounded-xl overflow-hidden
                                ${selectedItem.unlocked ? 'border-2 border-[#4AFFFC]' : 'border-2 border-[#606060]'}`}
                        >
                            {/* 뱃지 */}
                            <span
                                className={`absolute top-2 left-2 w-[25%] text-[10px] font-semibold px-2 py-0.3 rounded-full font-semibold z-10
                                    ${selectedItem.unlocked
                                        ? 'text-black bg-gradient-to-r from-custom-gradient-blue to-custom-gradient-green'
                                        : 'bg-[#606060] text-black'}`}
                            >
                                {selectedItem.unlocked ? selectedItem.rarity : 'Lock'}
                            </span>

                            {/* 이미지 */}
                            <img
                                src={selectedItem.imageUrl}
                                alt={selectedItem.displayName}
                                className='w-full h-full object-cover'
                            />

                            {/* 텍스트 오버레이 */}
                            <p className={`absolute bottom-2 right-2 font-semibold text-lg px-1
                                ${selectedItem.unlocked ? 'text-white' : 'text-[#606060]'}`}
                            >
                                {selectedItem.unlocked ? selectedItem.displayName : '??????'}
                            </p>
                        </div>


                        {/* 뭉탱이 이름 */}
                        <p className="text-xl text-[#4AFFFC] font-semibold mt-8 mb-3">
                            {selectedItem.unlocked ? selectedItem.displayName : '??????'}
                        </p>

                        {/* 해금 방법 */}
                        <p className="text-white text-xl mb-6">
                            {selectedItem.description}
                        </p>

                        {/* {selectedItem.unlockedAt && (
                            <p className="text-gray-600 text-xs mb-6">
                                획득일: {new Date(selectedItem.unlockedAt).toLocaleDateString()}
                            </p>
                        )} */}


                        <button
                            onClick={() => {
                                handleChange(selectedItem)
                            }}
                            disabled={!selectedItem.unlocked}
                            className={`px-6 rounded-full bg-white text-[#6D6D6D] text-sm font-semibold transition-colors 
                                ${selectedItem.unlocked ? 'hover:opacity-70 cursor-pointer' : 'cursor-default'} `}
                        >
                            {isPending ? '변경 중...' : '변경하기'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}