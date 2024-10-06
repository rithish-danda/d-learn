'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Profile {
  id: string;
  name: string;
}

interface Course {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  progress: number;
}

export default function Dashboard() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch('/api/profiles');
      const data = await response.json();
      setProfiles(data);
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (selectedProfile) {
      const fetchCourses = async () => {
        const response = await fetch(`/api/courses?profileId=${selectedProfile}`);
        const data = await response.json();
        setCourses(data);
      };

      const handleCourseClick = (courseId: string) => {
        window.location.href = `/course-branch/${courseId}`;
      };
      fetchCourses();
    }
  }, [selectedProfile]);

  return (
    <div className="p-6 ml-10">
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
        <h1 className="text-2xl font-bold mb-6 mt-10">Dashboard</h1>
        
        {!selectedProfile ? (
            <div>
            <h2 className="text-xl font-semibold mb-4">Select a Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profiles.map((profile) => (
                <Button
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile.id)}
                >
                    {profile.name}
                </Button>
                ))}
            </div>
            </div>
        ) : (
            <div>
            <button
                className="mb-4 text-blue-600 hover:underline"
                onClick={() => setSelectedProfile(null)}
            >
                ← Back to Profiles
            </button>
            <h2 className="text-xl font-semibold mb-4">Courses</h2>
            <div className="space-y-4">
                {courses.map((course) => (
                <div key={course.id} className="flex items-center border rounded-lg p-4">
                    <div className="flex-shrink-0 mr-4">
                    <Image
                        src={course.imageUrl}
                        alt={course.title}
                        width={100}
                        height={100}
                        className="rounded-lg"
                    />
                    </div>
                    <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="text-gray-600">{course.subtitle}</p>
                    <div className="mt-2">
                        <Progress value={course.progress} className="w-full" />
                        <span className="text-sm text-gray-500">{course.progress}% complete</span>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        )}
    </div>
  );
}