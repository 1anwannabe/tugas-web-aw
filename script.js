// agar tidak ;angsung lompat ketika diclick tetapi berpindah secara perlahan
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });  


        // agar tampilan website lebih rapi
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        }); 

        // // ini berfungsi untuk nampilin info tanpa pindah halaman atau fokus ke satu aksi spesifik
        const menuItems = document.querySelectorAll('.menu-item');
        const modal = document.getElementById('menuModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalPrice = document.getElementById('modalPrice');
        const modalDesc = document.getElementById('modalDesc');
        const closeModal = document.getElementById('closeModal');
        const submitOrder = document.getElementById('submitOrder');
        const quantityInput = document.getElementById('quantity');
        const notesInput = document.getElementById('notes');
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                modalTitle.textContent = item.dataset.name;
                modalPrice.textContent = item.dataset.price;
                modalDesc.textContent = item.dataset.desc;
                modal.style.display = 'flex';
                quantityInput.value = 1;
                notesInput.value = '';
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        }); // fitur ini berfungsi untuk menutup otomatis pas pengguna klik di area luar modalnya

        // Order submission with simplified notification
        submitOrder.addEventListener('click', () => {
            // Memvalidasi jumlah/quantity
            if (quantityInput.value < 1) {
                notificationText.textContent = 'Error: Quantity must be at least 1';
                notification.classList.add('error');
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                    notification.classList.remove('error');
                }, 3000);
                return;
            } 

            // menghitung total harga
            const pricePerItem = parseFloat(modalPrice.textContent.replace('Rp', '').replace('.', ''));
            const totalPrice = (pricePerItem * quantityInput.value).toLocaleString('id-ID');

            // Menampilkan notif
            notificationText.textContent = `Success: ${quantityInput.value}x ${modalTitle.textContent} added to order (Total: Rp${totalPrice})${notesInput.value ? ' (Notes: ' + notesInput.value + ')' : ''}`;
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);

            modal.style.display = 'none';
        }); 

        // animasi scroll untuk section
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            observer.observe(section);
        });  
 
        // tombol balik keatas
        const BalikKeAtas = document.getElementById('BalikKeAtas');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                BalikKeAtas.style.display = 'block';
            } else {
                BalikKeAtas.style.display = 'none';
            }
        });

        BalikKeAtas.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });