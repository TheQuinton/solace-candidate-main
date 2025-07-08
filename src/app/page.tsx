"use client";

import { useEffect, useState } from "react";
import { AdvocateType } from "./types/types";

export default function Home() {
  const [advocates, setAdvocates] = useState<AdvocateType[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<AdvocateType[]>([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    const searchElement = document.getElementById("search-term");
    if (searchElement) {
      searchElement.innerHTML = searchTerm;
    }

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  const styles = {
    headerCell: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
    bodyCell: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
  };
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl py-6 font-bold text-primary mb-2">Solace Advocates</h1>
        <div>
          <p>Search</p>
          <p>
            Searching for: <span id="search-term"></span>
          </p>
          <input 
            type="text"
            id="search-term"
            className="w-full px-4 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent bg-background"
            placeholder="Search by name or specialty..."
            onChange={onChange} 
          />
          <button 
            type="button"
              className="mt-2 px-4 py-2 text-sm font-medium text-white bg-accent border border-transparent rounded-md shadow-sm hover:bg-accentHover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-colors duration-200"
            onClick={onClick}
            >
              Reset Search
          </button>
        </div>
      </header>
      <div className="overflow-x-auto bg-background rounded-lg shadow">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-primary text-white">
            <tr>
              <th className={styles.headerCell}>First Name</th>
              <th className={styles.headerCell}>Last Name</th>
              <th className={styles.headerCell}>City</th>
              <th className={styles.headerCell}>Degree</th>
              <th className={styles.headerCell}>Specialties</th>
              <th className={styles.headerCell}>Years of Experience</th>
              <th className={styles.headerCell}>Phone Number</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-border">
            {filteredAdvocates.map((advocate, index) => (
              <tr key={advocate.id ?? index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{advocate.firstName}</td>
                <td className={styles.bodyCell}>{advocate.lastName}</td>
                <td className={styles.bodyCell}>{advocate.city}</td>
                <td className={styles.bodyCell}>{advocate.degree}</td>
                <td className={styles.bodyCell}>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {advocate.specialties.map((s, index) => (
                      <div key={index} className="px-2 py-1 text-xs font-medium rounded bg-accent text-white whitespace-nowrap">
                        {s}
                      </div>
                    ))}
                  </div>
                </td>
                <td className={styles.bodyCell}>{advocate.yearsOfExperience}</td>
                <td className={styles.bodyCell}>{advocate.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
