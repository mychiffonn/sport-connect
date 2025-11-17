import { useState, useEffect } from "react"

interface FilterBarProps {
  onFilterChange: (filters: {
    sport_type?: string
    location?: string
    date_start?: string
    date_end?: string
    has_spots?: boolean
    search?: string
    sort?: string
  }) => void
  initialFilters?: {
    sport_type?: string
    location?: string
    date_start?: string
    date_end?: string
    has_spots?: boolean
    search?: string
    sort?: string
  }
}

export function FilterBar({ onFilterChange, initialFilters = {} }: FilterBarProps) {
  const [sportType, setSportType] = useState(initialFilters.sport_type || "")
  const [location, setLocation] = useState(initialFilters.location || "")
  const [dateStart, setDateStart] = useState(initialFilters.date_start || "")
  const [dateEnd, setDateEnd] = useState(initialFilters.date_end || "")
  const [hasSpots, setHasSpots] = useState(initialFilters.has_spots || false)
  const [search, setSearch] = useState(initialFilters.search || "")
  const [sortValue, setSortValue] = useState(initialFilters.sort || "date-asc")

  useEffect(() => {
    setSportType(initialFilters.sport_type || "")
    setLocation(initialFilters.location || "")
    setDateStart(initialFilters.date_start || "")
    setDateEnd(initialFilters.date_end || "")
    setHasSpots(initialFilters.has_spots || false)
    setSearch(initialFilters.search || "")
    setSortValue(initialFilters.sort || "date-asc")
  }, [initialFilters])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (dateStart && dateEnd && dateStart > dateEnd) {
      alert("Start date cannot be after end date")
      return
    }

    const filters = {
      sport_type: sportType || undefined,
      location: location || undefined,
      date_start: dateStart || undefined,
      date_end: dateEnd || undefined,
      has_spots: hasSpots ? true : undefined,
      search: search || undefined,
      sort: sortValue
    }

    // Remove empty values
    Object.keys(filters).forEach(
      (key) =>
        filters[key as keyof typeof filters] === undefined &&
        delete filters[key as keyof typeof filters]
    )

    onFilterChange(filters)
  }

  const handleReset = () => {
    setSportType("")
    setLocation("")
    setDateStart("")
    setDateEnd("")
    setHasSpots(false)
    setSearch("")
    setSortValue("date-asc")

    // Clear filters
    onFilterChange({})
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (sportType) count++
    if (location) count++
    if (dateStart) count++
    if (dateEnd) count++
    if (hasSpots) count++
    if (search) count++
    // don't count sort as it always has a value (default: date-asc)
    return count
  }

  return (
    <div className="card bg-base-200 mb-6 shadow-lg">
      <div className="card-body">
        <h3 className="card-title text-lg">Search & Filter Games</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Search Bar - Full Width */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Search</span>
            </label>
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, description, or location..."
              className="input input-bordered w-full"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Sort By</span>
            </label>
            <select
              name="sort"
              className="select select-bordered w-full"
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
            >
              <option value="date-asc">Date (Soonest First)</option>
              <option value="date-desc">Date (Latest First)</option>
              <option value="spots-desc">Most Spots Available</option>
              <option value="spots-asc">Least Spots Available</option>
              <option value="newest">Newest Games</option>
              <option value="oldest">Oldest Games</option>
            </select>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {/* Sport Type Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Sport</span>
              </label>
              <select
                name="sport_type"
                className="select select-bordered w-full"
                value={sportType}
                onChange={(e) => setSportType(e.target.value)}
              >
                <option value="">All Sports</option>
                <option value="Basketball">Basketball</option>
                <option value="Soccer">Soccer</option>
                <option value="Tennis">Tennis</option>
                <option value="Table Tennis">Table Tennis</option>
                <option value="Volleyball">Volleyball</option>
                <option value="Badminton">Badminton</option>
                <option value="Baseball">Baseball</option>
                <option value="Football">Football</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Filter by city..."
                className="input input-bordered w-full"
              />
            </div>

            {/* date Range Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date From</span>
              </label>
              <input
                type="date"
                name="date_start"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                max={dateEnd || undefined}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date To</span>
              </label>
              <input
                type="date"
                name="date_end"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                min={dateStart || undefined}
                className="input input-bordered w-full"
              />
            </div>

            {/* Available Spots Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Availability</span>
              </label>
              <div className="flex h-12 items-center">
                <label className="label cursor-pointer gap-2 p-0">
                  <input
                    type="checkbox"
                    name="has_spots"
                    checked={hasSpots}
                    onChange={(e) => setHasSpots(e.target.checked)}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">Has spots</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-control">
              <label className="label">
                <span className="label-text opacity-0">Actions</span>
              </label>
              <div className="flex gap-2">
                <button type="button" onClick={handleReset} className="btn btn-ghost btn-sm">
                  Clear
                </button>
                <button type="submit" className="btn btn-primary btn-sm gap-2">
                  Apply
                  {/*filter cuont badge*/}
                  {getActiveFilterCount() > 0 && (
                    <span className="badge badge-secondary">{getActiveFilterCount()}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
