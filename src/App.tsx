import { SetStateAction } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { AppProvider } from "./Context/AppContext";
import { ToastContainer } from "react-toastify";
import { Item } from "./types/types";
import { Routes, Route } from "react-router-dom";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import TasksLayout from "./components/TaskLayout";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ViewTask from "./components/ViewTask";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <AppProvider
        getLength={function (): number {
          throw new Error("Function not implemented.");
        } }
        totalPage={0}
        returnPaginationRange={function (
          sibilings: number
        ): (string | number)[] {
          throw new Error("Function not implemented.");
        } }
        handleNextButton={function (): void {
          throw new Error("Function not implemented.");
        } }
        handlePreviousButton={function (): void {
          throw new Error("Function not implemented.");
        } }
        handleNumberButton={function (value: number | string): void {
          throw new Error("Function not implemented.");
        } }
        date={undefined}
        setDate={function (value: SetStateAction<Date | undefined>): void {
          throw new Error("Function not implemented.");
        } }
        getTasks={function (): Item[] {
          throw new Error("Function not implemented.");
        } }
        texts={[]}
        setTexts={function (value: SetStateAction<Item[]>): void {
          throw new Error("Function not implemented.");
        } }
        addText={function (
          title: string,
          fromTime: string | number | Date,
          toTime: string | number | Date,
          date: Date | undefined
        ): void {
          throw new Error("Function not implemented.");
        } }
        EditTextsById={function (id: number, newTitle: string): void {
          throw new Error("Function not implemented.");
        } }
        ToggleTextsCompletedById={function (id: number): void {
          throw new Error("Function not implemented.");
        } }
        DeleteTextsById={function (id: number): void {
          throw new Error("Function not implemented.");
        } } sortArray={function (): Item[] {
          throw new Error("Function not implemented.");
        } }      >
        <Header />
        <Hero />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/task" element={<TasksLayout />}>
            <Route path="/task/add" element={<AddTask />} />
            <Route path="/task/:id" element={<ViewTask />} />
            <Route path="/task/edit/:id" element={<EditTask />} />
          </Route>
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
