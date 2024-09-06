import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Assume this function exists in your api.ts file
import { createTask } from 'api';

const CreateTask = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState('');

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setIsOpen(false);
            setTitle('');
            setDeadline('');
        },
        onError: (error) => {
            setError('Failed to create task. Please try again.');
            console.error("Failed to create task:", error);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !deadline) {
            setError('Please fill in all fields');
            return;
        }
        createMutation.mutate({ title, deadline: new Date(deadline).toISOString() });
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Create Task
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Task</h3>
                            <form onSubmit={handleSubmit} className="mt-2 text-left">
                                <div className="mt-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                                    <input
                                        type="datetime-local"
                                        name="deadline"
                                        id="deadline"
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                        className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTask;
