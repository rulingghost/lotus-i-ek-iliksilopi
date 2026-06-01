/**
 * Lotus Çiçekçilik - Premium Mobil Entegrasyon & Fiyatsız Sipariş Kontrolörü
 * Tasarım ve İşlevsellik: Antigravity AI
 */

// --- SABİT YAPILANDIRMALAR ---
const WHATSAPP_PHONE = "905330204373"; // Lotus Çiçekçilik Silopi Telefon Numarası (+90 533 020 4373)

// Premium Ürün Kataloğu Veri Tabanı (Sanatsal & Ultra Yüksek Kaliteli Çiçekler)
const PRODUCTS_DATA = [
    {
        id: 1,
        title: "Kraliyet Aşkı Beyaz Gül Buketi",
        category: "buket",
        categoryName: "Lüks Buketler",
        description: "Elit İskandinav tarzı krem rengi ambalajda sunulan, birinci sınıf iri beyaz güllerin zarafet dolu tasarımı.",
        image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=600&auto=format&fit=crop",
        badge: "Çok Popüler"
    },
    {
        id: 2,
        title: "Masalsı Ortanca ve Pastel Gül Buketi",
        category: "buket",
        categoryName: "Bahar Buketleri",
        description: "Soft pembe güller, dolgun taze ortancalar ve okaliptüs yapraklarının rüya gibi bir araya gelişi.",
        image: "https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=600&auto=format&fit=crop",
        badge: "Yeni Sezon"
    },
    {
        id: 3,
        title: "Zarif Lale ve Kır Çiçekleri Buketi",
        category: "buket",
        categoryName: "Tasarım Buketler",
        description: "Doğal tonlarda şık ambalajıyla hazırlanan pastel laleler ve mevsimin en asil kır çiçekleri kombinasyonu.",
        image: "https://images.unsplash.com/photo-1562244970-70a0b2fa3d40?q=80&w=600&auto=format&fit=crop",
        badge: "Haftanın Tasarımı"
    },
    {
        id: 4,
        title: "Söz & Nişan Premium Çikolata Gondolu",
        category: "cikolata",
        categoryName: "Söz & Nişan",
        description: "Lüks altın rengi sunum tepside, el yapımı taze Belçika çikolataları ve şık taze çiçek süslemeleri.",
        image: "https://images.unsplash.com/photo-1549007994-cb92ca813bec?q=80&w=600&auto=format&fit=crop",
        badge: "Lüks Sunum"
    },
    {
        id: 5,
        title: "Asil Beyaz Orkide Seramik Saksı",
        category: "saksi",
        categoryName: "Saksı Çiçekleri",
        description: "Büyük dolgun çiçekli beyaz çift dallı orkide, minimalist modern mat seramik saksı içerisinde kalıcı bir hediye.",
        image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=600&auto=format&fit=crop",
        badge: "Ev & Ofis"
    },
    {
        id: 6,
        title: "Modern Rustik Masa Aranjmanı",
        category: "aranjman",
        categoryName: "Masa Aranjmanları",
        description: "Özel tasarım minimalist beton saksıda, soft tonlarda ithal kuru pampas ve canlı çiçeklerin mükemmel uyumu.",
        image: "https://images.unsplash.com/photo-1522819866576-259000a3c27b?q=80&w=600&auto=format&fit=crop",
        badge: "Tasarım Ödüllü"
    },
    {
        id: 7,
        title: "Minimalist Kurutulmuş Çiçek & Pampas Vazosu",
        category: "yapay",
        categoryName: "Yapay Çiçek Dekor",
        description: "Yıllarca ilk günkü zarafetini koruyan, İskandinav tarzı cam vazo içerisinde kurutulmuş seçkin botanik dekor seti.",
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop",
        badge: "Solmayan Sanat"
    },
    {
        id: 8,
        title: "Gelin Arabası Premium Süsleme Tasarımı",
        category: "arac",
        categoryName: "Araç Süsleme",
        description: "Canlı beyaz güller, taze okaliptüs yaprakları ve sade şifon tüllerle hazırlanan son derece zarif araç süsleme konsepti.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
        badge: "Rezervasyonlu"
    }
];

