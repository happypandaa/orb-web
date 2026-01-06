import { SectionRenderer } from "@/components/sections/SectionRenderer";
import homeData from "@/content/home.json";
import type { PageData } from "@/types/content";

export default function Home() {
  // 类型断言，确保 JSON 数据符合类型定义
  const pageData = homeData as PageData;
  
  return <SectionRenderer sections={pageData.sections} />;
}
