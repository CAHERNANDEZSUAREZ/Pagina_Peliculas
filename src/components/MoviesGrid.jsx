import { MovieCard } from "./MovieCard";
import styles from "./MovieGrid.module.css";
import { useEffect, useState } from "react";
import { get } from "../utils/httpClient";
import { Spinner } from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Empty } from "./Empty";



export function MoviesGrid({search}) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const [page, setPage] = useState(1);
const [hasMore, sethasMore] = useState(true)

  

  useEffect(() => {
    setIsLoading(true);
    const searchUrl = search
    ?"/search/movie?query=" + search + "&page=" + page
    :"/discover/movie?page=" + page;
    get(searchUrl).then((data) => {
      setMovies((prevMovies) => prevMovies.concat(data.results));
      sethasMore(data.page<data.total_pages);
      setIsLoading(false);
    });
  }, [search,page]);

if(!isLoading && movies.length===0){
  return <Empty/>
}
  return (
    <InfiniteScroll 
    dataLength={movies.length} 
    hasMore={hasMore} 
    next={()=>setPage((prevPage)=>prevPage+1)}
    loader={<Spinner/>}
    > 
    <ul className={styles.movieGrid}>
      {movies.map((movie) => (
        <MovieCard key={movie.title} movie={movie} clas />
      ))}
    </ul>
    </InfiniteScroll>
  );
}
