import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { AppContextProp, Item } from "../../src/types/types";
import { toast } from "react-toastify";
import _ from "lodash";
import todoData from "../data";
import { useNavigate } from "react-router-dom";
const AppContext = createContext<AppContextProp>(null!);

export default AppContext;

export const AppProvider: React.FC<AppContextProp> = ({ children }) => {

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  let currentPage = JSON.parse(localStorage.getItem("page")!);
  const [page, setPage] = useState<string | number>(
    currentPage ? currentPage : 0
  );
  const [selectedTodo, setSelectedTodo] = useState<string | number | null>(
    null
  );
  const [date, setDate] = React.useState<Date>();
  const saved = JSON.parse(localStorage.getItem("texts")!);
  // const[fetchedData, setFetchedData]=useState([])
  // const [texts, setTexts] = useState<Item[] | []>((saved && saved.length > 0) !== false ? saved : fetchedData);
  const [texts, setTexts] = useState<Item[] | [] >([]);

  const formatDate = (date: Date, locale: string = "en-us"): string => {
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const sortArray = () => {
    let sortedArray = texts?.sort((a, b) => b.id - a.id)
      return sortedArray;
  };

  // A function that return todos by filtered dates
  const returnFilteredDates = () => {
    return sortArray().filter((item) => item.date === formatDate(selectedDate!))
  }
 
  console.log(returnFilteredDates())
  useEffect(() => {
    sortArray();
  }, [texts]);


  function formatTime(inputTime: Date) {
    // Parse the input time string
    const parsedTime = new Date(inputTime);

    // Get the hours and minutes from the parsed time
    const hours = parsedTime.getHours();
    const minutes = parsedTime.getMinutes();

    // Convert the hours to 12-hour format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    // Determine if it's AM or PM
    const amOrPm = hours >= 12 ? "pm" : "am";

    // Format minutes with leading zero
    const formattedMinutes = minutes.toString().padStart(2, "0");

    // Combine the formatted time
    const formattedTime = `${formattedHours}:${formattedMinutes}${amOrPm}`;

    return formattedTime;
  }

  function getRandomDate(startDate: Date, endDate: Date) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const randomTimestamp =
      Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) +
      startTimestamp;
    return new Date(randomTimestamp);
  }

  function getRandomTime() {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);
    return new Date(0, 0, 0, hours, minutes, seconds);
  }

  function updateArrayWithRandomValues(array: Item[]) {
    const startDate = new Date(2023, 8, 1); // 1st September
    const endDate = new Date(); // 11th September

    for (let i = 0; i < array.length; i++) {
      const randomDate = formatDate(getRandomDate(startDate, endDate));
      const randomFromTime = formatTime(getRandomTime());
      const randomToTime = formatTime(getRandomTime());

      // Set the random date and times on the existing object
      array[i].date = randomDate;
      array[i].fromTime = randomFromTime;
      array[i].toTime = randomToTime;
    }
    return array;
  }

  useEffect(() => {
    let currentTodo = localStorage.getItem("currentTodo");
    if (currentTodo) {
      setSelectedTodo(JSON.parse(currentTodo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentTodo", JSON.stringify(selectedTodo));
  }, [selectedTodo]);

  useEffect(() => {
    const saved = localStorage.getItem("texts");
    if (saved) {
      setTexts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("texts", JSON.stringify(texts));
  }, [texts]);

  useEffect(() => {
    const saved = localStorage.getItem("page");
    if (saved) {
      setPage(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("page", JSON.stringify(page));
  }, [page]);

  const baseURL = " https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const data = updateArrayWithRandomValues(response.data);
      if (!(saved && saved.length > 0)) {
        setTexts(data);
      } else {
        setTexts(saved);
      }
    });
  }, []);

  function addText(
    title: string,
    fromTime: string | number | Date,
    toTime: string | number | Date,
    date: any
  ) {
    const firstElement = texts[0];
    const newId = firstElement ? Number(firstElement.id) + 1 : 1;

    setTexts([
      ...texts,
      {
        id: newId,
        completed: false,
        date: formatDate(date),
        toTime: toTime,
        title: title,
        fromTime: fromTime,
        userId: Math.floor(Math.random() * 10) + 1,
      },
    ]);
    toast.success("Todo Added Successfully");
  }

  function ToggleTextsCompletedById(id: number) {
    const newTexts = texts.map((text) => {
      if (text.id === id) {
        return {
          ...text,
          completed: !text.completed,
        };
      }
      return text;
    });
    setTexts(newTexts);
  }

  function EditTextsById(
    id: number,
    title: string,
    fromTime: string | number | Date,
    toTime: string | number | Date,
    date: Date
  ) {
    const newTexts = texts.map((text) => {
      if (text.id === id) {
        return {
          ...text,
          title,
          fromTime: fromTime,
          toTime: toTime,
          date: formatDate(date),
        };
      }
      return text;
    });
    setTexts(newTexts);
  }

  function DeleteTextsById(id: number) {
    const newArray = texts.filter((text) => text.id !== id);
    setTexts(newArray);
    toast.success("Todo Deleted Successfully");
    navigate("/");
  }





  const contextData = {
    page,
    setPage,
    date,
    setDate,
    texts,
    setTexts,
    addText,
    DeleteTextsById,
    EditTextsById,
    ToggleTextsCompletedById,
    sortArray,
    selectedTodo,
    setSelectedTodo,
    selectedDate,
    setSelectedDate,
    returnFilteredDates,
    formatDate
  };

  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};
