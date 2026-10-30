import { useEffect, useState } from "react";
import { CompanyListAPI } from "../api/company";
import { GrNext, GrPrevious } from "react-icons/gr";

type CompanyTag = {
  id: string;
  name: string;
};

type CompanyRecord = {
  id: number | string;
  name: string;
  description: string;
  priority: string;
  tags?: CompanyTag[];
  created_at: string;
};

const Company = () => {
  const [companies, setCompanies] = useState<CompanyRecord[]>([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCompanies = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const response = await CompanyListAPI(pageNumber);
      const data = response.data;

      setCompanies(data.results);
      setCount(data.count);
      setNext(data.next);
      setPrevious(data.previous);
      setTotalPages(data.total_pages)

    } catch (error) {
      console.error("Failed to fetch companies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies(page);
  }, [page]);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="mb-5 sm:mb-0 text-center sm:text-left">
          <h1 className="text-2xl font-bold">
            Companies
          </h1>
          <p className="text-gray-500 text-sm">
            Manage and track your companies
          </p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add Company
        </button>
      </div>

      <div className="w-full overflow-hidden rounded-md border border-gray-200 bg-white">

        <table className="w-full text-left">
          <thead className="bg-gray-200 border-b border-gray-200">
            <tr className="text-xs font-semibold uppercase tracking-wide text-gray-800">
              <th className="px-5 py-4">Company</th>
              <th className="px-5 py-4">Priority</th>
              <th className="px-5 py-4">Tags</th>
              <th className="px-5 py-4">Created At</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-sm text-gray-500">
                  Loading companies...
                </td>
              </tr>
            ) : companies.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-sm text-gray-500">
                  No companies found.
                </td>
              </tr>
            ) : (
              companies.map((company) => (
                <tr
                  key={company.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-sm text-gray-800 capitalize">
                      {company.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {company.description}
                    </p>
                  </td>


                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs ${
                      company.priority === "HIGH"
                        ? "bg-red-50 text-red-700"
                        : company.priority === "MED"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-green-50 text-green-600"
                    }`}>
                      {company.priority}
                    </span>
                  </td>

                  {/* Tags */}
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {company.tags && company.tags.length > 0 ? (
                        company.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
                          >
                            {tag.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">
                          No tags
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(company.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mt-5 ">

        <p className="text-sm text-gray-500">
          Total companies: {count}
        </p>

        <div className="flex items-center gap-3">

          <button
            disabled={!previous || loading}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-2 rounded-lg text-white bg-blue-600 disabled:bg-gray-400"
          >
            <GrPrevious size={12}/>
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

    </div>
  );
};

export default Company;
