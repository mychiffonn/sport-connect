import { useState } from "react"

interface FilterBarProps {
  onFilterChange: (filteres: {
    sport_type?: string
    location?: string
    date?: string
    has_spots?: boolean
    search?: string
    sort?: string
  }) => void
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [sortValue, setSortValue] = useState("date-asc")
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const filters = {
      sport_type: (formData.get("sport_type") as string) || undefined,
      location: (formData.get("location") as string) || undefined,
      date: (formData.get("date") as string) || undefined,
      has_spots: formData.get("has_spots") === "on" ? true : undefined,
      search: (formData.get("search") as string) || undefined,
      sort: sortValue
    }

    // remove empty values
    Object.keys(filters).forEach(
      (key) =>
        filters[key as keyof typeof filters] === undefined &&
        delete filters[key as keyof typeof filters]
    )

    onFilterChange(filters)
  }

  const handleReset = () => {
    setSortValue("date-asc")
    onFilterChange({})
    const form = document.querySelector("form") as HTMLFormElement
    form?.reset()
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
              placeholder="Search by title, description, or location..."
              className="input input-bordered w-full"
            />
          </div>

          {/* sort dropdown*/}
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
              <select name="sport_type" className="select select-bordered w-full">
                <option value="">All Sports</option>
                <option value="Basketball">Basketball</option>
                <option value="Soccer">Soccer</option>
                <option value="Tennis">Tennis</option>
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
                placeholder="Filter by city..."
                className="input input-bordered w-full"
              />
            </div>

            {/* Date Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input type="date" name="date" className="input input-bordered w-full" />
            </div>

            {/* Available Spots Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Availability</span>
              </label>
              <div className="flex h-12 items-center">
                <label className="label cursor-pointer gap-2 p-0">
                  <input type="checkbox" name="has_spots" className="checkbox checkbox-primary" />
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
                <button type="submit" className="btn btn-primary btn-sm">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
