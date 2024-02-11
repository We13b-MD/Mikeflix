import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../Cssfiles/Singlemovie.css";

function Singlemovie() {
  const [data, setData] = useState([]);
  const urlSlug = useParams();

  const baseUrl = `https://movie-server-e3b57795d19a.herokuapp.com/api/movies/${urlSlug.slug}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [baseUrl, urlSlug]);

  const numberofStarsFromDb = Number(data?.stars);

  function StarRating({ numberOfStars }) {
    console.log("Number of stars received", numberOfStars);
    if (!numberOfStars || numberOfStars <= 0) {
      return <div> No rating available</div>;
    }
    const starIcons = "⭐".repeat(numberOfStars);

    return <div className="RATING"> Rating: {starIcons}</div>;
  }
  return (
    <>
      <div className="movieDetials">
        <div className="col-1">
          <Link className="linkMovie" to="/movies">
            Back
          </Link>
          <img
            className="image"
            src={`https://movie-server-e3b57795d19a.herokuapp.com/movieuploads/${data?.thumbnail}`}
            alt={data?.title}
          />
        </div>

        <div className="col-2"></div>
        <h1>{data?.title}</h1>
        <p className="description">{data?.description}</p>
        <StarRating numberOfStars={numberofStarsFromDb} />
        <ul>
          <p className="category">Category</p>

          {Array.isArray(data?.category) && data?.category.length > 0 ? (
            data?.category.map((item, index) => (
              <li className="categoryItem" key={index}>
                <p>{item}</p>
              </li>
            ))
          ) : (
            <li>No categories found</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Singlemovie;
