export interface ClientLogo {
  id: string;
  name: string;
  src: string;
  sort_order: number;
  is_published: boolean;
  created_at?: string;
}

export type ClientLogoPublic = Pick<ClientLogo, "id" | "name" | "src">;
