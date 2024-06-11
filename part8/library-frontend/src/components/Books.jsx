import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react";


const Books = ({ show }) => {
  const { data, loading, error } = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState('all genres');

  if (!show) { return null }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const books = data.allBooks || [];

  const genres = books ? books.flatMap(book => book.genres) : []
  const uniqueGenres = [...new Set(genres)]

  const filteredBooks = selectedGenre === 'all genres'
  ? books
  : books.filter(book => book.genres.includes(selectedGenre));

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{selectedGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
      {uniqueGenres.map(genre => <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>)}<button onClick={() => setSelectedGenre('all genres')}>all genres</button>
    </div>
  )
}

export default Books
