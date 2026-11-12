import { IoSearch } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { PiNewspaperClipping } from "react-icons/pi";
import { PiLightningDuotone } from "react-icons/pi";
import { FaShieldHalved } from "react-icons/fa6";

export const cards = [
    {
      "title": "Track Companies",
      "description": "Keep all your target companies in one organized space.",
      "icon": <IoSearch size={28}/>,
      "icon_bg" : "bg-blue-50",
      "icon_text" : "text-blue-400",
    },
    {
      "title": "Set Priorities",
      "description": "Focus on what matters with Low, Medium, and High priority.",
      "icon": <FaRegStar size={28}/>,
      "icon_bg" : "bg-green-50",
      "icon_text" : "text-green-400"
    },
    {
      "title": "Add Notes",
      "description": "Remember important details, requirements, and next steps.",
      "icon": <PiNewspaperClipping size={28}/>,
      "icon_bg" : "bg-violet-50",
      "icon_text" : "text-violet-400"
    },
    {
      "title": "Quick Access",
      "description": "Open company career pages directly with a single click.",
      "icon": <PiLightningDuotone size={28}/>,
      "icon_bg" : "bg-orange-50",
      "icon_text" : "text-orange-400"
    },
    {
      "title": "Stay Organized",
      "description": "Separate lists for a cleaner, more focused job search.",
      "icon": <FaShieldHalved size={28}/>,
      "icon_bg" : "bg-green-50",
      "icon_text" : "text-green-400"
    }
  ]
