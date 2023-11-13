// Handler Functions -----------------------------------------------------------

export const handleFilterChange = (e, setFilter) => {
  const filter = e.target.value;
  setFilter(filter);
};

export const handleSearchChange = (
  e,
  data,
  setSearchInput,
  setFilteredData
) => {
  const searchValue = e.target.value.toLowerCase();
  setSearchInput(searchValue);

  const updatedFilteredData = data.filter((event) => {
    return event.eventName.toLowerCase().includes(searchValue);
  });

  setFilteredData(updatedFilteredData);
};

export const filterData = (filter, data) => {
  return data.filter((event) => event.category === filter);
};

// Fetching User Image ---------------------------------------------------------
