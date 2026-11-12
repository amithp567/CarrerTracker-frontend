import { useEffect, useState } from "react";
import { CompanyListAPI } from "../api/company";
import { GrNext, GrPrevious } from "react-icons/gr";
import AddCompany from "../components/AddCompany";
import DetailCompany from "../components/DetailCompany";
import {
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddCompany, setIsAddCompany] = useState(false);
  const [selectedComapanyId, setSelectedComapanyId] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams("");

  const [page, setPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [ordering, setOrdering] = useState(
    searchParams.get("ordering") || ""
  );

  const [priority, setPriority] = useState(
    searchParams.get("priority") || ""
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCompanies(page);
    }, 300);

    return () => clearTimeout(timer);
  }, [page, search, ordering, priority]);

  const fetchCompanies = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const response = await CompanyListAPI(
        pageNumber,
        search,
        ordering,
        priority
      );

      const data = response.data;

      setCompanies(data.results);
      setCount(data.count);
      setNext(data.next);
      setPrevious(data.previous);
      setTotalPages(data.total_pages);
    } catch (error) {
      toast.error("Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };

  if (isAddCompany) {
    return (
      <AddCompany
        onClose={() => setIsAddCompany(false)}
        onSuccess={async () => {
          await fetchCompanies();
          setIsAddCompany(false);
        }}
      />
    );
  }

  if (selectedComapanyId) {
    return (
      <DetailCompany
        companyId={selectedComapanyId}
        onClose={async () => {
          await fetchCompanies();
          setSelectedComapanyId(null);
        }}
      />
    );
  }

  return (
    <div className="p-6 company-modal-animation">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="mb-5 sm:mb-0 text-center sm:text-left">
          <h1 className="text-2xl font-bold">Companies</h1>
          <p className="text-gray-500 text-sm">
            Manage and track your companies
          </p>
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setIsAddCompany(true)}
        >
          + Add Company
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
            onChange={(e) => {
              const value = e.target.value;

              setSearch(value);
              setPage(1);

              if (value) {
                setSearchParams({ search: value });
              } else {
                setSearchParams({});
              }
            }}
            value={search}
            placeholder="Search companies..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3
            text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="relative">
          <select
            onChange={(e) => {
              const value = e.target.value;

              setPriority(value);
              setPage(1);

              if (value) {
                setSearchParams({ priority: value });
              } else {
                setSearchParams({});
              }
            }}
            className="appearance-none rounded-lg border border-gray-300 bg-white
            py-2 pl-9 pr-8 text-sm text-gray-700 outline-none
            focus:border-blue-500"
            value={priority}
          >
            <option value="">All Priorities</option>
            <option value="HIGH">High</option>
            <option value="MED">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <SlidersHorizontal
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        <div className="relative">
          <select
            onChange={(e) => setOrdering(e.target.value)}
            className="appearance-none rounded-lg border border-gray-300 bg-white
            py-2 pl-9 pr-8 text-sm text-gray-700 outline-none
            focus:border-blue-500"
            value={ordering}
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
        <div className="hidden md:grid md:grid-cols-4 bg-gray-200 border-b border-gray-200">
          <div className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-800">
            Company
          </div>

          <div className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-800">
            Priority
          </div>

          <div className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-800">
            Company Link
          </div>

          <div className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-800">
            Career Link
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">
            Loading companies...
          </div>
        ) : companies.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            No companies found.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {companies.map((company) => (
              <div
                key={company.id}
                onClick={() => setSelectedComapanyId(company.id)}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 p-5
                transition-colors hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <p className="font-medium text-sm text-gray-800 capitalize">
                    {company.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {company.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 md:hidden">
                    Priority:
                  </span>

                  <span
                    className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs ${
                      company.priority === "HIGH"
                        ? "bg-red-50 text-red-900"
                        : company.priority === "MED"
                        ? "bg-orange-50 text-orange-900"
                        : "bg-green-50 text-green-900"
                    }`}
                  >
                    {company.priority}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="text-xs text-gray-500 md:hidden mr-2">
                    Website:
                  </span>

                  {company.company_url && (
                    <a
                      href={company.company_url}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium
                      text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Company Website
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>

                <div className="flex items-center">
                  <span className="text-xs text-gray-500 md:hidden mr-2">
                    Career:
                  </span>

                  {company.career_url && (
                    <a
                      href={company.career_url}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium
                      text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      Career Page
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {companies.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mt-5">
          <p className="text-sm text-gray-500">
            Total companies: {count}
          </p>

          <div className="flex items-center gap-3">
            <button
              disabled={!previous || loading}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-2 rounded-lg text-white bg-blue-600 disabled:bg-gray-400"
            >
              <GrPrevious size={12} />
            </button>

            <span className="text-sm">
              Page {page} of {totalPages || 1}
            </span>

            <button
              disabled={!next || loading}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-2 rounded-lg text-white bg-blue-600 disabled:bg-gray-400"
            >
              <GrNext size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Company;