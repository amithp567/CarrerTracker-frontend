import { useNavigate } from 'react-router-dom'
import { IoArrowForward, IoCheckmarkCircleOutline } from "react-icons/io5";


import {items} from '../data/landing_accordion.tsx'
import {cards} from '../data/landing_cards.tsx'
import Accordion from '../components/Accordion.tsx'
import FeatureCard from '../components/LandingCard.tsx';

const Landing = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1D1D1F]">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-lg">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => navigate("/")}
          >
            <img
              src="/logo.png"
              alt="CareerTracker logo"
              className="h-10 w-10 object-contain"
            />
            <p className="text-xl font-extrabold tracking-tight sm:text-2xl">
              Career<span className="text-[#0071E3]">Tracker</span>
            </p>
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <a
              href="#features"
              className="hidden text-sm font-medium text-gray-600 transition hover:text-[#0071E3] sm:block"
            >
              Features
            </a>

            <a
              href="#faq"
              className="hidden text-sm font-medium text-gray-600 transition hover:text-[#0071E3] sm:block"
            >
              FAQ
            </a>

            <button
              onClick={() => navigate("/login")}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold 
              transition hover:border-[#0071E3] hover:text-[#0071E3] sm:px-6"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/login")}
              className="hidden rounded-xl bg-[#0071E3] px-5 py-2.5 text-sm font-semibold 
              text-white shadow-sm transition hover:bg-blue-700 sm:block"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28">

          <div className="pointer-events-none absolute left-1/2 top-10 -z-0 h-72 w-72 -translate-x-1/2 
            rounded-full bg-blue-200/30 blur-3xl" 
          />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 
                bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
            >
              <IoCheckmarkCircleOutline size={18} />
              Your next opportunity starts here
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Your Job Search,
              <span className="mt-2 block text-[#0071E3]">
                All in One Place.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">
              Stay organized, stay focused, and take the next step toward
              your dream career.
            </p>

            <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0071E3] px-7 py-3.5 
                font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Get Started
                <IoArrowForward size={19} />
              </button>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 
                bg-white px-7 py-3.5 font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                Explore Features
              </a>
            </div>

            <p className="mt-5 text-xs text-gray-400">
              A simpler way to organize your career journey.
            </p>
          </div>


          <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-blue-100/60 blur-2xl" />

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-slate-200/70">
              <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <div className="ml-3 flex-1 rounded-lg border border-gray-100 bg-white px-4 
                    py-1.5 text-left text-xs text-gray-400"
                >
                  careertracker.app/dashboard
                </div>
              </div>

              <div className="grid min-h-72 grid-cols-1 sm:grid-cols-[180px_1fr]">

                <aside className="hidden border-r border-gray-100 bg-gray-50/70 p-5 sm:block">
                  <p className="mb-6 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Workspace
                  </p>

                  <div className="mb-2 rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-700">
                    Dashboard
                  </div>
                  <div className="rounded-lg px-3 py-2.5 text-sm text-gray-500">
                    My Companies
                  </div>
                  <div className="rounded-lg px-3 py-2.5 text-sm text-gray-500">
                    Priority List
                  </div>
                  <div className="rounded-lg px-3 py-2.5 text-sm text-gray-500">
                    My Notes
                  </div>
                </aside>

                {/* Preview content */}
                <div className="min-w-0 p-5 sm:p-7">
                  <p className="text-sm text-gray-400">Your workspace</p>
                  <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                    Job Search Dashboard
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Keep your opportunities organized and within reach.
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { label: "Companies", value: "12" },
                      { label: "High Priority", value: "04" },
                      { label: "Lists", value: "03" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-gray-100 bg-white p-3 sm:p-4"
                      >
                        <p className="text-xs text-gray-500 sm:text-sm">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 overflow-hidden rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                      <p className="text-sm font-semibold">
                        Tracked Companies
                      </p>
                      <span className="text-xs text-blue-600">Preview</span>
                    </div>

                    {[
                      {
                        name: "Google",
                        priority: "High",
                        color: "bg-red-50 text-red-600",
                      },
                      {
                        name: "Microsoft",
                        priority: "Medium",
                        color: "bg-amber-50 text-amber-700",
                      },
                      {
                        name: "Infosys",
                        priority: "Low",
                        color: "bg-green-50 text-green-700",
                      },
                    ].map((company) => (
                      <div
                        key={company.name}
                        className="flex items-center justify-between gap-3 border-b border-gray-50 
                        px-4 py-3 last:border-0"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg 
                            bg-blue-50 text-sm font-bold text-blue-700"
                          >
                            {company.name.charAt(0)}
                          </div>
                          <span className="truncate text-sm font-medium">
                            {company.name}
                          </span>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${company.color}`}
                        >
                          {company.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-gray-400">
              Sample dashboard preview · Illustrative data
            </p>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="scroll-mt-24 border-t border-gray-100 bg-white px-5 py-20 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0071E3]">
                Simple. Focused. Organized.
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything You Need for Your Job Search
              </h2>

              <p className="mt-4 leading-7 text-gray-500">
                Spend less time managing information and more time
                focusing on your next career opportunity.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <FeatureCard
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  iconBg={card.icon_bg}
                  iconColor={card.icon_text}
                  icon={card.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#0B1F3A] px-6 
            py-14 text-center text-white sm:px-12 sm:py-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready for your next opportunity?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-blue-100/80">
              Start organizing your job search and make every opportunity count.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 
              py-3.5 font-semibold text-[#0B1F3A] transition hover:bg-blue-50"
            >
              Start Your Journey
              <IoArrowForward size={18} />
            </button>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="scroll-mt-24 border-t border-gray-100 bg-white px-5 py-20 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0071E3]">
                Got Questions?
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-gray-500">
                Everything you need to know to get started.
              </p>
            </div>

            <Accordion items={items} />
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt=""
              className="h-7 w-7 object-contain"
            />
            <span className="font-bold">
              Career<span className="text-[#0071E3]">Tracker</span>
            </span>
          </div>

          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} CareerTracker. All rights reserved.
          </p>

          <a
            href="#faq"
            className="text-sm text-gray-500 transition hover:text-[#0071E3]"
          >
            Help & FAQ
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Landing