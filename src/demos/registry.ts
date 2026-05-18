import type { ComponentType } from "react";
import { ShopDemo } from "./shop/Demo";
import { RestaurantDemo } from "./restaurant/Demo";
import { GymDemo } from "./gym/Demo";
import { AccountingDemo } from "./accounting/Demo";
import { ChinaAgencyDemo } from "./china-agency/Demo";
import { UniversityDemo } from "./university/Demo";
import { SchoolDemo } from "./school/Demo";
import { HospitalDemo } from "./hospital/Demo";
import { TravelAgencyDemo } from "./travel-agency/Demo";
import { BeautySalonDemo } from "./beauty-salon/Demo";

export const DemoRegistry: Record<string, ComponentType> = {
  shopping: ShopDemo,
  restaurant: RestaurantDemo,
  gym: GymDemo,
  accounting: AccountingDemo,
  "china-agency": ChinaAgencyDemo,
  university: UniversityDemo,
  school: SchoolDemo,
  hospital: HospitalDemo,
  "travel-agency": TravelAgencyDemo,
  "beauty-salon": BeautySalonDemo,
};
