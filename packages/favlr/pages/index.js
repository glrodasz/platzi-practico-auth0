import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import Tabs from "@/components/Tabs";
import useMovies from "@/hooks/useMovies";

export const getServerSideProps = withPageAuthRequired();

export default function Home() {
  const { movies } = useMovies();
  const thrillerMovies = movies.filter((movie) => movie.genre === "Thriller");
  const horrorMovies = movies.filter((movie) => movie.genre === "Horror");

  return (
    <main className="max-w-screen-md mx-auto">
      <Tabs thrillerMovies={thrillerMovies} horrorMovies={horrorMovies} />
    </main>
  );
}
