"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './carousell.module.css';

// banner_data

const carousell = [
    {
        id: 1,
        title: 'Maecenas mattis egestas',
        description: 'Erdum et melesuada fames ac ante ipsum primis in faucibus unpendisse porta.',
        image: '/carousell/shopee-01.jpeg',
        URL: 'https://andriraymond.site'
    },
    {
        id: 2,
        title: '2 Maecenas mattis egestas',
        description: '2 Erdum et melesuada fames ac ante ipsum primis in faucibus unpendisse porta.',
        image: '/carousell/shopee-02.png',
        URL: 'https://andriraymond.medium.com'
    },
    {
        id: 3,
        title: '3 Maecenas mattis egestas',
        description: '2 Erdum et melesuada fames ac ante ipsum primis in faucibus unpendisse porta.',
        image: '/carousell/shopee-03.png',
        URL: 'https://andriraymond.medium.com'
    },
    {
        id: 4,
        title: '4 Maecenas mattis egestas',
        description: '4 Erdum et melesuada fames ac ante ipsum primis in faucibus unpendisse porta.',
        image: '/carousell/index-04.jpg',
        URL: 'https://andriraymond.medium.com'
    },
    {
        id: 5,
        title: '5 Maecenas mattis egestas',
        description: '5 Erdum et melesuada fames ac ante ipsum primis in faucibus unpendisse porta.',
        image: '/carousell/index-05.webp',
        URL: 'https://andriraymond.medium.com'
    },
    {
        id: 6,
        title: '6 Maecenas mattis egestas',
        description: '6 Erdum et melesuada fames ac ante ipsum primis in faucibus unpendisse porta.',
        image: '/carousell/index-06.webp',
        URL: 'https://andriraymond.medium.com'
    }
];

const HomeCarousell = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(currentSlide => (currentSlide + 1) % carousell.length);
        }, 5000); // Ganti gambar setiap 5 detik

        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + carousell.length) % carousell.length);
    };

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % carousell.length);
    };

    return (
        <section className={styles.carousell}>
            <div className={styles.image}>
                <a href={carousell[currentSlide].URL}>
                    <Image
                        src={carousell[currentSlide].image}
                        alt={carousell[currentSlide].title}
                        width={900}
                        height={295}
                    />
                </a>
            </div>
            <div className={styles.buttons}>
                {/* <button onClick={prevSlide}>Previous</button>
                <button onClick={nextSlide}>Next</button> */}
            </div>
        </section>
    );
};

export default HomeCarousell;
