import type { Book, Category } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id) || PlaceHolderImages[0];

export const getBooksBySubject = async (subject: string, limit = 10): Promise<Book[]> => {
  try {
    const response = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=${limit}`);
    if (!response.ok) {
      console.error('Failed to fetch books for subject:', subject);
      return [];
    }
    const data = await response.json();

    const books: Book[] = data.works.map((work: any, index: number) => {
      const isbn = work.isbn_13?.[0] || work.isbn_10?.[0] || `OLID:${work.cover_edition_key}`;
      const coverId = work.cover_id;
      const coverImage = coverId
        ? {
            id: `cover-${work.key}`,
            imageUrl: `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`,
            description: `Cover of ${work.title}`,
            imageHint: 'book cover'
          }
        : getImage(`book-cover-${(index % 12) + 1}`);

      return {
        id: work.key.replace('/works/', ''),
        title: work.title,
        author: work.authors?.[0]?.name || 'Unknown Author',
        price: parseFloat((Math.random() * (20 - 10) + 10).toFixed(2)), // Placeholder price
        coverImage,
        categories: work.subject || [],
        description: typeof work.description === 'string' ? work.description : 'No description available.',
        rating: work.average_rating ? parseFloat(work.average_rating.toFixed(1)) : parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
        pageCount: work.edition_count, // Not always accurate page count
        publishedDate: work.first_publish_year?.toString() || 'N/A',
        isbn: isbn,
      };
    }).filter((book: Book) => book.coverImage.imageUrl.includes('covers.openlibrary.org')); // Only include books with covers

    return books;
  } catch (error) {
    console.error('Error fetching books from Open Library:', error);
    return [];
  }
};

export const books: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 13.99,
    coverImage: getImage('book-cover-1'),
    categories: ['Fiction', 'Fantasy'],
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?',
    rating: 4.5,
    pageCount: 304,
    publishedDate: '2020-08-13',
    isbn: '978-0-7352-1129-2',
  },
  {
    id: '2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    price: 15.99,
    coverImage: getImage('book-cover-9'),
    categories: ['Science Fiction'],
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn’t know that. He can’t even remember his own name, let alone the nature of his assignment or how to complete it.',
    rating: 4.8,
    pageCount: 496,
    publishedDate: '2021-05-04',
    isbn: '978-0-593-13520-4',
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 16.50,
    coverImage: getImage('book-cover-4'),
    categories: ['Non-Fiction', 'Self-Help'],
    description: 'An easy and proven way to build good habits and break bad ones. James Clear, an expert on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    rating: 4.9,
    pageCount: 320,
    publishedDate: '2018-10-16',
    isbn: '978-0-7352-1129-2',
  },
  {
    id: '4',
    title: 'The Vanishing Half',
    author: 'Brit Bennett',
    price: 14.25,
    coverImage: getImage('book-cover-2'),
    categories: ['Fiction', 'Historical Fiction'],
    description: 'The Vignes twin sisters will always be identical. But after growing up together in a small, southern black community and running away at age sixteen, it\'s not just the shape of their daily lives that is different as adults, it\'s everything: their families, their communities, their racial identities.',
    rating: 4.6,
    pageCount: 352,
    publishedDate: '2020-06-02',
    isbn: '978-0-525-53629-1',
  },
  {
    id: '5',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    price: 18.00,
    coverImage: getImage('book-cover-3'),
    categories: ['Non-Fiction', 'History'],
    description: 'Professor Yuval Noah Harari\'s book Sapiens: A Brief History of Humankind has become an international phenomenon. It has been translated into over 60 languages and has sold over 15 million copies. It is a groundbreaking book that tells the story of our species from a scientific perspective.',
    rating: 4.7,
    pageCount: 464,
    publishedDate: '2015-02-10',
    isbn: '978-0-06-231609-7',
  },
  {
    id: '6',
    title: 'Circe',
    author: 'Madeline Miller',
    price: 12.99,
    coverImage: getImage('book-cover-5'),
    categories: ['Fiction', 'Fantasy', 'Mythology'],
    description: 'In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child—not powerful, like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power—the power of witchcraft, which can transform rivals into monsters and menace the gods themselves.',
    rating: 4.7,
    pageCount: 393,
    publishedDate: '2018-04-10',
    isbn: '978-1-4087-1014-4',
  },
  {
    id: '7',
    title: 'Educated: A Memoir',
    author: 'Tara Westover',
    price: 15.00,
    coverImage: getImage('book-cover-6'),
    categories: ['Non-Fiction', 'Memoir'],
    description: 'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
    rating: 4.8,
    pageCount: 352,
    publishedDate: '2018-02-20',
    isbn: '978-0-399-59050-4',
  },
  {
    id: '8',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    price: 11.80,
    coverImage: getImage('book-cover-8'),
    categories: ['Fiction', 'Mystery'],
    description: 'For years, rumors of the “Marsh Girl” have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl.',
    rating: 4.6,
    pageCount: 384,
    publishedDate: '2018-08-14',
    isbn: '978-0-7352-1909-0',
  },
  {
    id: '9',
    title: 'Dune',
    author: 'Frank Herbert',
    price: 10.99,
    coverImage: getImage('book-cover-9'),
    categories: ['Science Fiction'],
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the “spice” melange, a drug capable of extending life and enhancing consciousness.',
    rating: 4.8,
    pageCount: 412,
    publishedDate: '1965-08-01',
    isbn: '978-0-441-01359-3',
  },
  {
    id: '10',
    title: 'The Four Winds',
    author: 'Kristin Hannah',
    price: 17.99,
    coverImage: getImage('book-cover-7'),
    categories: ['Fiction', 'Historical Fiction'],
    description: 'The Four Winds is a rich, sweeping novel that stunningly brings to life the Great Depression and the people who lived through it—the harsh realities that divided us as a nation and the enduring battle between the haves and the have-nots.',
    rating: 4.5,
    pageCount: 464,
    publishedDate: '2021-02-02',
    isbn: '978-0-312-58133-3',
  },
  {
    id: '11',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    price: 12.00,
    coverImage: getImage('book-cover-11'),
    categories: ['Non-Fiction', 'Psychology'],
    description: 'Kahneman, a Nobel laureate in economics, explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.',
    rating: 4.7,
    pageCount: 499,
    publishedDate: '2011-10-25',
    isbn: '978-0-374-53355-7',
  },
  {
    id: '12',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    price: 13.50,
    coverImage: getImage('book-cover-12'),
    categories: ['Fiction', 'Thriller'],
    description: 'Alicia Berenson’s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London’s most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.',
    rating: 4.4,
    pageCount: 336,
    publishedDate: '2019-02-05',
    isbn: '978-1-250-30169-7',
  },
];


export const categories: Category[] = [
    { id: 'fiction', name: 'Fiction', image: getImage('category-fiction') },
    { id: 'non-fiction', name: 'Non-Fiction', image: getImage('category-non-fiction') },
    { id: 'science_fiction', name: 'Science Fiction', image: getImage('category-science') },
    { id: 'fantasy', name: 'Fantasy', image: getImage('category-fiction') },
    { id: 'business', name: 'Business', image: getImage('category-business') },
    { id: 'history', name: 'History', image: getImage('category-non-fiction') },
    { id: 'love', name: 'Romance', image: getImage('book-cover-12')},
    { id: 'mystery', name: 'Mystery', image: getImage('book-cover-11')},
    { id: 'thriller', name: 'Thriller', image: getImage('book-cover-12')}
  ];
