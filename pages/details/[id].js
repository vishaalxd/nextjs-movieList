import { useRouter } from "next/router";
import Head from "next/head";
import detailsStyle from "./details.module.css";

const detailPage = ({ details }) => {
  const router = useRouter();
  const { id } = router.query;
  const options = { year: "numeric", month: "short", day: "numeric" };
  const {
    name,
    type,
    language,
    genres,
    status,
    summary,
    averageRuntime,
    premiered,
    schedule,
    image,
    network,
    rating,
  } = details;
  return (
    <div>
       <Head>
        <title>Catalogue</title>
        <meta name="viewport" content={`${name},${language},${network?.country?.name}`} />
      </Head>
      <h1>{name}</h1>
      <div className={detailsStyle.flexCompose}>
        <div>
          <img src={image?.original} />
        </div>
        <div className={detailsStyle.container}>
          <h3>{summary}</h3>
          <br />
          <div className={detailsStyle.blockDetails}>
            <div>
              <label>Type:&nbsp;</label>
              <span>{type}</span>
            </div>
            <div>
              <label>Language: &nbsp;</label>
              <span>{language}</span>
            </div>
          </div>
          <div className={detailsStyle.blockDetails}>
            <div>
              <label>Genre: &nbsp;</label>
              <>{genres}</>
            </div>
            <div>
              <label>Status:&nbsp;</label>
              {status}
            </div>
          </div>
          <div>
            <div className={detailsStyle.blockDetails}>
              <div>
                <label>Country: &nbsp;</label>
                <span>{network?.country?.name} &nbsp; </span>
              </div>
              <div>
                <label>Timezone: </label>&nbsp;{network?.country?.timezone}
              </div>
            </div>
          </div>

          <div>
            <div className={detailsStyle.blockDetails}>
              <div>
                <label>Rating: &nbsp;</label>
                <span>{rating?.average} &nbsp; </span>
              </div>
              <div>
                <label>Avg Runtime: </label>&nbsp;{averageRuntime}
              </div>
            </div>
          </div>

          {premiered && (
            <label>
              <i>
                Premiered on{" "}
                <span>
                  {new Date(premiered).toLocaleDateString("en-US", options)}
                </span>
              </i>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if(parseInt(context.params.id)){

    const res = await fetch(`https://api.tvmaze.com/shows/${context.params.id}`);
 
  const data = await res.json();
  return {
    props: {
      details: data,
    },
  };
  
}else {
  throw new AppError();
}
}

class AppError {
 statusCode;

  constructor(statusCode = 404) {
    this.statusCode = statusCode;
  }
}


export default detailPage;
