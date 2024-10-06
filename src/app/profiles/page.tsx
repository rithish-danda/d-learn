'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useState } from 'react';

const ProfileAvatar = ({ src, alt }: { src: string; alt: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image src={src} alt={alt} layout="fill" objectFit="cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 text-white text-center py-1 text-sm">
                {alt}
            </div>
            {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <span className="text-white">Edit</span>
                </div>
            )}
        </div>
    );
};

const AddProfileButton = () => (
    <Link href="/edit-profile">
        <Button className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-4xl text-gray-600">+</span>
        </Button>
    </Link>
);

export default function Profiles() {
    const profiles = [
        { src: '/user1.jpg', alt: 'User 1' , id: 1},
        { src: '/user2.jpg', alt: 'User 2' , id: 2},
        { src: '/user3.jpg', alt: 'User 3' , id: 3},
    ];

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <Link
                    className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                    href="/"
                    rel="noopener noreferrer"
                >
                    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                        <code className="font-mono">Go back to Home Page</code>
                    </p>
                </Link>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="mb-8 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Manage <mark className="px-2 bg-inherit text-blue-500 rounded">Profiles</mark></h1>
                <div className="flex space-x-8 flex-wrap justify-center">
                    {profiles.map((profile, index) => (
                        <Link key={index} href={`/edit-profile/${profile.id}`}>
                            <ProfileAvatar src={profile.src} alt={profile.alt} />
                        </Link>
                    ))}
                    <AddProfileButton />
                </div>
            </div>
        </main>
    );
}