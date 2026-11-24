export let products = [
  {
    id: 1,
    name: "Официальный лайтстик MEOVV",
    price: 6500,
    category: "electronics",
    stock: 15,
    description: "выполнен в чёрно-белых цветах; верхняя часть напоминает голову кошки с ушками, а на рукоятке есть след кошачьей лапки. Также предусмотрен съёмный кошачий хвост на магните и разные цвета подсветки.",
    imageUrl: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "IDLE Album We Made",
    price: 2400,
    category: "other",
    stock: 40,
    description: "9 корейский мини-альбом, это яркий летний релиз из 5 динамичных танцевальных треков с заглавным хитом «Gimme Dat Love», представленный в стильных коллекционных версиях (Mono, Crow, C и Poca Album) с фотобуками и карточками.",
    imageUrl: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "BLACKPINK Born Pink Tour Hoodie",
    price: 7200,
    category: "clothing",
    stock: 8,
    description: "Оверсайз худи из плотного хлопка с принтом мирового тура.",
    imageUrl: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "BLACKPINK Limited Edition Oreo Cookies",
    price: 450,
    category: "food",
    stock: 100,
    description: "Лимитированное розовое печенье с кремом и коллекционной карточкой.",
    imageUrl: null,
    createdAt: new Date().toISOString()
  }
];

export const getNextId = () => {
  return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
};
