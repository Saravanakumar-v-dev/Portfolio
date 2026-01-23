import React from "react";

export default function EducationCard({ college, degree, period, details = [] }) {
  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold">{degree}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{college}</p>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{period}</p>

      {details.length > 0 && (
        <ul className="mt-4 list-disc list-inside text-sm space-y-1">
          {details.map((d, i) => (
            <li key={i} className="text-gray-700 dark:text-gray-200">
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
