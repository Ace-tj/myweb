/**
 * Central registry of themed images for every demo + the marketing site.
 *
 * Source: LoremFlickr (Creative-Commons photos from Flickr, served via CDN).
 * Each URL uses `?lock=<n>` so the photo is deterministic — same lock = same
 * photo on every request, every visit, every locale.
 *
 * Usage:
 *   import { demoImages } from "@/lib/demo-images";
 *   <img src={demoImages.shop.thumb} alt="" />
 *
 * If LoremFlickr is ever slow on first load, the consumer should keep its
 * background gradient visible so the layout doesn't pop.
 */

function img(tags: string, lock: number, w = 800, h = 600): string {
  return `https://loremflickr.com/${w}/${h}/${encodeURIComponent(tags)}?lock=${lock}`;
}

export const demoImages = {
  "shopping": {
    thumb: img("fashion,boutique,product", 11, 1200, 750),
    hero: img("fashion,store,product", 12, 1600, 900),
    products: [
      img("jacket,fashion", 101, 600, 750),
      img("sneakers,fashion", 102, 600, 750),
      img("sunglasses,fashion", 103, 600, 750),
      img("watch,product", 104, 600, 750),
      img("bag,fashion", 105, 600, 750),
      img("dress,fashion", 106, 600, 750),
      img("perfume,product", 107, 600, 750),
      img("scarf,fashion", 108, 600, 750),
    ],
  },
  "restaurant": {
    thumb: img("restaurant,fine-dining,plating", 21, 1200, 750),
    hero: img("restaurant,interior,warm", 22, 1600, 900),
    dishes: [
      img("pasta,plating", 201, 600, 600),
      img("steak,plating", 202, 600, 600),
      img("ramen,bowl", 203, 600, 600),
      img("salad,plating", 204, 600, 600),
      img("burger,gourmet", 205, 600, 600),
      img("dessert,plating", 206, 600, 600),
      img("seafood,plating", 207, 600, 600),
      img("pizza,gourmet", 208, 600, 600),
    ],
  },
  "gym": {
    thumb: img("gym,fitness,training", 31, 1200, 750),
    hero: img("gym,equipment,industrial", 32, 1600, 900),
    photos: [
      img("dumbbells,gym", 301, 800, 600),
      img("barbell,squat", 302, 800, 600),
      img("yoga,studio", 303, 800, 600),
      img("treadmill,cardio", 304, 800, 600),
      img("kettlebell,training", 305, 800, 600),
      img("boxing,training", 306, 800, 600),
    ],
  },
  "university": {
    thumb: img("university,campus,architecture", 41, 1200, 750),
    hero: img("university,library,architecture", 42, 1600, 900),
    photos: [
      img("library,books", 401, 800, 600),
      img("lecture-hall", 402, 800, 600),
      img("campus,courtyard", 403, 800, 600),
      img("laboratory,science", 404, 800, 600),
    ],
  },
  "china-agency": {
    thumb: img("china,university,architecture", 51, 1200, 750),
    hero: img("beijing,university,gate", 52, 1600, 900),
    photos: [
      img("tsinghua,beijing", 501, 800, 600),
      img("shanghai,skyline", 502, 800, 600),
      img("xian,architecture", 503, 800, 600),
      img("china,campus", 504, 800, 600),
    ],
  },
  "school": {
    thumb: img("school,classroom,students", 61, 1200, 750),
    hero: img("school,playground,colorful", 62, 1600, 900),
    photos: [
      img("classroom,desk", 601, 800, 600),
      img("school,chalkboard", 602, 800, 600),
      img("library,kids", 603, 800, 600),
      img("schoolbus", 604, 800, 600),
    ],
  },
  "hospital": {
    thumb: img("hospital,corridor,modern", 71, 1200, 750),
    hero: img("hospital,architecture,exterior", 72, 1600, 900),
    photos: [
      img("hospital,reception", 701, 800, 600),
      img("laboratory,microscope", 702, 800, 600),
      img("pharmacy,shelf", 703, 800, 600),
      img("medical,stethoscope", 704, 800, 600),
    ],
  },
  "travel-agency": {
    thumb: img("travel,landscape,passport", 81, 1200, 750),
    hero: img("mountains,landscape,scenic", 82, 1600, 900),
    destinations: [
      img("pamir,mountains", 801, 800, 600),
      img("samarkand,architecture", 802, 800, 600),
      img("iskanderkul,lake", 803, 800, 600),
      img("wakhan,valley", 804, 800, 600),
      img("istanbul,bosphorus", 805, 800, 600),
      img("dubai,skyline", 806, 800, 600),
      img("bali,beach", 807, 800, 600),
      img("paris,eiffel", 808, 800, 600),
    ],
  },
  "beauty-salon": {
    thumb: img("salon,beauty,interior", 91, 1200, 750),
    hero: img("salon,styling,chair", 92, 1600, 900),
    services: [
      img("haircut,salon", 901, 800, 600),
      img("manicure,nails", 902, 800, 600),
      img("makeup,beauty", 903, 800, 600),
      img("facial,spa", 904, 800, 600),
      img("massage,spa", 905, 800, 600),
      img("hair-coloring,salon", 906, 800, 600),
    ],
  },
  "accounting": {
    thumb: img("office,desk,chart,minimal", 111, 1200, 750),
    hero: img("office,workspace,minimal", 112, 1600, 900),
    photos: [
      img("calculator,paperwork", 1101, 800, 600),
      img("office,laptop", 1102, 800, 600),
    ],
  },
} as const;

export type DemoSlug = keyof typeof demoImages;

/** Thumbnail URL keyed by demo slug — for the home page and card components. */
export function demoThumb(slug: string): string | undefined {
  return (demoImages as Record<string, { thumb: string }>)[slug]?.thumb;
}
