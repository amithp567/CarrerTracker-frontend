import {
  CheckCircle2,
  XCircle,
  ArrowUpRight
} from "lucide-react";
import { BsBuildingsFill, BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { PiStackPlusFill, PiEnvelopeSimpleOpenDuotone } from "react-icons/pi";
import { CgCloseR } from "react-icons/cg";

import { useNavigate } from "react-router-dom";

interface DashboardCard {
  title: string;
  count: number;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  path: string;
}

const dashboardData: DashboardCard[] = [
  {
    title: "Total Companies",
    count: 48,
    description: "Companies tracked",
    icon: <BsBuildingsFill size={21}/>,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    path: "/companies",
  },
  {
    title: "High Priority",
    count: 12,
    description: "Top opportunities",
    icon: <BsGraphUpArrow  size={21}/>,
    color: "text-red-600",
    bgColor: "bg-red-50",
    path: "/companies?priority=HIGH",
  },
  {
    title: "Medium Priority",
    count: 20,
    description: "Potential opportunities",
    icon: <MdOutlineHorizontalRule size={21}/>,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    path: "/companies?priority=MEDIUM",
  },
  {
    title: "Low Priority",
    count: 16,
    description: "Other opportunities",
    icon: <BsGraphDownArrow size={21} />,
    color: "text-green-600",
    bgColor: "bg-green-50",
    path: "/companies?priority=LOW",
  },
  {
    title: "Applications Open",
    count: 18,
    description: "Currently accepting",
    icon: <PiEnvelopeSimpleOpenDuotone  size={21}/>,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    path: "/companies?status=OPEN",
  },
  {
    title: "Applications Closed",
    count: 10,
    description: "No longer accepting",
    icon: <CgCloseR size={21}/>,
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    path: "/companies?status=CLOSED",
  },
  {
    title: "Total Applications",
    count: 28,
    description: "Applications tracked",
    icon: <PiStackPlusFill size={21}/>,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    path: "/applications",
  },
];


const Home = () => {
  const navigate = useNavigate();

  const totalCompanies = 48;

  const priorityData = [
    { name: "High Priority", count: 12, color: "bg-red-700" },
    { name: "Medium Priority", count: 20, color: "bg-yellow-600" },
    { name: "Low Priority", count: 16, color: "bg-green-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's your job tracking overview.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dashboardData.map((item) => {
          // const Icon = item.icon;

          return (
            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-5 
              shadow-sm transition duration-300 hover:-translate-y-1 
              hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-900 
                    transition group-hover:text-blue-600"
                  >
                    {item.count}
                  </h2>
                </div>

                <div 
                  className={`rounded-xl p-3 ${item.bgColor} ${item.color}  
                  transition duration-300 group-hover:scale-110`}
                >
                  {item.icon}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  {item.description}
                </p>
                <ArrowUpRight
                  size={17}
                  className="text-gray-300 transition group-hover:text-blue-600"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                Priority Distribution
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Companies based on priority
              </p>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <h3 className="text-3xl font-bold text-gray-900">
              {totalCompanies}
            </h3>
            <span className="text-sm text-gray-500">
              Total companies
            </span>
          </div>

          <div className="space-y-5">
            {priorityData.map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    {item.name}
                  </span>
                  <span className="text-gray-500">
                    {item.count} ({Math.round(item.count / totalCompanies * 100)}%)
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                    style={{
                      width: `${(item.count / totalCompanies) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                Application Overview
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Your current application status
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-3xl font-bold text-gray-900">
              28
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Total applications
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-emerald-50 p-4">
              <CheckCircle2 className="mb-3 text-emerald-600" size={23} />
              <h3 className="text-2xl font-bold text-emerald-700">
                18
              </h3>
              <p className="mt-1 text-xs text-emerald-700">
                Applications Open
              </p>
            </div>

            <div className="rounded-lg bg-red-100 p-4">
              <XCircle className="mb-3 text-gray-600" size={23} />
              <h3 className="text-2xl font-bold text-gray-800">
                10
              </h3>
              <p className="mt-1 text-xs text-gray-600">
                Applications Closed
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/applications")}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg 
            border border-gray-200 py-2.5 text-sm font-medium text-gray-700 
            transition hover:bg-gray-50"
          >
            View Applications
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>


    </div>
  );
};

export default Home;
