import type { Task } from "components/TaskTable";
import type { Weather } from "components/Weather";

export interface ApiResponse {
    tasks: Task[];
    weather: Weather;
    catFact: string;
}

interface TaskRequest {
    title: string;
    deadline: string;
}

export async function fetchData(): Promise<ApiResponse> {
    const response = await fetch('http://localhost:3000/tasks');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json() as Promise<ApiResponse>;
};

export async function deleteTask(id: string): Promise<void> {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};

export async function updateTask(id: string, updates: any): Promise<void> {
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    });
}

export const createTask = async (taskData: TaskRequest): Promise<void> => {
    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        if (!response.ok) {
            throw new Error(`Failed to create task: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

