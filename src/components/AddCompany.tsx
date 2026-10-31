import { useState } from "react";
import { toast } from "react-toastify";
import { getErrorMessage } from "./ErrorCatcher";
import { GetTagsAPI, CreateCompanyAPI } from "../api/company";
import { IoCloseSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";


interface Tag {
    id: string;
    name: string;
}

interface AddCompanyData {
    onClose: () => void;
    onSuccess: () => Promise<void>;
}

const AddCompany = ({ onClose, onSuccess }: AddCompanyData) => {

    const [formData, setFormData] = useState<{ 
        name: string;
        description: string;
        company_url: string;
        career_url: string;
        priority: string;
        tags: string[];
    }>({
        name: "",
        description: "",
        company_url: "",
        career_url: "",
        priority: "MID",
        tags: [],
    });

    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [availableTags, setAvailableTags] = useState<Tag[]>([]);

    const [tagSearch, setTagSearch] = useState("");
    const [isTagOpen, setIsTagOpen] = useState(false);

    const [tagLoading, setTagLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | 
        HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const fetchTags = async (search = "") => {
        try {
            setTagLoading(true);

            const response = await GetTagsAPI(search);
            setAvailableTags(response.data.results);

        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setTagLoading(false);
        }
    };

    const handleSelectTag = (tag: Tag) => {

        if (formData.tags.includes(tag.id)) {
            return;
        }

        setFormData(prev => ({
            ...prev,
            tags: [...prev.tags, tag.id],
        }));

        setSelectedTags(prev => [...prev, tag]);

        setTagSearch("");
        fetchTags("");
    };

    const handleRemoveTag = (tagId: string) => {

        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(id => id !== tagId),
        }));

        setSelectedTags(prev =>
            prev.filter(tag => tag.id !== tagId)
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        try {
            setLoading(true);

            const response = await CreateCompanyAPI({
                    ...formData,
                });

            await onSuccess();

            toast.success(response.message || "Company created successfully");

        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center 
            justify-center bg-black/50 p-3 sm:p-5"
        >

            <div 
                className="relative flex max-h-[95vh] w-full max-w-2xl 
                flex-col overflow-hidden rounded-xl bg-white shadow-xl"
            >

                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 sm:px-7">

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Add Company
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Add a new company to your tracker.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 
                        hover:text-gray-800"
                    >
                        <IoCloseSharp size={20}/>
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-1 flex-col overflow-y-auto"
                >

                    <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-7">

                        <div className="sm:col-span-2">

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Company Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter company name"
                                required
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 
                                outline-none focus:border-blue-500"
                            />

                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Company Website
                            </label>

                            <input
                                type="url"
                                name="company_url"
                                value={formData.company_url}
                                onChange={handleChange}
                                placeholder="https://company.com"
                                className="w-full rounded-lg border border-gray-300 
                                px-3 py-2.5 outline-none focus:border-blue-500"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Career Page URL
                            </label>

                            <input
                                type="url"
                                name="career_url"
                                value={formData.career_url}
                                onChange={handleChange}
                                required
                                placeholder="https://company.com/careers"
                                className="w-full rounded-lg border border-gray-300 
                                px-3 py-2.5 outline-none focus:border-blue-500"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Priority
                            </label>

                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 
                                bg-white px-3 py-2.5 outline-none focus:border-blue-500"
                            >
                                <option value="LOW">Low</option>
                                <option value="MED">Med</option>
                                <option value="HIGH">High</option>
                            </select>

                        </div>

                        <div className="relative">

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Tags
                            </label>

                            <div
                                onClick={() => {
                                    if (!isTagOpen) {
                                        setIsTagOpen(true);
                                        fetchTags("");
                                    }
                                }}
                                className="flex min-h-11 w-full cursor-pointer flex-wrap items-center 
                                gap-2 rounded-lg border border-gray-300 p-2.5 focus-within:border-blue-500"
                            >

                                {selectedTags.length > 0 ? (

                                    selectedTags.map(tag => (
                                        <span
                                            key={tag.id}
                                            className="flex items-center gap-2 rounded-md bg-blue-100 
                                            px-2 py-1 text-sm text-blue-700"
                                        >
                                            {tag.name}

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveTag(tag.id);
                                                }}
                                                className="font-bold hover:text-red-500"
                                            >
                                                <IoCloseSharp size={15}/>
                                            </button>
                                        </span>
                                    ))

                                ) : (

                                    <span className="text-sm text-gray-400">
                                        Select tags...
                                    </span>

                                )}

                                <span className="ml-auto text-gray-400">
                                    ⌄
                                </span>

                            </div>

                            {isTagOpen && (

                                <div 
                                    className="absolute z-40 mt-1 w-full overflow-hidden rounded-lg 
                                    border border-gray-200 bg-white shadow-lg"
                                >
                                    <div className="border-b p-2">
                                        <input
                                            type="text"
                                            value={tagSearch}
                                            autoFocus
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setTagSearch(value);
                                                fetchTags(value);
                                            }}
                                            onKeyDown={(e) => {

                                                if (e.key === "Enter") {
                                                    e.preventDefault();

                                                    const firstTag = availableTags.find(
                                                        tag => !formData.tags.includes(tag.id)
                                                    );

                                                    if (firstTag) {
                                                        handleSelectTag(firstTag);
                                                    }
                                                }

                                                if (e.key === "Escape") {
                                                    setIsTagOpen(false);
                                                }
                                            }}
                                            placeholder="Search tags..."
                                            className="w-full rounded-md border border-gray-200 px-3 py-2 
                                            text-sm outline-none focus:border-blue-500"
                                        />

                                    </div>

                                    <div className="max-h-48 overflow-y-auto">

                                        {tagLoading ? (

                                            <p className="p-3 text-center text-sm text-gray-400">
                                                Loading tags...
                                            </p>

                                        ) : availableTags.length > 0 ? (

                                            availableTags.map(tag => {

                                                const isSelected = formData.tags.includes(tag.id);

                                                return (
                                                    <button
                                                        key={tag.id}
                                                        type="button"
                                                        disabled={isSelected}
                                                        onClick={() => handleSelectTag(tag)}
                                                        className="flex w-full items-center justify-between px-3 py-2.5 
                                                        text-left text-sm hover:bg-gray-100 disabled:cursor-not-allowed 
                                                        disabled:opacity-40"
                                                    >
                                                        <span>{tag.name}</span>

                                                        {isSelected && (
                                                            <span className="text-blue-600">
                                                                <TiTick size={20}/>
                                                            </span>
                                                        )}

                                                    </button>
                                                );
                                            })

                                        ) : (

                                            <p className="p-3 text-center text-sm text-gray-400">
                                                No tags found
                                            </p>

                                        )}

                                    </div>

                                    <div 
                                        className="text-center py-2 font-bold text-sm text-blue-600 
                                        hover:bg-blue-100 cursor-pointer"
                                        onClick={() => {
                                                setIsTagOpen(false);
                                                setTagSearch(""); }}
                                    >
                                            Close
                                    </div>

                                </div>

                            )}

                            <p className="mt-1 text-xs text-gray-400">
                                Search and select multiple tags.
                            </p>

                        </div>

                        <div className="sm:col-span-2">

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Add some information about the company..."
                                rows={4}
                                className="w-full resize-none rounded-lg border border-gray-300 
                                px-3 py-2.5 outline-none focus:border-blue-500"
                            />

                        </div>

                    </div>

                    <div className="flex justify-center border-t border-gray-200 bg-gray-50 px-5 py-4">

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 px-10 py-2.5 font-medium 
                            text-white transition hover:bg-blue-700 disabled:cursor-not-allowed 
                            disabled:opacity-60 sm:w-auto"
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddCompany;