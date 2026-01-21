import { useState } from "react";
import { useNotificationQuery } from "../hooks/queries/useNotificationQuery";

interface Params {
    notificationMode: boolean;
    setNotificationMode: (arg: boolean) => void;
}

type NotificationMenu = "ALL" | "DAILY" | "STUDY";

export const Notification = ({ notificationMode, setNotificationMode }: Params) => {

    const { data: notificationData } = useNotificationQuery();

    const [notificationMenu, setNotificationMenu] = useState<NotificationMenu>('ALL');

    console.log(notificationData);

    return (
        <div className="relative group">
            <button
                onClick={() => { setNotificationMode(!notificationMode) }}
                className="px-3 py-1.5 text-sm bg-custom-gray rounded-full hover:bg-custom-hover-gray transition cursor-pointer">
                새로운 알림
            </button>

            {notificationMode && (
                <div className='absolute flex flex-col top-10 right-0 w-43 h-55 bg-[#2C2C2C]/80 text-white text-[12px] border border-gray-600 rounded-xl overflow-hidden'>
                    <div className="px-2 pt-2" >
                        <div className="flex justify-center gap-2 rounded-full bg-[#393939] px-2 py-0.5">
                            <button
                                onClick={() => { setNotificationMenu('ALL') }}
                                className={`flex justify-center items-center text-[11px] ${notificationMenu === 'ALL' ? 'text-[#4AFFFC]' : 'text-white'} cursor-pointer`}
                            >
                                전체보기
                            </button>
                            <button
                                onClick={() => { setNotificationMenu('DAILY') }}
                                className={`flex justify-center items-center text-[11px] ${notificationMenu === 'DAILY' ? 'text-[#4AFFFC]' : 'text-white'} cursor-pointer`}
                            >
                                일일 퀘스트
                            </button>
                            <button
                                onClick={() => { setNotificationMenu('STUDY') }}
                                className={`flex justify-center items-center text-[11px] ${notificationMenu === 'STUDY' ? 'text-[#4AFFFC]' : 'text-white'} cursor-pointer`}
                            >
                                스터디
                            </button>
                        </div>
                    </div>

                    <div className='flex-1 w-full py-2 px-1 min-h-0'>
                        <div className={`flex flex-col gap-1 w-full h-full px-1.5 overflow-y-auto
                            [&::-webkit-scrollbar]:w-0.5
                            [&::-webkit-scrollbar-track]:bg-transparent
                            [&::-webkit-scrollbar-thumb]:bg-[#625E5E]
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            [&::-webkit-scrollbar-button]:hidden`}
                        >
                            {(notificationMenu === 'ALL' && notificationData?.onboarding && notificationData.onboarding.status === 'WAITING') && (
                                <NotificationItem
                                    category={'온보딩'}
                                    message={notificationData.onboarding.message}
                                    progress={`(${notificationData.onboarding.order}/${notificationData.onboarding.totalMissions})`}
                                />
                            )}

                            {(notificationMenu === 'ALL' || notificationMenu === 'DAILY') && (
                                notificationData?.dailyQuests.map((quest, index) => (
                                    <NotificationItem
                                        key={index}
                                        category={'일일 퀘스트'}
                                        message={quest.message}
                                        progress={`(${quest.current}/${quest.max})`}
                                    />
                                ))
                            )}

                            {(notificationMenu === 'ALL' || notificationMenu === 'STUDY') && (
                                notificationData?.notifications.map((quest, index) => (
                                    <NotificationItem
                                        key={index}
                                        category={'일일 퀘스트'}
                                        message={quest.message}
                                    />
                                ))
                            )}

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

interface NotificationItemParams {
    category: string;
    message: string;
    progress?: string;
}

const NotificationItem = ({ category, message, progress }: NotificationItemParams) => {

    return (
        <div className="flex flex-col px-2 py-0.5 bg-[#393939] rounded shrink-0">
            <div className="items-start text-[#4AFFFC]">
                [{category}]
            </div>
            <div className="flex justify-between">
                <div>
                    {message}
                </div>
                {progress && (
                    <div>
                        {progress}
                    </div>
                )}
            </div>
        </div>
    )
}