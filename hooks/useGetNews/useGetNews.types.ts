export interface UseGetNewsProps {}
export interface Tag {
  id: number;
  name: string;
  slug: string;
}
export interface News {
  id: number;
  title: string;
  content: string | TrustedHTML;
  slug: string;
  imageRelativeUri: string;
  createdAt: string;
  tags: Tag[];
}
