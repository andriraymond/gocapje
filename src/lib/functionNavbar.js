// Ambil semua kontainer
const containers = document.querySelectorAll('.container');

// Tambahkan event listener untuk setiap kontainer
containers.forEach(container => {
    container.addEventListener('mouseenter', () => {
        // Hapus kelas aktif dari semua kontainer
        containers.forEach(c => c.classList.remove('active'));
        // Tambahkan kelas aktif ke kontainer yang dihover
        container.classList.add('active');
    });

    container.addEventListener('mouseleave', () => {
        // Hapus kelas aktif dari semua kontainer saat mouse meninggalkan area kontainer
        containers.forEach(c => c.classList.remove('active'));
    });
});
