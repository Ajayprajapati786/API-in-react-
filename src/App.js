import React, {useEffect, useState,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const[isLoading,setIsLoading] = useState(false)
  const[error,setError] = useState(null)

  

  const  fetchMoviesHandler= useCallback(async()=>{
      setIsLoading(true);
      setError(null);
      
      try{
        const response = await fetch('https://swapi.dev/api/films');
       
        if(!response.ok){
          throw new Error('Something went wrong ....Retrying')
        }
        const data = await response.json();
       
        const transformedMovies = data.results.map(movieData =>{
          return {
            id:movieData.episode_id,
            title:movieData.title,
            openingText:movieData.opening_crawl,
            releaseDate:movieData.release_data
          }
        })
        setMovies(transformedMovies);
        // setIsLoading(false);
      }

      catch(error){
        setError(error.message);
        // setIsLoading(false);

      }

      setIsLoading(false);
      
   
  },[])

  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  const cancelRetrying =()=>{
    setError(null);
  }
  let content = <p>Found no movies</p>

  if(movies.length >0){
    content = <MoviesList movies = {movies}/>
  }

  if(error){

    content =(<><p>{error}</p> <button onClick={cancelRetrying}>Cancel retrying</button></>)
  }

  if(isLoading){
    content = <p>Loading</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length >0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
       {!isLoading && error && <p>{error}</p>}
       {isLoading && <p>Loading...</p>} */}

       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
