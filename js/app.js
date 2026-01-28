document.addEventListener('alpine:init', () => {
    Alpine.data('vendorPortal', () => ({
        // State
        lang: 'en',
        currentPage: 'auth', // auth, dashboard, profile, order, logistics
        authMode: 'login',
        isAuthenticated: false,
        
        // Order State
        activeCategory: 'furniture', // furniture, electrical, storage, pass, parking
        showCheckout: false,
        showSuccess: false,
        isSubmitting: false,

        // User Data (Synced between Signup & Profile)
        user: {
            companyName: '',
            brandName: '',
            picName: '',
            phonePrefix: '+60',
            phone: '',
            email: '',
            address: '',
            country: 'Malaysia',
            boothNo: '',
            logo: null, // Stores image preview URL
            socials: {
                instagram: '',
                tiktok: '',
                facebook: ''
            }
        },

        // Data Produk (Updated Categories)
        products: [
            // Furniture
            { id: 1, category: 'furniture', name: 'Banquet Table', price: 30, img: 'https://placehold.co/150/f1f5f9/334155?text=Table' },
            { id: 2, category: 'furniture', name: 'Plastic Chair', price: 5, img: 'https://placehold.co/150/f1f5f9/334155?text=Chair' },
            { id: 3, category: 'furniture', name: 'Round Table', price: 45, img: 'https://placehold.co/150/f1f5f9/334155?text=Round' },
            
            // Electrical
            { id: 4, category: 'electrical', name: 'Plug Point 13A', price: 80, img: 'https://placehold.co/150/f1f5f9/334155?text=Plug' },
            { id: 5, category: 'electrical', name: 'Industrial Fan', price: 150, img: 'https://placehold.co/150/f1f5f9/334155?text=Fan' },
            
            // Storage
            { id: 6, category: 'storage', name: 'Storage Box (L)', price: 25, img: 'https://placehold.co/150/f1f5f9/334155?text=Box' },
            { id: 7, category: 'storage', name: 'Rack Shelf', price: 60, img: 'https://placehold.co/150/f1f5f9/334155?text=Rack' },

            // Pass
            { id: 8, category: 'pass', name: 'Extra Vendor Pass', price: 15, img: 'https://placehold.co/150/f1f5f9/334155?text=Pass' },
            { id: 9, category: 'pass', name: 'Construction Pass', price: 10, img: 'https://placehold.co/150/f1f5f9/334155?text=Cons.' },

            // Parking
            { id: 10, category: 'parking', name: 'Season Parking (3 Days)', price: 50, img: 'https://placehold.co/150/f1f5f9/334155?text=Parking' },
            { id: 11, category: 'parking', name: 'Loading Bay Entry', price: 20, img: 'https://placehold.co/150/f1f5f9/334155?text=Loading' },
        ],
        cart: {},

        // Logistics Data
        logisticsTimeline: [
            { time: '12 Mac', title: 'Booth Setup', desc: 'Vendor entry starts at 2:00 PM.', status: 'upcoming' },
            { time: '13 Mac', title: 'Event Day 1', desc: 'Doors open at 10:00 AM.', status: 'upcoming' },
            { time: '15 Mac', title: 'Teardown', desc: 'Clearance by 12:00 AM.', status: 'upcoming' },
        ],

        // Translations
        text: {
            en: {
                welcome: "Dashboard",
                subtitle: "Manage your event needs",
                profile: "Profile",
                save_profile: "Save Profile",
                upload_logo: "Upload Logo",
                social_media: "Social Media",
                social_hint: "Must include https://",
                categories: { furniture: "Furniture", electrical: "Electrical", storage: "Storage", pass: "Passes", parking: "Parking" },
                // ... (Existing keys)
                login_tab: "Log In", signup_tab: "Sign Up", login_desc: "Access your vendor account.", signup_desc: "Register your brand details.",
                order: "Order", logistics: "Logistics", dashboard: "Home",
                cart_total: "Total", submit_order: "Checkout", checkout_title: "Summary", checkout_desc: "Review your items",
                confirm: "Confirm Order", cancel: "Cancel", success_title: "Success", success_desc: "Order placed successfully.", back_home: "Back"
            },
            ms: {
                welcome: "Utama",
                subtitle: "Uruskan keperluan event anda",
                profile: "Profil",
                save_profile: "Simpan Profil",
                upload_logo: "Muat Naik Logo",
                social_media: "Media Sosial",
                social_hint: "Wajib ada https://",
                categories: { furniture: "Perabot", electrical: "Elektrik", storage: "Storan", pass: "Pas", parking: "Parkir" },
                // ... (Existing keys)
                login_tab: "Log Masuk", signup_tab: "Daftar", login_desc: "Akses akaun vendor anda.", signup_desc: "Daftarkan butiran brand.",
                order: "Tempahan", logistics: "Logistik", dashboard: "Utama",
                cart_total: "Jumlah", submit_order: "Bayar", checkout_title: "Ringkasan", checkout_desc: "Semak item anda",
                confirm: "Sahkan", cancel: "Batal", success_title: "Berjaya", success_desc: "Tempahan diterima.", back_home: "Kembali"
            }
        },

        // Methods
        t(key) { return this.text[this.lang][key] || key; },
        setLang(val) { this.lang = val; },
        
        login() { 
            // Simple validation simulation
            if (this.authMode === 'signup' && !this.user.brandName) {
                alert("Please enter Brand Name"); return;
            }
            this.isAuthenticated = true; 
            this.currentPage = 'dashboard'; 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        },
        
        logout() { this.isAuthenticated = false; this.currentPage = 'auth'; this.cart = {}; },
        
        // Image Upload Logic (Preview)
        handleLogoUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.user.logo = URL.createObjectURL(file);
            }
        },

        // Order Logic
        addToCart(id, qty) {
            if (!this.cart[id]) this.cart[id] = 0;
            this.cart[id] += qty;
            if (this.cart[id] < 0) this.cart[id] = 0;
        },
        getCartTotal() {
            let t = 0;
            for (const [i, q] of Object.entries(this.cart)) {
                const p = this.products.find(x => x.id == i);
                if (p) t += p.price * q;
            }
            return t.toFixed(2);
        },
        getCartItems() {
            return Object.entries(this.cart).filter(([_, q]) => q > 0).map(([i, q]) => {
                const p = this.products.find(x => x.id == i);
                return { ...p, qty: q, subtotal: (p.price * q).toFixed(2) };
            });
        },
        openCheckout() {
            if (this.getCartTotal() > 0) this.showCheckout = true;
            else alert("Cart is empty");
        },
        processPayment() {
            this.isSubmitting = true;
            setTimeout(() => {
                this.isSubmitting = false;
                this.showCheckout = false;
                this.showSuccess = true;
                this.cart = {};
            }, 1500);
        },
        finishOrder() { this.showSuccess = false; this.currentPage = 'dashboard'; }
    }));
});
