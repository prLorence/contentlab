import type React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CatFact from 'components/CatFact';
import LoadingOrError from 'components/LoadingOrError';
import SearchBox from 'components/SearchBox';
import TaskTable from 'components/TaskTable';
import WeatherInfo from 'components/Weather';
import { deleteTask, fetchData, updateTask } from 'api';
import CreateTask from 'components/CreateTask';


function Home(): React.ReactElement {
    const queryClient = useQueryClient();

    const { isPending, isError, error, data } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchData,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: async () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Record<string, any> }) => updateTask(id, updates),
        onSuccess: async () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    });

    const onDeleteTask = async (id: string): Promise<void> => {
        await deleteMutation.mutateAsync(id);
    };

    const onUpdateTask = async (id: string, updates: Record<string, any>): Promise<void> => {
        try {
            await updateMutation.mutateAsync({ id, updates });
        } catch (error) {
            console.error("Failed to update task:", error);
            // Optionally, you could add user feedback here
        }
    };

    if (isPending || isError) {
        return <LoadingOrError error={error as Error} />;
    }

    return (
        <div className="container mx-auto p-4">
            <WeatherInfo weather={data.weather} />
            <TaskTable
                tasks={data.tasks}
                onDeleteTask={onDeleteTask}
                onUpdateTask={onUpdateTask}
            />
            <CreateTask />
            <CatFact fact={data.catFact} />
        </div>
    );
}

export default Home;

