import { MOVIES } from "@/lib/data/desktop";

export function MovieGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`mov-grid ${className}`}>
      {MOVIES.map((movie) => (
        <div className="mov" key={movie.title}>
          <img src={movie.img} alt="" />
          <span className="cap">{movie.title}</span>
          <div className="hover">
            <div className="hov-top">
              <span>{movie.genre}</span>
              <span>{movie.year}</span>
            </div>
            {movie.gem ? <span className="gem">{movie.gem}</span> : null}
            <strong>{movie.title}</strong>
            {movie.quote ? <em>{movie.quote}</em> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
