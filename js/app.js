document.addEventListener('alpine:init', () => {
    Alpine.data('vendorPortal', () => ({
        // State
        lang: 'en', // 'en' or 'ms'
        currentPage: 'auth', // auth, dashboard, rules, order, logistics, invoices
        authMode: 'login', // login or signup
        isAuthenticated: false,
        
        // Data Produk (Dummy)
        products: [
            { id: 1, type: 'electric', name_en: 'Plug Point 13A', name_ms: 'Plug Point 13A', price: 80, img: 'https://placehold.co/150/334155/FFF?text=Plug' },
            { id: 2, type: 'electric', name_en: 'Industrial Fan', name_ms: 'Kipas Industri', price: 150, img: 'https://placehold.co/150/334155/FFF?text=Fan' },
            { id: 3, type: 'furniture', name_en: 'Banquet Table', name_ms: 'Meja Banquet', price: 30, img: 'https://placehold.co/150/334155/FFF?text=Table' },
            { id: 4, type: 'furniture', name_en: 'Plastic Chair', name_ms: 'Kerusi Plastik', price: 5, img: 'https://placehold.co/150/334155/FFF?text=Chair' },
        ],
        cart: {},

        // Translations Dictionary
        text: {
            en: {
                welcome: "Vendor Portal",
                subtitle: "Control center for all your events",
                login: "Login",
                signup: "Sign Up",
                email: "Email Address",
                phone_ic: "Phone / IC No.",
                enter_portal: "Enter Portal",
                dashboard: "Dashboard",
                rules: "Rules & Manual",
                order: "Order Add-ons",
                invoices: "Invoices",
                logistics: "Logistics",
                cart_total: "Total Estimate",
                submit_order: "Submit Order",
                status_booth: "Booth Status",
                deadline: "Order Deadline",
                balance: "Outstanding",
                days_left: "Days Left",
                language: "Bahasa",
                select_lang_desc: "Please select your preferred language",
                brand_name: "Brand Name",
                category: "Category",
                pic_name: "PIC Name"
            },
            ms: {
                welcome: "Portal Vendor",
                subtitle: "Pusat kawalan untuk semua event anda",
                login: "Log Masuk",
                signup: "Daftar Baru",
                email: "Alamat Email",
                phone_ic: "No. Tel / IC",
                enter_portal: "Masuk Portal",
                dashboard: "Utama",
                rules: "Peraturan & Manual",
                order: "Tempahan Tambahan",
                invoices: "Invois Saya",
                logistics: "Logistik",
                cart_total: "Anggaran Total",
                submit_order: "Hantar Tempahan",
                status_booth: "Status Booth",
                deadline: "Tarikh Tutup",
                balance: "Baki Bayaran",
                days_left: "Hari Lagi",
                language: "Language",
                select_lang_desc: "Sila pilih bahasa utama anda",
                brand_name: "Nama Brand",
                category: "Kategori",
                pic_name: "Nama PIC"
            }
        },

        // Methods
        t(key) {
            return this.text[this.lang][key] || key;
        },

        setLang(val) {
            this.lang = val;
        },

        login() {
            // Simulasi Login
            this.isAuthenticated = true;
            this.currentPage = 'dashboard';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        logout() {
            this.isAuthenticated = false;
            this.currentPage = 'auth';
            this.cart = {};
        },

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
                    return { ...p, qty, subtotal: (p.price * qty).toFixed(2) };
                });
        }
    }));
});