// --- SAYFA BAŞLANGIÇ AYARLARI ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Ürünleri Yükle (Tümü Filtresiyle)
    renderProducts("all");
    
    // 2. Kategori Seçici Filtreleri
    setupCategoryFilters();
    
    // 3. Scroll Takipçisi ve Bottom/Masaüstü Aktif Link Senkronizasyonu
    setupScrollInteractions();
    
    // 4. Form Tarihini Bugünün Tarihine Ayarla
    const dateInput = document.getElementById("form-date");
    if(dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
});

// --- ÜRÜN KARTLARINI OLUŞTURMA MOTORU (FİYATSIZ MİMARİ) ---
function renderProducts(categoryFilter = "all") {
    const gridContainer = document.getElementById("products-grid-container");
    if (!gridContainer) return;
    
    gridContainer.innerHTML = ""; // Mevcut kartları temizle
    
    const filteredProducts = categoryFilter === "all" 
        ? PRODUCTS_DATA 
        : PRODUCTS_DATA.filter(p => p.category === categoryFilter);
        
    filteredProducts.forEach(product => {
        const cardHTML = `
            <div class="product-card">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                    <div class="product-image-overlay"></div>
                </div>
                <div class="product-info">
                    <div class="product-meta">
                        <span class="product-category-name">${product.categoryName}</span>
                    </div>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <button class="btn-order-wp-full" onclick="orderProduct('${product.title}')" aria-label="WhatsApp ile Sipariş Ver">
                            <svg viewBox="0 0 24 24">
                                <path d="M12.012 2c-5.506 0-9.988 4.478-9.988 9.984 0 1.83.498 3.542 1.362 5.02L2 22l5.148-1.336c1.428.784 3.06 1.232 4.792 1.232 5.508 0 9.988-4.478 9.988-9.984C21.928 6.478 17.448 2 12.012 2zm6.276 13.9c-.276.774-1.374 1.4-1.896 1.488-.474.078-1.092.126-3.192-.744-2.682-1.11-4.41-3.846-4.542-4.026-.132-.18-1.074-1.428-1.074-2.724 0-1.296.678-1.932.918-2.19.24-.258.528-.324.708-.324.18 0 .366.006.522.012.168.006.396-.066.618.474.228.558.78 1.902.846 2.04.066.138.108.3.018.486-.09.18-.138.3-.276.462-.138.162-.294.36-.42.486-.144.138-.294.288-.126.576.168.288.75 1.236 1.614 2.004.9.804 1.776 1.056 2.076 1.206.3.15.474.126.654-.078.18-.21.78-.906.99-1.218.21-.312.42-.258.708-.15.288.108 1.836.864 2.154 1.02.318.156.528.234.606.366.078.132.078.762-.198 1.536z"/>
                            </svg>
                            Sipariş & Bilgi Al
                        </button>
                    </div>
                </div>
            </div>
        `;
        gridContainer.insertAdjacentHTML("beforeend", cardHTML);
    });
}

