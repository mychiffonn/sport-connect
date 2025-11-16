interface FilterBarProps {
  onFilterChange: (filteres: {
    sport_type?: string
    location?: string
    date?: string
    has_spots?: boolean
  }) => void
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const filters = {
      sport_type: (formData.get("sport_type") as string) || undefined,
      location: (formData.get("location") as string) || undefined,
      date: (formData.get("date") as string) || undefined,
      has_spots: formData.get("has_spots") === "on" ? true : undefined
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
    onFilterChange({})
  }

  return (
    <div className="card bg-base-200 mb-6 shadow-lg">
      <div className="card-body">
        <h3 className="card-title text-lg">Filter Games</h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {/* sport type filter*/}
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
          {/* location filter*/}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="Search location..."
              className="input input-bordered w-full"
            />
          </div>
          {/* date filter*/}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input type="date" name="date" className="input input-bordered w-full" />
          </div>
          {/* availability filter*/}
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
          {/* action buttons*/}
          <div className="form-control">
            <button type="button" onClick={handleReset} className="btn btn-ghost">
              Clear Filters
            </button>
            <button type="submit" className="btn btn-primary">
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
