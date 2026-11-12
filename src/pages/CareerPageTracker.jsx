import { ArrowUpDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getErrorMessage } from "../components/ErrorCatcher";
import { GetTagsWithCompanyAPI } from "../api/tags";

const CareerPageTracker = () => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    setLoading(true);

    try {
      const response = await GetTagsWithCompanyAPI();
      setTags(response.data.results);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="p-6 company-modal-animation">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="mb-5 sm:mb-0 text-center sm:text-left">
          <h1 className="text-2xl font-bold">Tags</h1>
          <p className="text-gray-500 text-sm">
            Manage and Track Tags
          </p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Create Tag
        </button>
      </div>

      <div
        className="w-full flex flex-wrap items-center justify-center gap-3 rounded-lg 
        border border-gray-200 bg-white p-4 mb-2"
      >
        <div className="relative flex-1 min-w-[100px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Tags..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3
            text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="relative">
          <select
            className="appearance-none rounded-lg border border-gray-300 bg-white
            py-2 pl-9 pr-8 text-sm text-gray-700 outline-none
            focus:border-blue-500"
          >
            <option value="-created_at">Newest First</option>
            <option value="created_at">Oldest First</option>
            <option value="name">Name A-Z</option>
            <option value="-name">Name Z-A</option>
          </select>

          <ArrowUpDown
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-md border border-gray-200 bg-white">
        <div className="hidden md:grid md:grid-cols-3 bg-gray-200 border-b border-gray-200">
          <div className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-800">
            Name
          </div>

          <div className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-800">
            Description
          </div>

          <div className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-800">
            Created At
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">
            Loading tags...
          </div>
        ) : tags.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            No tags found.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 p-5
                transition-colors hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <p className="font-medium text-sm text-gray-800 capitalize">
                    {tag.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {tag.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerPageTracker;