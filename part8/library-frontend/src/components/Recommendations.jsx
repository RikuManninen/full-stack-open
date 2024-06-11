import { useQuery } from "@apollo/client";
import { ALL_BOOKS, FAVORITE_GENRE } from "../queries";

const Recommendations = ({ show }) => {
  const { data: booksData, loading: booksLoading, error: booksError } = useQuery(ALL_BOOKS);
  const { data: genreData, loading: genreLoading, error: genreError } = useQuery(FAVORITE_GENRE);

  if (!show) return null;

  if (booksLoading || genreLoading) return <p>Loading...</p>;
  if (booksError) return <p>Error: {booksError.message}</p>;
  if (genreError) return <p>Error: {genreError.message}</p>;

  const books = booksData ? booksData.allBooks : [];
  const favoriteGenre = genreData ? genreData.me.favoriteGenre : "";

  const filteredBooks = books.filter(book => book.genres.includes(favoriteGenre));

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
