import { useState } from "react";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="mx-auto max-w-2xl space-y-3">
      {items.map((item, index) => (
        <div key={item.title} className="rounded-lg p-4 bg-gray-200">
          <button
            type="button"
            className="flex w-full items-center justify-between text-left font-medium"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            {item.title}
            <span>{openIndex === index ? "−" : "+"}</span>
          </button>

          {openIndex === index && (
            <p className="mt-3 text-sm text-gray-600">
              {item.content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}