interface ILinks {
  id: number;
  title: string;
  href: string;
}

const LINKS: ILinks[] = [
  {
    id: 0,
    title: 'Catalogue',
    href: '/products',
  },
  {
    id: 1,
    title: 'Categories',
    href: '/categories',
  },
];

export default LINKS;
