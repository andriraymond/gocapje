"use client";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function Blog() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/list");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("connected");
        setRestaurants(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='container'>
      <Head>
        <title>MongoDB with Next.js</title>
      </Head>
      <main className='container'>
        <h1>
          MongoDB with <a href='https://nextjs.org'>Next.js!</a> Example
        </h1>
        <br />
        <div>
          {restaurants.map((restaurant) => (
            <div key={restaurant._id}>
              <h2>{restaurant.name}</h2>
              <p>{restaurant.address.street}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
