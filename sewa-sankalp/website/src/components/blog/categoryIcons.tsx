import type { ComponentType } from "react";
import {
  FaBookOpen,
  FaHandsHelping,
  FaHeartbeat,
  FaLeaf,
  FaUsers,
} from "react-icons/fa";
import { HiSquares2X2 } from "react-icons/hi2";
import { MdOutlineCalendarMonth } from "react-icons/md";
import type { BlogCategoryId } from "@/lib/content/blogPosts";

/** Same react-icons set as gallery / reference mock */
export const BLOG_CATEGORY_ICONS: Record<
  BlogCategoryId,
  ComponentType<{ className?: string }>
> = {
  all: HiSquares2X2,
  education: FaBookOpen,
  health: FaHeartbeat,
  environment: FaLeaf,
  women: FaUsers,
  community: FaHandsHelping,
  events: MdOutlineCalendarMonth,
};
