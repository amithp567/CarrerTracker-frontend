
import { useEffect, useState } from "react";
import {
  X,
  Plus,
  Search,
  Save,
  ArrowUpRight,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  GetTagsAPI,
  GetCompanyAPI,
  UpdateCompanyAPI,
  RemoveTagAPI,
  AddTagAPI,
  DeleteCompanyAPI,
} from "../api/company";

import { getErrorMessage } from "./ErrorCatcher";

const DetailCompany = ({ companyId, onClose }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);

        const response = await GetCompanyAPI(companyId);
        const data = response.data;

        setCompany(data);
        setSelectedTags(data.tags || []);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await GetTagsAPI(search);

        setAvailableTags(response.data.results);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    };

    const timer = setTimeout(fetchTags, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleChange = (e) => {
    if (!company) return;

    const { name, value } = e.target;

    setCompany({
      ...company,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company) return;

    try {
      setSaving(true);

      const payload = {
        name: company.name,
        description: company.description,
        company_url: company.company_url,
        career_url: company.career_url,
        priority: company.priority,
      };

      await UpdateCompanyAPI(payload, companyId);

      toast.success("Company updated successfully.");

      const response = await GetCompanyAPI(companyId);

      setCompany(response.data);
      setSelectedTags(response.data.tags || []);
      setIsEdit(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveTag = async (tagId) => {
    try {
      await RemoveTagAPI(companyId, tagId);

      const response = await GetCompanyAPI(companyId);

      setCompany(response.data);
      setSelectedTags(response.data.tags || []);

      toast.success("Tag removed successfully.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleAddTag = async (tagId) => {
    try {
      await AddTagAPI(companyId, tagId);

      const response = await GetCompanyAPI(companyId);

      setCompany(response.data);
      setSelectedTags(response.data.tags || []);

      toast.success("Tag Added successfully.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleCompanyDelete = async (companyId) => {
    try {
      const response = await DeleteCompanyAPI(companyId);

      toast.success(
        response.message || "Company Deleted successfully."
      );

      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (isDelete) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 company-modal-animation">
        <div
          className="relative max-h-[95vh] w-full max-w-md overflow-y-auto
          rounded-xl bg-white p-6 shadow-xl"
        >
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-red-100 p-3">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
          </div>

          <h2 className="text-center text-xl font-semibold text-gray-800">
            Are you sure?
          </h2>

          <p className="mt-2 text-center text-sm text-gray-500">
            Do you really want to delete this item? This action cannot be undone.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-5 py-2 text-sm
              font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDelete(!isDelete)}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => handleCompanyDelete(companyId)}
              className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium
              text-white hover:bg-red-700"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="rounded-lg bg-white p-6 text-gray-600 shadow-xl">
          Loading company details...
        </div>
      </div>
    );
  }

  if (!company) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto
        rounded-xl bg-white p-6 shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        <h2 className="mb-6 text-center text-xl font-semibold text-gray-800">
          Company Details
        </h2>

        <form onSubmit={handleSubmit}>
          <section className="mb-5">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              {isEdit ? "Edit Company Information" : ""}
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {isEdit ? (
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Company Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={company.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                  />
                </div>
              ) : (
                <div className="mt-5">
                  <label className="text-sm">Name :</label>
                  <div className="rounded-md bg-gray-100 p-3">
                    {company.name}
                  </div>
                </div>
              )}

              {isEdit ? (
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={company.priority}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                  >
                    <option value="LOW">Low</option>
                    <option value="MID">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
              ) : (
                <div className="mt-5">
                  <label className="text-sm">Priority :</label>
                  <div className="rounded-md bg-gray-100 p-3">
                    {company.priority}
                  </div>
                </div>
              )}

              {isEdit ? (
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Company URL
                  </label>

                  <input
                    type="url"
                    name="company_url"
                    value={company.company_url || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                  />
                </div>
              ) : (
                <a
                  href={company.company_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-lg border border-blue-200
                  bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition-all duration-200
                  hover:border-blue-400 hover:bg-blue-100 hover:shadow-sm"
                >
                  Visit Company Website
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5"
                  />
                </a>
              )}

              {isEdit ? (
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Career URL
                  </label>

                  <input
                    type="url"
                    name="career_url"
                    value={company.career_url || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                  />
                </div>
              ) : (
                <a
                  href={company.career_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-lg border border-blue-200
                  bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition-all duration-200
                  hover:border-blue-400 hover:bg-blue-100 hover:shadow-sm"
                >
                  Visit Career Page
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5"
                  />
                </a>
              )}
            </div>

            {isEdit ? (
              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  name="description"
                  value={company.description || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                />
              </div>
            ) : (
              <div className="mt-5">
                <label className="text-sm">Description :</label>
                <div className="rounded-md bg-gray-100 p-3">
                  {company.description}
                </div>
              </div>
            )}

            {isEdit ? (
              <div className="my-5 flex w-full flex-col items-center justify-around gap-5 md:flex-row md:gap-0">
                <button
                  type="button"
                  className="flex w-50 items-center justify-center gap-2 rounded-lg bg-gray-300 px-8 py-2 text-sm font-medium
                  text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  <X size={20} />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex w-50 items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-2 text-sm font-medium
                  text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save size={20} />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <div className="my-5 flex w-full flex-col items-center justify-around gap-5 md:flex-row md:gap-0">
                <button
                  type="button"
                  className="flex w-50 items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-2 text-sm font-medium
                  text-white hover:bg-blue-700 disabled:opacity-50"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  <Edit size={20} />
                  Edit
                </button>

                <button
                  type="button"
                  className="flex w-50 items-center justify-center gap-2 rounded-lg bg-red-600 px-8 py-2 text-sm font-medium
                  text-white hover:bg-red-700 disabled:opacity-50"
                  onClick={() => setIsDelete(!isDelete)}
                >
                  <Trash2 size={20} />
                  Delete
                </button>
              </div>
            )}
          </section>
        </form>

        <hr className="my-6 text-gray-300" />

        <section className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Company Tags
          </h3>

          <label className="mb-2 block text-sm font-medium">
            Assigned Tags
          </label>

          <div className="mb-5 flex min-h-12 flex-wrap gap-2 rounded-lg p-2">
            {selectedTags.length > 0 ? (
              selectedTags.map((tag) => (
                <span
                  key={tag.id}
                  className="flex items-center gap-2 rounded-md bg-blue-50 px-3
                  py-1 text-sm text-blue-700"
                >
                  {tag.name}

                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag.id)}
                    className="text-blue-700 hover:text-red-500"
                    aria-label={`Remove ${tag.name}`}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-400">
                No tags assigned.
              </p>
            )}
          </div>

          <label className="mb-2 block text-sm font-medium">
            Add Tags
          </label>

          <div className="relative mb-3">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search available tags..."
              className="w-full rounded-lg border py-3 pl-10 pr-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-200">
            {availableTags
              .filter(
                (tag) =>
                  !selectedTags.some(
                    (selected) => selected.id === tag.id
                  )
              )
              .map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleAddTag(tag.id)}
                  className="flex w-full items-center justify-between p-3 text-left
                  text-sm hover:bg-gray-50 last:border-b-0"
                >
                  {tag.name}
                  <Plus size={16} className="text-blue-600" />
                </button>
              ))}

            {availableTags.length === 0 && (
              <p className="p-4 text-center text-sm text-gray-400">
                No tags found.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailCompany;
