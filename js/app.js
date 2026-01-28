document.addEventListener('alpine:init', () => {
    Alpine.data('vendorPortal', () => ({
        // State
        lang: 'en',
        currentPage: 'auth',
        authMode: 'login', // 'login' or 'signup'
        isAuthenticated: false,
        
        // Form Data (Baru)
        form: {
            countryPrefix: '+60',
            country: 'Malaysia'
        },

        // Data Produk & Cart (Kekal Sama seperti sebelum ini...)
        products: [
            { id: 1, type: 'electric', name_en: 'Plug Point 13A', name_ms: 'Plug Point 13A', price: 80, img: 'https://placehold.co/150/1e293b/FFF?text=Plug' },
            { id: 2, type: 'electric', name_en: 'Industrial Fan', name_ms: 'Kipas Industri', price: 150, img: 'https://placehold.co/150/1e293b/FFF?text=Fan' },
            { id: 3, type: 'furniture', name_en: 'Banquet Table', name_ms: 'Meja Banquet', price: 30, img: 'https://placehold.co/150/1e293b/FFF?text=Table' },
            { id: 4, type: 'furniture', name_en: 'Plastic Chair', name_ms: 'Kerusi Plastik', price: 5, img: 'https://placehold.co/150/1e293b/FFF?text=Chair' },
        ],
        cart: {},
        
        // Checkout & Logistics Logic (Kekal Sama...)
        showCheckout: false,
        showSuccess: false,
        isSubmitting: false,
        logisticsTimeline: [
            { time: '12 Mac', title: 'Booth Setup', desc: 'Vendor boleh mula masuk barang bermula jam 2:00 PM.', status: 'upcoming' },
            { time: '13 Mac', title: 'Event Day 1', desc: 'Pintu dibuka untuk pengunjung jam 10:00 AM.', status: 'upcoming' },
            { time: '15 Mac', title: 'Teardown', desc: 'Semua barang mesti dikeluarkan sebelum 12:00 AM.', status: 'upcoming' },
        ],

        // Translations (Updated Wording)
        text: {
            en: {
                // Auth
                login_tab: "Log In",
                signup_tab: "Vendor Registration",
                login_desc: "Welcome back to Absolut Bazaar Portal.",
                signup_desc: "Register your booth details below.",
                
                // Form Labels
                pic_name: "PIC Name",
                phone: "Phone Number",
                email: "Email Address",
                company_name: "Company Name",
                brand_name: "Brand Name",
                address: "Address",
                country: "Country",
                booth_no: "Booth Number",
                
                // Dashboard
                welcome: "Vendor Portal",
                subtitle: "Absolut Bazaar Management System",
                status_booth: "Booth Status",
                
                // Wording Fix Here
                deadline_label: "Submission Deadline", // "Penghantaran Design ditutup" version
                
                balance: "Outstanding",
                days_left: "Days Left",
                
                // ... (Yang lain kekal sama)
                dashboard: "Dashboard", rules: "Rules", order: "Order", invoices: "Invoices", logistics: "Logistics",
                cart_total: "Total Estimate", submit_order: "Confirm Order", checkout_title: "Review Order", 
                checkout_desc: "Please review items.", item: "Item", confirm: "Confirm & Pay", cancel: "Cancel",
                success_title: "Order Received!", success_desc: "Invoice sent to email.", back_home: "Back to Home", empty_cart: "Cart empty."
            },
            ms: {
                // Auth
                login_tab: "Log Masuk",
                signup_tab: "Daftar Vendor",
                login_desc: "Selamat kembali ke Portal Absolut Bazaar.",
                signup_desc: "Isi maklumat booth anda di bawah.",
                
                // Form Labels
                pic_name: "Nama PIC",
                phone: "No. Telefon",
                email: "Alamat Email",
                company_name: "Nama Syarikat",
                brand_name: "Nama Brand",
                address: "Alamat",
                country: "Negara",
                booth_no: "No. Booth",
                
                // Dashboard
                welcome: "Portal Vendor",
                subtitle: "Sistem Pengurusan Absolut Bazaar",
                status_booth: "Status Booth",
                
                // Wording Fix Here
                deadline_label: "Tarikh Akhir Hantar", // Ini yang kau minta tukar
                
                balance: "Baki Bayaran",
                days_left: "Hari Lagi",
                
                // ... (Yang lain kekal sama)
                dashboard: "Utama", rules: "Info", order: "Order", invoices: "Invois", logistics: "Logistik",
                cart_total: "Anggaran Total", submit_order: "Sahkan Order", checkout_title: "Semakan Order", 
                checkout_desc: "Sila semak item.", item: "Barang", confirm: "Sahkan & Bayar", cancel: "Batal",
                success_title: "Order Diterima!", success_desc: "Invois telah dihantar ke email.", back_home: "Kembali ke Utama", empty_cart: "Bakul kosong."
            }
        },

        // Methods (Kekal Sama)
        t(key) { return this.text[this.lang][key] || key; },
        setLang(val) { this.lang = val; },
        login() { this.isAuthenticated = true; this.currentPage = 'dashboard'; window.scrollTo({ top: 0, behavior: 'smooth' }); },
        logout() { this.isAuthenticated = false; this.currentPage = 'auth'; this.cart = {}; },
        addToCart(id, qty) { if (!this.cart[id]) this.cart[id] = 0; this.cart[id] += qty; if (this.cart[id] < 0) this.cart[id] = 0; },
        getCartTotal() { let t = 0; for (const [i, q] of Object.entries(this.cart)) { const p = this.products.find(x => x.id == i); if (p) t += p.price * q; } return t.toFixed(2); },
        getCartItems() { return Object.entries(this.cart).filter(([_, q]) => q > 0).map(([i, q]) => { const p = this.products.find(x => x.id == i); const n = this.lang === 'en' ? p.name_en : p.name_ms; return { ...p, name: n, qty: q, subtotal: (p.price * q).toFixed(2) }; }); },
        openCheckout() { if (this.getCartTotal() > 0) this.showCheckout = true; else alert(this.lang === 'en' ? "Please select item." : "Sila pilih barang."); },
        processPayment() { this.isSubmitting = true; setTimeout(() => { this.isSubmitting = false; this.showCheckout = false; this.showSuccess = true; this.cart = {}; }, 2000); },
        finishOrder() { this.showSuccess = false; this.currentPage = 'dashboard'; }
    }));
});
