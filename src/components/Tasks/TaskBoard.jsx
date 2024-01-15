import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTask from "./AddTask";

const TaskBoard = () => {
  const defaultTask = {
    id: 1,
    title: "Learn React Native",
    description:
      "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTask] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleADD = (newTask, isAdd) => {
    if (isAdd) {
      setTask([...tasks, newTask]);
    } else {
      const updateTask = tasks.map((task) =>
        task.id === newTask.id ? newTask : task
      );
      setTask(updateTask);
    }
    handleCloseClick();
  };

  const handleEdit = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    const tasksAfterDelete = tasks.filter((task) => task.id !== id);
    setTask(tasksAfterDelete);
  };

  const handleDeleteAll = () => {
    setTask([]);
  };

  const handleFav = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    const newTaskArray = [...tasks];
    newTaskArray[taskIndex].isFavorite = !newTaskArray[taskIndex].isFavorite;
    setTask(newTaskArray);
  };

  const handleCloseClick = () => {
    setShowAddModal(false);
    setTaskToUpdate(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;

    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTask([...filtered]);
  };

  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        {showAddModal && (
          <AddTask
            onSave={handleADD}
            taskToUpdate={taskToUpdate}
            onCloseClick={handleCloseClick}
          />
        )}
        {/* <!-- Search Box --> */}
        <SearchTask onSearch={handleSearch} />
        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            handleADD={() => {
              setShowAddModal(true);
            }}
            handleDeleteAll={handleDeleteAll}
          />
          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onFav={handleFav}
          />
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
