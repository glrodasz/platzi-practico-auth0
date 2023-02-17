import { useState } from "react";
import Card from "./Card";
import Avatar from "./Avatar";

const Empty = ({ show }) => show ? <p>There are not movies a this time.</p> : null;

const Tab = ({ title, isSelected, icon, onClick }) => (
  <li className="mr-2">
    <a
      href="#"
      className={`inline-flex p-4 border-b-2 ${
        isSelected
          ? "text-blue-600 border-blue-600 rounded-t-lg active"
          : "border-transparent hover:text-stone-400 hover:border-stone-400"
      } dark:${
        isSelected
          ? "text-blue-500 border-blue-500"
          : "text-stone-400 hover:text-stone-200 group-hover:text-stone-200"
      }`}
      onClick={onClick}
      aria-current={isSelected ? "page" : null}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`w-5 h-5 mr-2 ${
          isSelected
            ? "text-blue-600 dark:text-blue-500"
            : "text-stone-400 dark:text-stone-200"
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {icon}
      </svg>
      {title}
    </a>
  </li>
);

const Tabs = ({ thrillerMovies, horrorMovies }) => {
  const [selectedTab, setSelectedTab] = useState("thriller");

  return (
    <section className="h-screen">
      <ul className="bg-white dark:bg-slate-800 flex justify-between text-sm font-medium text-center text-gray-500 dark:text-gray-400 max-w-800 mx-auto -mb-px sticky top-0">
        <div className="flex">
          <Tab
            title="Thriller"
            isSelected={selectedTab === "thriller"}
            onClick={() => setSelectedTab("thriller")}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            }
          />
          <Tab
            title="Horror"
            isSelected={selectedTab === "horror"}
            onClick={() => setSelectedTab("horror")}
            icon={
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                />
              </>
            }
          />
        </div>
        <Avatar />
      </ul>
      {selectedTab === "thriller" && (
        <article className="dark:text-white py-6 flex flex-wrap gap-x-10">
          {thrillerMovies.map((movie) => (
            <Card {...movie} />
          ))}
          <Empty show={thrillerMovies.length === 0} />
        </article>
      )}
      {selectedTab === "horror" && (
        <article className="dark:text-white py-6 flex flex-wrap gap-x-8">
          {horrorMovies.map((movie) => (
            <Card {...movie} />
          ))}
          <Empty show={horrorMovies.length === 0} />
        </article>
      )}
    </section>
  );
};

export default Tabs;
