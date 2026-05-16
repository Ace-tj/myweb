import photosJson from "@/data/photos.json";

export interface PexelsPhoto {
  id: number;
  alt: string;
  src: string;
  thumb: string;
  portrait: string;
  photographer: string;
  photographerUrl: string;
  avgColor: string;
}

type CategoryKey =
  | "office"
  | "shop_products"
  | "restaurant_food"
  | "gym_fitness"
  | "clinic_doctors"
  | "clinic_patients"
  | "school_kids"
  | "university_campus"
  | "personal_contacts"
  | "logistics_trucks"
  | "accounting_business"
  | "avatars"
  | "testimonial_restaurant"
  | "testimonial_school"
  | "testimonial_logistics";

const data = photosJson as { categories: Record<CategoryKey, PexelsPhoto[]> };

export function getPhotos(category: CategoryKey): PexelsPhoto[] {
  return data.categories[category] ?? [];
}

export function getPhoto(category: CategoryKey, index = 0): PexelsPhoto | null {
  const arr = data.categories[category] ?? [];
  if (arr.length === 0) return null;
  return arr[index % arr.length];
}

// Map a string to a deterministic index within `length`
// so the same demo slug always gets the same photo.
export function photoForSlug(category: CategoryKey, slug: string): PexelsPhoto | null {
  const arr = data.categories[category] ?? [];
  if (arr.length === 0) return null;
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  return arr[Math.abs(hash) % arr.length];
}

// Each demo's category maps to a photo pool for the gallery cards / hero.
export const DEMO_PHOTO_CATEGORY: Record<string, CategoryKey> = {
  shop: "shop_products",
  gym: "gym_fitness",
  accounting: "accounting_business",
  "china-uni": "university_campus",
  school: "school_kids",
  university: "university_campus",
  restaurant: "restaurant_food",
  personal: "personal_contacts",
  clinic: "clinic_doctors",
  logistics: "logistics_trucks",
};
