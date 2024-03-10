"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

export default function Blog() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    (async () => {
      const results = await fetch("/api/list").then((response) =>
        response.json()
      );
      setRestaurants(results);
    })();
  }, []);

  return (
    <div className='container'>
      <main className='{styles.main}'>
        <h1 className='{styles.title}'>
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
