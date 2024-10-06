'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

const CourseBranchPage = () => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedContentType, setSelectedContentType] = useState('lesson');

  const topics = ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5'];

  const renderContent = () => {
    switch (selectedContentType) {
      case 'lesson':
        return <div>Lesson content for {selectedTopic}</div>;
      case 'quiz':
        return <div>Quiz for {selectedTopic}</div>;
      case 'practice':
        return <div>Practice questions for {selectedTopic}</div>;
      default:
        return <div>Select a topic and content type</div>;
    }
  };

  return (
    <div className="m-10">
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
        <h1 className="text-3xl font-bold mb-6 mt-10">Course Name</h1>
        <div className="flex">
            <div className="w-1/4 pr-6">
            <h2 className="text-xl font-semibold mb-4">Roadmap</h2>
            <div className="flex flex-col space-y-2">
                {topics.map((topic) => (
                <Button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    variant={selectedTopic === topic ? 'default' : 'outline'}
                >
                    {topic}
                </Button>
                ))}
            </div>
            </div>
            <div className="w-3/4">
            <div className="mb-4">
                <Tabs value={selectedContentType} onValueChange={setSelectedContentType}>
                <TabsList>
                    <TabsTrigger value="lesson">Lesson</TabsTrigger>
                    <TabsTrigger value="quiz">Quiz</TabsTrigger>
                    <TabsTrigger value="practice">Practice Questions</TabsTrigger>
                </TabsList>
                </Tabs>
            </div>
            <div className="border p-4 rounded-lg">
                {renderContent()}
            </div>
            </div>
        </div>
    </div>
  );
};

export default CourseBranchPage;
