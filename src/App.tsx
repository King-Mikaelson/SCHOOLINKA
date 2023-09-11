import { SetStateAction } from "react";
import "./App.css";
import { AppProvider } from "./Context/AppContext";
import { ToastContainer } from "react-toastify";
import { Item } from "./types/types";
import { Routes, Route } from "react-router-dom";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import TasksLayout from "./pages/TaskLayout/index";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ViewTask from "./pages/ViewTask";
import BottomMobileInput from "./components/BottomMobileInput";
import 'react-toastify/dist/ReactToastify.css';
import TasksList from "./pages/TasksList";
import Layout from "./pages/Layout";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <AppProvider
        date={undefined}
        setDate={function (value: SetStateAction<Date | undefined>): void {
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
        } } selectedTodo={null} setSelectedTodo={function (value: SetStateAction<string | number | null>): void {
          throw new Error("Function not implemented.");
        } } setSelectedDate={function (value: SetStateAction<Date | null>): void {
          throw new Error("Function not implemented.");
        } } selectedDate={null} returnFilteredDates={function (): Item[] {
          throw new Error("Function not implemented.");
        } } formatDate={function (date: Date, locale?: string | undefined): string {
          throw new Error("Function not implemented.");
        } }      >
        <Header />
        <Hero />
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/task" element={<TasksLayout />}>
            <Route path="/task/add" element={<AddTask />} />
            <Route path="/task/:id" element={<ViewTask />} />
            <Route path="/task/edit/:id" element={<EditTask />} />
          </Route>
        </Routes>
        <BottomMobileInput/>
      </AppProvider>
    </div>
  );
}

export default App;
