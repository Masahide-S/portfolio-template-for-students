import { IconType } from 'react-icons';
import {
  FaCode,
  FaLightbulb,
  FaVuejs,
  FaAws,
  FaGoogle,
  FaLine,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaPython,
  FaDatabase,
  FaPhp,
  FaMapMarkedAlt,
  FaGraduationCap,
  FaBuilding,
  FaTrophy,
  FaFlask,
  FaUsers,
  FaBrain,
  FaPalette,
  FaBook,
  FaCertificate
} from 'react-icons/fa';
import { FaGolang } from "react-icons/fa6";
import {
  SiNextdotjs,
  SiFirebase,
  SiVercel,
  SiTypescript,
  SiTailwindcss
} from "react-icons/si";
import { RiDatabaseLine, RiPresentationLine } from "react-icons/ri";

/**
 * アイコン名から対応するReactIconsコンポーネントを取得するマップ
 * 全コンポーネントで共通利用
 */
export const iconMap: Record<string, IconType> = {
  FaCode,
  FaLightbulb,
  FaVuejs,
  FaAws,
  FaGoogle,
  FaLine,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaPython,
  FaDatabase,
  FaPhp,
  FaMapMarkedAlt,
  FaGraduationCap,
  FaBuilding,
  FaTrophy,
  FaFlask,
  FaUsers,
  FaBrain,
  FaPalette,
  FaBook,
  FaCertificate,
  FaGolang,
  SiNextdotjs,
  SiFirebase,
  SiVercel,
  SiTypescript,
  SiTailwindcss,
  RiDatabaseLine,
  RiPresentationLine,
};

/**
 * アイコン名から対応するIconコンポーネントを取得する
 * @param iconName - アイコン名
 * @returns IconTypeコンポーネント、見つからない場合はundefined
 */
export function getIcon(iconName: string): IconType | undefined {
  return iconMap[iconName];
}
