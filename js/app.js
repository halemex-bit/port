document.addEventListener('alpine:init', () => {
    Alpine.data('vendorPortal', () => ({
        // State
        lang: 'en',
        currentPage: 'auth',
        authMode: 'login',
        isAuthenticated: false,
        
        // Checkout Logic
        showCheckout: false, // Control checkout modal
        showSuccess: false,  // Control success screen
        isSubmitting: false, // Loading state

        // Data Produk
        products: [
            { id: 1, type: 'electric', name_en: 'Plug Point 13A', name_ms: 'Plug Point 13A', price: 80, img: 'https://placehold.co/150/334155/FFF?text=Plug' },
            { id: 2, type: 'electric', name_en: 'Industrial Fan', name_ms: 'Kipas Industri', price: 150, img: 'https://placehold.co/150/334155/FFF?text=Fan' },
            { id: 3, type: 'furniture', name_en: 'Banquet Table', name_ms: 'Meja Banquet', price: 30, img: 'https://placehold.co/150/334155/FFF?text=Table' },
            { id: 4, type: 'furniture', name_en: 'Plastic Chair', name_ms: 'Kerusi Plastik', price: 5, img: 'https://placehold.co/150/334155/FFF?text=Chair' },
        ],
        cart: {},

        // Data Logistics (Timeline Event)
        logisticsTimeline: [
            { time: '12 Mac', title: 'Booth Setup', desc: 'Vendor boleh mula masuk barang bermula jam 2:00 PM.', status: 'upcoming' },
            { time: '13 Mac', title: 'Event Day 1', desc: 'Pintu dibuka untuk pengunjung jam 10:00 AM.', status: 'upcoming' },
            { time: '15 Mac', title: 'Teardown', desc: 'Semua barang mesti dikeluarkan sebelum 12:00 AM.', status: 'upcoming' },
        ],

        // Translations
        text: {
            en: {
                // ... (Text lama kekal sama)
                welcome: "Vendor Portal",
                subtitle: "Control center for all your events",
                login: "Login",
                signup: "Sign Up",
                email: "Email Address",
                phone_ic: "Phone / IC No.",
                enter_portal: "Enter Portal",
                dashboard: "Dashboard",
                rules: "Rules",
                order: "Order",
                invoices: "Invoices",
                logistics: "Logistics", // Added
                cart_total: "Total Estimate",
                submit_order: "Confirm Order",
                checkout_title: "Review Order",
                checkout_desc: "Please review your items before confirming.",
                item: "Item",
                qty: "Qty",
                subtotal: "Subtotal",
                cancel: "Cancel",
                confirm: "Confirm & Pay",
                success_title: "Order Received!",
                success_desc: "We have sent the invoice to your email.",
                back_home: "Back to Home",
                empty_cart: "Your cart is empty."
            },
            ms: {
                // ... (Text lama kekal sama)
                welcome: "Portal Vendor",
                subtitle: "Pusat kawalan untuk semua event anda",
                login: "Log Masuk",
                signup: "Daftar Baru",
                email: "Alamat Email",
                phone_ic: "No. Tel / IC",
                enter_portal: "Masuk Portal",
                dashboard: "Utama",
                rules: "Info",
                order: "Order",
                invoices: "Invois",
                logistics: "Logistik", // Added
                cart_total: "Anggaran Total",
                submit_order: "Sahkan Order",
                checkout_title: "Semakan Order",
                checkout_desc: "Sila semak item anda sebelum pengesahan.",
                item: "Barang",
                qty: "Kuantiti",
                subtotal: "Jumlah",
                cancel: "Batal",
                confirm: "Sahkan & Bayar",
                success_title: "Order Diterima!",
                success_desc: "Kami telah menghantar invois ke email anda.",
                back_home: "Kembali ke Utama",
                empty_cart: "Bakul anda kosong."
            }
        },

        // Methods
        t(key) { return this.text[this.lang][key] || key; },
        setLang(val) { this.lang = val; },
        login() { this.isAuthenticated = true; this.currentPage = 'dashboard'; window.scrollTo({ top: 0, behavior: 'smooth' }); },
        logout() { this.isAuthenticated = false; this.currentPage = 'auth'; this.cart = {}; },
        
        addToCart(id, qty) {
            if (!this.cart[id]) this.cart[id] = 0;
            this.cart[id] += qty;
            if (this.cart[id] < 0) this.cart[id] = 0;
        },

        getCartTotal() {
            let total = 0;
            for (const [id, qty] of Object.entries(this.cart)) {
                const product = this.products.find(p => p.id == id);
                if (product) total += product.price * qty;
            }
            return total.toFixed(2);
        },

        getCartItems() {
            return Object.entries(this.cart)
                .filter(([_, qty]) => qty > 0)
                .map(([id, qty]) => {
                    const p = this.products.find(p => p.id == id);
                    const name = this.lang === 'en' ? p.name_en : p.name_ms;
                    return { ...p, name, qty, subtotal: (p.price * qty).toFixed(2) };
                });
        },

        // Logic Checkout Baru
        openCheckout() {
            if (this.getCartTotal() > 0) {
                this.showCheckout = true;
            } else {
                alert(this.lang === 'en' ? "Please select an item first." : "Sila pilih barang dahulu.");
            }
        },

        processPayment() {
            this.isSubmitting = true;
            // Simulasi API Call (2 saat)
            setTimeout(() => {
                this.isSubmitting = false;
                this.showCheckout = false;
                this.showSuccess = true;
                this.cart = {}; // Clear cart
            }, 2000);
        },

        finishOrder() {
            this.showSuccess = false;
            this.currentPage = 'dashboard';
        }
    }));
});
