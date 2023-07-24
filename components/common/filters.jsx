import { useEffect, useState } from "react";
import { Dropdown, Input } from ".";

const Filters = ({ filters, setFilterQuery }) => {
  const [filtersLocalState, setFiltersLocalState] = useState(filters);

  useEffect(() => {
    const query = filtersLocalState.reduce((acc, curr) => {
      if (curr.value) {
        acc += `filter[${curr.key}]=${curr.options || curr.directSearch ? curr.value : `/${curr.value}/`}&`;
      }
      return acc;
    }, "");
    setFilterQuery(query);
  }, [filtersLocalState]);

  const onFilterChange = (e, key) => {
    setFiltersLocalState(
      filtersLocalState.map((filter) => {
        if (filter.key === key) {
          filter.value = e.target.value;
        }
        return filter;
      })
    );
  };

  return (
    <div className="w-full mb-4">
      <span className="text-3xl text-white font-semibold">Filters</span>
      <div
        className={`w-full grid ${
          filters.length > 2 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
        } gap-x-6 lg:gap-y-2`}
      >
        {filtersLocalState.map((filter, index) => {
          return (
            <div
              key={`filter-${filter.key}-${index}`}
              className={`w-full h-full flex flex-col justify-center items-start`}
            >
              <span className="text-md text-white mt-2 mb-3">{filter.label}</span>
              {filter.options ? (
                <Dropdown
                  filterkey={filter.key}
                  options={filter.options}
                  className="h-12 sm:h-14"
                  onChange={onFilterChange}
                />
              ) : (
                <Input
                  className="h-12 sm:h-14"
                  value={filter.value}
                  placeholder="Search"
                  onChange={(e) => {
                    onFilterChange(e, filter.key);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
