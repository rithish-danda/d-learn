"use client";
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link'
const formSchema = z
    .object({
        prompt: z.string(),
        domain: z.string(),
        context: z.string(),
        profile: z.string({required_error: "Please select a profile",})
    }
);
export default function AddCourse(){

    const [topic, setTopic] = useState('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        }
    });

    const prompt = useWatch({
        name: 'prompt',
        control: form.control
    });

    const domain = useWatch({
        name: 'domain',
        control: form.control
    });

    const context = useWatch({
        name: 'context',
        control: form.control
    });

    const profile = useWatch({
        name: 'profile',
        control: form.control
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        console.log(fetch('http://192.168.255.188:5000/api/endpoint'))
        window.location.reload();

        try {
            const response = await axios.post('http://192.168.255.18:5000/api/generate-and-upload-content', {
              topic: prompt,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error generating and uploading content:', error);
        }
    };
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
            <div className="flex align-middle justify-center">
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Add a <mark className="px-2 bg-inherit text-blue-500 rounded">new</mark> course</h1>
            </div>
            <div className="max-w-md w-full">
                <Form {...form}>
                    <form onSubmit = {form.handleSubmit(handleSubmit)} className="flex flex-col align-middle gap-4">
                        <FormField control={form.control} name="prompt" render={({field}) => {
                            return <FormItem>
                                <FormControl>
                                    <Input placeholder='What do you wanna learn?' type='text'  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />
                        <FormField control={form.control} name="domain" render={({field}) => {
                            return <FormItem>
                                <FormControl>
                                    <Input placeholder='Domain of the Course' type='text'  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />
                        <FormField control={form.control} name="context" render={({field}) => {
                            return <FormItem>
                                <FormControl>
                                    <Input placeholder='Extra Context' type='text'  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />
                        <FormField control={form.control} name="profile" render={({field}) => {
                            return <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="User Profile" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="businessAnalytics">Business Analytics</SelectItem>
                                            <SelectItem value="machineLearning">Machine Learning</SelectItem>
                                            <SelectItem value="plantSynthesis">Plant Synthesis</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />
                        <Button className="block mx-auto" variant='default'>Submit</Button>
                    </form> 
                </Form>
            </div>
        </main>
    );
}