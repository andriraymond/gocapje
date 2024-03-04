import axios from 'axios';

// Link URL Banner
const bannersURL = "https://andriraymond.github.io/json-repository/banners.json"

// Link URL Products
const productsURL = "https://andriraymond.github.io/json-repository/products.json"


// 01. Mengambil data Banners
export async function fetchBanners() {
    try {
        const response = await axios.get(bannersURL);
        return response.data;
    } catch (err) {
        console.error('Gagal mengambil data:', err);
        return [];
    }
}

// 02. Mengambil data Products
export async function fetchProducts() {
    try {
        const response = await axios.get(productsURL);
        return response.data;
    } catch (err) {
        console.error('Gagal mengambil data:', err);
        return [];
    }
}

// export async function fetchData() {
//     try {
//         // const response = await axios.post(bannerURL);
//         const response = await axios.get(bannersURL);
//         return response.data;
//         // data = response.json();

//     } catch (error) {
//         console.error('Gagal mengambil data:', error);
//         return null;
//     }
// }