'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from 'next/link';

interface Profile {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
}
const profiles = [
  { id: '1', name: 'User 1', description: 'Description 1', photoUrl: '/user1.jpg' },
  { id: '2', name: 'User 2', description: 'Description 2', photoUrl: '/user2.jpg' },
  { id: '3', name: 'User 3', description: 'Description 3', photoUrl: '/user3.jpg' },
];

export default function EditProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile>({
    id: '',
    name: '',
    description: '',
    photoUrl: '',
  });

  useEffect(() => {
    if (id) {
      const selectedProfile = profiles.find(p => p.id === id);
      if (selectedProfile) {
        setProfile(selectedProfile);
      } else {
        setProfile({
          id: '',
          name: '',
          description: '',
          photoUrl: '',
        });
      }
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleDeleteProfile = () => {
    setProfile({
      id: '',
      name: '',
      description: '',
      photoUrl: '',
    });
  };

  return (
    <div className="space-y-6 flex flex-col items-center justify-center mt-10">
        <Link
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="/"
            rel="noopener noreferrer"
        >
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                <code className="font-mono">Go back to Home Page</code>
            </p>
        </Link>
        <h1 className="text-3xl font-bold pt-20">{profile.id ? 'Edit Profile' : 'Create New Profile'}</h1>
        <form className="space-y-4">
            <div className="space-y-2">
            <Label htmlFor="photo">Profile Photo</Label>
            <div className="flex items-center space-x-4">
                {profile.photoUrl ? (
                <Image src={profile.photoUrl} alt="Profile" width={100} height={100} className="rounded-full" />
                ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">No Photo</div>
                )}
                <Input id="photo" type="file" accept="image/*" />
            </div>
            </div>
            <div className="space-y-2">
            <Label htmlFor="name">Profile Name</Label>
            <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
            />
            </div>
            <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
                id="description"
                name="description"
                value={profile.description}
                onChange={handleInputChange}
            />
            </div>
            <Button type="submit">{profile.id ? 'Update Profile' : 'Create Profile'}</Button>
            <Button variant="destructive" onClick={handleDeleteProfile} className='ml-4'>Delete Profile</Button>
        </form>
    </div>
  );
}
