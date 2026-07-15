export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  sort_order: number;
  is_published: boolean;
  created_at?: string;
}

export type GalleryPhotoPublic = Pick<
  GalleryPhoto,
  "id" | "src" | "alt" | "caption"
>;
