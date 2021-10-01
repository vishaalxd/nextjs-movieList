import Link from "next/link";
import Head from "next/head";
import Styles from "./list.module.css";

function MovieList({ list }) {
  console.log(list);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const handleClick = (path) => {
    if (path === "/details") {
      console.log("I clicked on the About Page");
    }
  };
  return (
    <section className={Styles.body}>
       <Head>
        <title>Catalogue</title>
        <meta name="viewport" content="Avengers, Marvel, Movies" />
      </Head>
      <div className={Styles.flex}>
        {list &&
          list.length &&
          list.map((each) => (
            <div>
              {each.show?.image?.medium ? (
                <Link onClick={() => handleClick("/details")} href="/details/[id]" as={`/details/${each.show?.id}`}>
                  <img
                    className={Styles.imageStyle}
                    src={each.show.image.medium}
                    alt="Album-art"
                  />
                </Link>
              ) : (
                <Link onClick={() => handleClick("/details")} href="/">
                  <div className={Styles.setOffset} />
                </Link>
              )}
              <div className={Styles.maxWidth}>
                <h3>{each.show?.name}</h3>
                <div>
                  <b>{each.show?.language}</b>
                </div>
                <br />
                <div className={Styles.greyFormat}>
                  <div>
                    Genre:{" "}
                    {each.show?.genres.map((ind, idx) => (
                      <span className={Styles.dark}>
                        {ind} {idx !== each.show.genres.length - 1 ? "/" : ""}
                      </span>
                    ))}
                  </div>
                  <div>
                    Runtime:{" "}
                    <span className={Styles.dark}>{each.show?.runtime}</span>
                  </div>
                  <div>Average: {each.ratings?.average}</div>
                  {each.show?.premiered && (
                    <>
                      <i>
                        Premiered on{" "}
                        <span className={Styles.dark}>
                          {new Date(each.show.premiered).toLocaleDateString(
                            "en-US",
                            options
                          )}
                        </span>
                      </i>
                    </>
                  )}
                  <div>Countries: {each.show?.dvdCountry}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=avengers");
  const json = await res.json();
  console.log(json);
  return {
    props: {
      list: json,
    },
  };
}

export default MovieList;