// --- KATEGORİ FİLTRELEME OLAYLARI ---
function setupCategoryFilters() {
    const pills = document.querySelectorAll(".category-pill");
    pills.forEach(pill => {
        pill.addEventListener("click", () => {
            pills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            
            const selectedCat = pill.getAttribute("data-category");
            renderProducts(selectedCat);
            
            // Kategori seçilince pürüzsüz kaydırma yap
            const catalogSection = document.getElementById("catalog");
            if (catalogSection) {
                const headerOffset = 80;
                const elementPosition = catalogSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

// --- SCROLL TAKİPÇİSİ & AKTİF MENÜ BAĞLANTILARI ---
function setupScrollInteractions() {
    const header = document.getElementById("main-header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    const sections = document.querySelectorAll("section[id]");
    const navItems = {
        "home": [
            document.getElementById("nav-btn-home"),
            document.querySelector('.desktop-nav a[href="#home"]')
        ],
        "catalog": [
            document.getElementById("nav-btn-catalog"),
            document.querySelector('.desktop-nav a[href="#catalog"]')
        ],
        "contact": [
            document.getElementById("nav-btn-contact"),
            document.querySelector('.desktop-nav a[href="#contact"]')
        ]
    };
    
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                
                Object.values(navItems).forEach(items => {
                    items.forEach(item => {
                        if (item) item.classList.remove("active");
                    });
                });
                
                if (navItems[id]) {
                    navItems[id].forEach(item => {
                        if (item) item.classList.add("active");
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id === "home" || section.id === "catalog" || section.id === "contact") {
            observer.observe(section);
        }
    });
}

// --- WHATSAPP YÖNLENDİRME & ASİSTAN YÖNETİMİ ---
function toggleWpAssistant() {
    const bubble = document.getElementById("wp-chat-bubble");
    const badge = document.querySelector(".wp-badge-count");
    
    if (bubble) {
        const isOpen = bubble.classList.toggle("open");
        if (isOpen && badge) {
            badge.style.display = "none";
        }
    }
}

// Canlı Asistandan Hazır Fiyatsız Yönlendirme Mesajları
function sendAutoMessage(msgType) {
    let rawText = "";
    
    switch (msgType) {
        case "buket_fiyat":
            rawText = "Merhaba Lotus Çiçekçilik, web siteniz üzerinde yer alan özel buket tasarımlarınız hakkında bilgi alabilir ve kişiye özel bir sipariş oluşturabilir miyim? 🌸";
            break;
        case "arac_susleme":
            rawText = "Merhaba, düğünümüz için gelin arabası süsleme modelleriniz, müsaitlik durumunuz ve rezervasyon süreci hakkında bilgi alabilir miyiz? 🚗";
            break;
        case "cikolata_kutu":
            rawText = "Merhaba, söz ve nişan merasimimiz için hazırladığınız özel süslemeli kız isteme çikolata kutusu modelleri hakkında bilgi alabilir miyim? 🍫";
            break;
        case "konum_adresi":
            rawText = "Merhaba, Silopi Yenişehir mahallesindeki butik mağazanızı ziyaret etmek istiyorum. Tam konum veya yol tarifi gönderebilir misiniz? 📍";
            break;
        default:
            rawText = "Merhaba, tasarım çiçekleriniz hakkında bilgi alabilir miyim?";
    }
    
    redirectToWhatsApp(rawText);
}

// --- ÜRÜN KARTINDAN DOĞRUDAN WHATSAPP SİPARİŞİ ---
function orderProduct(title) {
    const msg = `Merhaba Lotus Çiçekçilik, web sitenizde yer alan **"${title}"** tasarımınızı çok beğendim. Stok durumu, detaylar ve sipariş süreci hakkında bilgi alabilir miyim? 🌸`;
    redirectToWhatsApp(msg);
}

// --- ÖZEL SİPARİŞ MODAL FORMU ---
function openOrderModal(sourceType) {
    const modal = document.getElementById("order-modal-overlay");
    const formType = document.getElementById("form-item-type");
    
    if (modal) {
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
        
        if (formType) {
            formType.value = sourceType;
        }
    }
}

function closeOrderModal() {
    const modal = document.getElementById("order-modal-overlay");
    if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
    }
}

// Özel Sipariş Form Gönderimi (Bütçesiz & Fiyatsız Sade Metin Fişi)
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById("form-name").value.trim();
    const dateInput = document.getElementById("form-date").value;
    const note = document.getElementById("form-note").value.trim();
    const sourceType = document.getElementById("form-item-type").value;
    
    let formattedDate = dateInput;
    if (dateInput) {
        const parts = dateInput.split('-');
        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    
    // Mesaj Taslağı
    let text = `✨ **YENİ SİPARİŞ / BİLGİ TALEBİ** ✨\n\n`;
    text += `👤 **Müşteri Adı:** ${name}\n`;
    text += `📅 **Teslim Tarihi:** ${formattedDate}\n`;
    text += `🌸 **Talep Türü:** ${sourceType}\n`;
    
    if (note) {
        text += `📝 **Özel Not / İstekler:** ${note}\n`;
    }
    
    text += `\n*Bu sipariş talebi Lotus Çiçekçilik web sitesi üzerinden oluşturulmuştur.*`;
    
    redirectToWhatsApp(text);
    closeOrderModal();
    
    document.getElementById("custom-order-form").reset();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById("form-date").value = today;
}

// --- WHATSAPP URL ENCODE MOTORU ---
function redirectToWhatsApp(text) {
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;
    window.open(waUrl, '_blank');
}
