export type DevelopmentStatus = "Pronto para morar" | "Em construção";

export interface DevelopmentAsset {
  title: string;
  url: string;
}

export interface DevelopmentDocument extends DevelopmentAsset {
  fileType?: string;
}

export interface DevelopmentContent {
  id: string;
  slug: string;
  name: string;
  projectName: string;
  formLabel: string;
  city: string;
  neighborhood: string;
  status: DevelopmentStatus;
  logoImage?: string;
  discountLabel: string;
  originalPrice?: number;
  discountedPrice?: number;
  typology?: string;
  area?: string;
  highlights: string[];
  cta: string;
  isActive: boolean;
  displayOrder: number;
  coverImage?: string;
  description?: string;
  builder?: string;
  deliveryDate?: string;
  registration?: string;
  bedrooms?: string;
  suites?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  locationDescription?: string;
  apartmentFeatures: string[];
  condoFeatures: string[];
  galleryImages: DevelopmentAsset[];
  floorPlans: DevelopmentAsset[];
  documents: DevelopmentDocument[];
}
