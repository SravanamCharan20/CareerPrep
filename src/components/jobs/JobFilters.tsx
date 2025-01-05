import React from 'react';

interface FiltersState {
  type: string[];
  location: string[];
  role: string[];
}

interface JobFiltersProps {
  selectedFilters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
}

export function JobFilters({ selectedFilters, onFilterChange }: JobFiltersProps) {
  const filterCategories = {
    type: ['Full-Time', 'Part-Time', 'Internship', 'Contract'],
    location: ['Remote', 'On-Site', 'Hybrid'],
    role: ['Software Engineer', 'Data Scientist', 'Product Manager', 'Designer']
  };

  const toggleFilter = (category: keyof FiltersState, value: string) => {
    const newFilters = { ...selectedFilters };
    if (newFilters[category].includes(value)) {
      newFilters[category] = newFilters[category].filter(v => v !== value);
    } else {
      newFilters[category] = [...newFilters[category], value];
    }
    onFilterChange(newFilters);
  };

  return (
    <aside className="w-full lg:w-64 space-y-6">
      {Object.entries(filterCategories).map(([category, values]) => (
        <div key={category} className="bg-white dark:bg-primary-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-primary-900 dark:text-white capitalize mb-3">
            {category}
          </h3>
          <div className="space-y-2">
            {values.map((value) => (
              <label key={value} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-primary-300 text-primary-600 focus:ring-primary-500"
                  checked={selectedFilters[category as keyof FiltersState].includes(value)}
                  onChange={() => toggleFilter(category as keyof FiltersState, value)}
                />
                <span className="ml-2 text-sm text-primary-600 dark:text-primary-300">
                  {value}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}