import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Ftr from "../components/Ftr";
import Card from "../components/Card";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      response = await response.json();

      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ marginBottom: '2rem' }}
      >
        <div className="carousel-inner">
          <div className="carousel-caption" style={{ zIndex: 10 }}>
            <div className="d-flex justify-content-center mb-3">
              <input
                className="form-control w-50"
                type="search"
                placeholder="Search for food..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ borderRadius: '25px', borderColor: '#ccc' }}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://images.pexels.com/photos/4552130/pexels-photo-4552130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="d-block w-100"
              style={{ filter: "brightness(50%)", objectFit: "cover", height: "500px" }}
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/9789495/pexels-photo-9789495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="d-block w-100"
              style={{ filter: "brightness(50%)", objectFit: "cover", height: "500px" }}
              alt="Burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/23355687/pexels-photo-23355687/free-photo-of-handmade-items-and-decoration-on-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="d-block w-100"
              style={{ filter: "brightness(50%)", objectFit: "cover", height: "500px" }}
              alt="Food"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
            style={{ backgroundColor: '#000' }}
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
            style={{ backgroundColor: '#000' }}
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div className="row mb-4" key={data._id}>
              <div className="fs-3 m-3" style={{ color: '#333', fontWeight: 'bold' }}>{data.CategoryName}</div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem
                  .filter(
                    (item) =>
                      (item.CategoryName === data.CategoryName) &&
                      (item.name.toLowerCase().includes(search.toLowerCase()))
                  )
                  .map((filterItems) => (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3 mb-3">
                      <Card foodItem={filterItems} options={filterItems.options[0]} />
                    </div>
                  ))
              ) : (
                <div>No such Data Found</div>
              )}
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Ftr />
    </div>
  );
}
