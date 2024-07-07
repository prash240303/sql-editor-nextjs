import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface QueryHistoryProps {
  history: string[];
  setQuery: (query: string) => void;
  setValue: (value: string) => void;
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

const QueryHistory: React.FC<QueryHistoryProps> = ({
  history,
  setQuery,
  setValue,
  setHistory,
}) => {
  const [search, setSearch] = useState("");

  const onClickHistory = (value: string) => {
    setQuery(value);
    setValue(value);
  };

  const handleRemoveHistory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    historyItem: string
  ) => {
    e.stopPropagation();
    setHistory((prevHistory) =>
      prevHistory.filter((history) => history !== historyItem)
    );
  };

  const filteredHistory = history.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full  p-6 bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Queries History</h2>
        {history.length > 0 && (
          <button
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
            aria-label="Delete All"
            onClick={() => setHistory([])}
          >
            <MdDelete size={24} />
          </button>
        )}
      </div>
      <Input
        placeholder="Search history..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <ScrollArea className="h-[82%] pr-2 rounded-md">
        {filteredHistory.length > 0 ? (
          <ul className="space-y-3 p-2">
            {filteredHistory.map((item, id) => (
              <li
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 p-3 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => onClickHistory(item)}
                key={`${item}---${id}`}
              >
                <div className="flex items-center text-sm space-x-2 text-gray-900 dark:text-gray-100">
                  <span>{item}</span>
                </div>
                <button
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1 transition-all rounded-sm hover:ring-1 hover:ring-gray-500 dark:hover:ring-gray-200"
                  aria-label="Delete"
                  onClick={(e) => handleRemoveHistory(e, item)}
                >
                  <MdDelete size={20} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 flex items-center justify-center mt-2 dark:text-gray-400">No queries found.</p>
        )}
      </ScrollArea>
    </div>
  );
};

export default QueryHistory;
