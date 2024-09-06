/* eslint-disable 
   no-underscore-dangle, 
   @typescript-eslint/consistent-indexed-object-style,
   @typescript-eslint/sort-type-constituents,
   jsx-a11y/control-has-associated-label
*/
import { useState } from "react";

export interface Task {
    _id: string;
    title: string;
    status: string;
    deadline: string;
}

interface TaskTableProperties {
    tasks: Task[];
    onDeleteTask: (id: string) => void;
    onUpdateTask: (id: string, updates: Partial<Task>) => void;
}

function TaskTable({ tasks, onDeleteTask, onUpdateTask }: TaskTableProperties): React.ReactElement {
    const [editedTask, setEditedTask] = useState<{ [key: string]: Partial<Task> }>({});

    const onInputChange = (id: string, field: keyof Task, value: string | boolean): void => {
        setEditedTask((previous) => ({
            ...previous,
            [id]: {
                ...previous[id],
                [field]: value,
            },
        }));
    };

    const onSave = (id: string): void => {
        const updates = editedTask[id];
        if (updates && Object.keys(updates).length > 0) {
            onUpdateTask(id, updates);
        }
        setEditedTask((previous) => ({ ...previous, [id]: {} }));
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Title</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-left">Deadline</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {tasks.map((task) => (
                        <tr key={task._id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">
                                <input
                                    type="text"
                                    value={editedTask[task._id]?.title ?? task.title} // Use optional chaining and default value
                                    onChange={(event) =>
                                        onInputChange(task._id, 'title', event.target.value)
                                    }
                                    className="w-full p-1 border border-gray-300 rounded"
                                />
                            </td>
                            <td className="py-3 px-6 text-left">
                                <select
                                    value={editedTask[task._id]?.status ?? task.status} // Use optional chaining and default value
                                    onChange={(event) =>
                                        onInputChange(task._id, 'status', event.target.value)
                                    }
                                    className="p-1 border border-gray-300 rounded"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="InProgress">In Progress</option>
                                </select>
                            </td>
                            <td className="py-3 px-6 text-left">
                                {new Date(task.deadline).toLocaleString()}
                            </td>
                            <td className="py-3 px-6 text-center">
                                <button
                                    onClick={() => onSave(task._id)}
                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                    type="button"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => onDeleteTask(task._id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    type="button"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskTable;
