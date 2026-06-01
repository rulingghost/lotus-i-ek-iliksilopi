/**
 * Lotus Çiçekçilik - Premium Mobil Entegrasyon & WhatsApp Otomasyon Kontrolörü
 * Tasarım ve İşlevsellik: Antigravity AI
 */

// --- SABİT YAPILANDIRMALAR ---
const WHATSAPP_PHONE = "905330204373"; // Lotus Çiçekçilik Silopi Telefon Numarası (+90 533 020 4373)

// Ürün Kataloğu Veri Tabanı (Lüks ve Gerçekçi Görsellerle Optimize Edilmiştir)
const PRODUCTS_DATA = [
    {
        id: 1,
        title: "Kraliyet Aşkı Kırmızı Gül Buketi",
        category: "buket",
        categoryName: "Lüks Buketler",
        description: "En taze kırmızı ithal güller, şık premium ambalaj tasarımı ile sevdiğiniz için göz kamaştırıcı bir zarafet sunar.",
        price: "450 TL",
        image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=600&auto=format&fit=crop",
        badge: "En Çok Satan"
    },
    {
        id: 2,
        title: "Beyaz Papatya ve Krizantem Rüyası",
        category: "buket",
        categoryName: "Bahar Buketleri",
        description: "Doğanın en saf halini yansıtan beyaz kır papatyaları ve renkli krizantemlerin muhteşem kır sepeti uyumu.",
        price: "350 TL",
        image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop",
        badge: "Yeni Ürün"
    },
    {
        id: 3,
        title: "Lüks Şakayık ve Soft Pembe Gül Buketi",
        category: "buket",
        categoryName: "Tasarım Aranjmanlar",
        description: "Açık pembe güller, dolgun şakayıklar ve okaliptüs yaprakları ile bezenmiş son derece asil bir konsept.",
        price: "600 TL",
        image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=600&auto=format&fit=crop",
        badge: "Özel Tasarım"
    },
    {
        id: 4,
        title: "Kız İsteme & Söz Çikolatası Gümüş Tepsi",
        category: "cikolata",
        categoryName: "Söz & Nişan",
        description: "Lüks gümüş gondol tepsi içerisinde özenle dizilmiş, üzeri canlı çiçeklerle süslenmiş elit Belçika çikolataları.",
        price: "750 TL",
        image: "https://images.unsplash.com/photo-1548907040-4d42b5213b3e?q=80&w=600&auto=format&fit=crop",
        badge: "Göz Alıcı"
    },
    {
        id: 5,
        title: "Lüks Çift Dallı Beyaz Yapay Orkide",
        category: "yapay",
        categoryName: "Yapay Çiçek Dekor",
        description: "Gerçek dokulu yapay orkideler ve birinci sınıf seramik vazo. Ev ve ofis dekorasyonları için solmayan kalıcı lüks.",
        price: "850 TL",
        image: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=600&auto=format&fit=crop",
        badge: "Solmayan Lüks"
    },
    {
        id: 6,
        title: "Masalsı Seramik Vazo Aranjmanı",
        category: "aranjman",
        categoryName: "Masa Aranjmanları",
        description: "Premium ithal çiçeklerin, şık geometrik seramik saksıda bir araya gelmesiyle oluşan modern masaüstü tasarımı.",
        price: "500 TL",
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop",
        badge: "Premium"
    },
    {
        id: 7,
        title: "Premium Gelin Arabası Süsleme Konsepti",
        category: "arac",
        categoryName: "Araç Süsleme",
        description: "Canlı gül aranjmanları, tüller ve arka plaka kişiselleştirmeleri ile düğününüzün en dikkat çekici detayını tasarlıyoruz.",
        price: "Fiyat Sorun",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
        badge: "Rezervasyonlu"
    },
    {
        id: 8,
        title: "Egzotik Saksı Çiçeği (Monstera Deve Tabanı)",
        category: "saksi",
        categoryName: "Saksı Çiçekleri",
        description: "Büyük, delikli yemyeşil yaprakları ile yaşam alanlarınıza botanik bir hava katacak birinci sınıf sağlıklı Monstera çiçeği.",
        price: "400 TL",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
        badge: "Havadar & Taze"
    }
];

// --- SAYFA BAŞLANGIÇ AYARLARI ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Ürünleri Sayfaya Yükle (Tümü Kategorisiyle)
    renderProducts("all");
    
    // 2. Kategori Butonları Tıklama Olayları
    setupCategoryFilters();
    
    // 3. Scroll Efektleri ve Bottom Navigation Takipçisi
    setupScrollInteractions();
    
    // 4. Form İçin Varsayılan Tarihi Bugün Yap
    const dateInput = document.getElementById("form-date");
    if(dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
    
    // 5. Asistan Bildirim Efekti (3 saniye sonra asistan baloncuğunda küçük bir sallantı yaratır)
    setTimeout(() => {
        const trigger = document.getElementById("wp-trigger-btn");
        if(trigger) {
            trigger.style.animation = "bounce-float 1.5s ease-in-out infinite, pulse-scale 1.5s infinite";
        }
    }, 3000);
});

// --- ÜRÜN RENDER ETME MOTORU ---
function renderProducts(categoryFilter = "all") {
    const gridContainer = document.getElementById("products-grid-container");
    if (!gridContainer) return;
    
    gridContainer.innerHTML = ""; // Mevcut kartları temizle
    
    // Filtreleme mantığı
    const filteredProducts = categoryFilter === "all" 
        ? PRODUCTS_DATA 
        : PRODUCTS_DATA.filter(p => p.category === categoryFilter);
        
    filteredProducts.forEach(product => {
        const cardHTML = `
            <div class="product-card glassmorphism">
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
                        <div class="product-price">
                            <span class="product-price-label">Fiyat</span>
                            <span class="product-price-amount ${product.price === 'Fiyat Sorun' ? 'custom-price' : ''}">${product.price}</span>
                        </div>
                        <button class="btn-order-wp" onclick="orderProduct('${product.title}', '${product.price}')" aria-label="WhatsApp ile Sipariş Et">
                            <svg viewBox="0 0 24 24">
                                <path d="M12.012 2c-5.506 0-9.988 4.478-9.988 9.984 0 1.83.498 3.542 1.362 5.02L2 22l5.148-1.336c1.428.784 3.06 1.232 4.792 1.232 5.508 0 9.988-4.478 9.988-9.984C21.928 6.478 17.448 2 12.012 2zm6.276 13.9c-.276.774-1.374 1.4-1.896 1.488-.474.078-1.092.126-3.192-.744-2.682-1.11-4.41-3.846-4.542-4.026-.132-.18-1.074-1.428-1.074-2.724 0-1.296.678-1.932.918-2.19.24-.258.528-.324.708-.324.18 0 .366.006.522.012.168.006.396-.066.618.474.228.558.78 1.902.846 2.04.066.138.108.3.018.486-.09.18-.138.3-.276.462-.138.162-.294.36-.42.486-.144.138-.294.288-.126.576.168.288.75 1.236 1.614 2.004.9.804 1.776 1.056 2.076 1.206.3.15.474.126.654-.078.18-.21.78-.906.99-1.218.21-.312.42-.258.708-.15.288.108 1.836.864 2.154 1.02.318.156.528.234.606.366.078.132.078.762-.198 1.536z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        gridContainer.insertAdjacentHTML("beforeend", cardHTML);
    });
}

// --- FİLTRELEME OLAYLARI ---
function setupCategoryFilters() {
    const pills = document.querySelectorAll(".category-pill");
    pills.forEach(pill => {
        pill.addEventListener("click", () => {
            // Aktif sınıfını düzenle
            pills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            
            // Ürünleri render et
            const selectedCat = pill.getAttribute("data-category");
            renderProducts(selectedCat);
            
            // Kullanıcı tıkladığında ilgili yere yumuşak kaydır
            const catalogSection = document.getElementById("catalog");
            if (catalogSection) {
                const headerOffset = 100;
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

// --- SCROLL ETKİLEŞİMLERİ & BOTTOM NAV TAKİPÇİSİ ---
function setupScrollInteractions() {
    const header = document.getElementById("main-header");
    
    // Header sayfa kaydırıldıkça camlaşır/küçülür
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Sayfa bölümlerini izleyip Alt Menüyü (Bottom Nav) ve Masaüstü Menüyü aktif eden IntersectionObserver
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
        threshold: 0.35 // Ekranın %35'i kaplandığında tetiklenir
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                
                // Aktif sınıfları temizle
                Object.values(navItems).forEach(items => {
                    items.forEach(item => {
                        if (item) item.classList.remove("active");
                    });
                });
                
                // İlgili butonu aktif yap
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

// --- WHATSAPP ASİSTAN PANELİ (OTO MESAJLAR) ---
function toggleWpAssistant() {
    const bubble = document.getElementById("wp-chat-bubble");
    const badge = document.querySelector(".wp-badge-count");
    
    if (bubble) {
        const isOpen = bubble.classList.toggle("open");
        
        // Asistan açıldığında okunmamış mesaj sayısı balonu gizlensin
        if (isOpen && badge) {
            badge.style.display = "none";
        }
    }
}

// Canlı Asistandaki Seçenekler İçin Otomatik Mesaj Gönderme
function sendAutoMessage(msgType) {
    let rawText = "";
    
    switch (msgType) {
        case "buket_fiyat":
            rawText = "Merhaba Lotus Çiçekçilik, web siteniz üzerinden özel bir buket tasarım siparişi veya fiyat teklifi almak istiyorum. Yardımcı olabilir misiniz? 🌸";
            break;
        case "arac_susleme":
            rawText = "Merhaba, düğünümüz için gelin arabası süsleme modelleriniz ve fiyat politikanız hakkında detaylı bilgi alabilir miyiz? 🚗";
            break;
        case "cikolata_kutu":
            rawText = "Merhaba, nişan/söz merasimimiz için özel tasarım süslü çikolata kutuları ve tepsi seçeneklerinizin fotoğraflarını ve fiyatlarını öğrenebilir miyim? 🍫";
            break;
        case "konum_adresi":
            rawText = "Merhaba Lotus Çiçekçilik, dükkanınızı ziyaret etmek istiyorum. Silopi Yenişehir mahallesindeki açık adresinizi veya yol tarifinizi iletebilir misiniz? 📍";
            break;
        default:
            rawText = "Merhaba, bilgi almak istiyorum.";
    }
    
    redirectToWhatsApp(rawText);
}

// --- ÜRÜN KARTINDAN DOĞRUDAN WHATSAPP SİPARİŞİ ---
function orderProduct(title, price) {
    const msg = `Merhaba Lotus Çiçekçilik, web siteniz üzerinden **"${title}"** ürününüzü beğendim. Sipariş oluşturmak ve bilgi almak istiyorum. 🌸\n\n💰 Ürün Fiyatı: ${price}`;
    redirectToWhatsApp(msg);
}

// --- ÖZEL SİPARİŞ MODALI VE FORM YÖNETİMİ ---
function openOrderModal(sourceType) {
    const modal = document.getElementById("order-modal-overlay");
    const formType = document.getElementById("form-item-type");
    
    if (modal) {
        modal.classList.add("open");
        document.body.style.overflow = "hidden"; // Sayfa kaydırmasını engelle
        
        // Sipariş kaynağını kaydet
        if (formType) {
            formType.value = sourceType;
        }
    }
}

function closeOrderModal() {
    const modal = document.getElementById("order-modal-overlay");
    if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = ""; // Kaydırmayı normale döndür
    }
}

// Özel Sipariş Form Gönderimi (Verileri Şık Bir Metne Çevirir)
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById("form-name").value.trim();
    const dateInput = document.getElementById("form-date").value;
    const budget = document.getElementById("form-budget").value;
    const note = document.getElementById("form-note").value.trim();
    const sourceType = document.getElementById("form-item-type").value;
    
    // Tarihi daha okunaklı formata çevirme (Gün-Ay-Yıl)
    let formattedDate = dateInput;
    if (dateInput) {
        const parts = dateInput.split('-');
        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    
    // Mesaj Şablonu Oluşturma
    let text = `✨ **YENİ ÖZEL SİPARİŞ TALEBİ** ✨\n\n`;
    text += `👤 **Müşteri Adı:** ${name}\n`;
    text += `📅 **Teslimat Tarihi:** ${formattedDate}\n`;
    text += `💰 **Bütçe Aralığı:** ${budget}\n`;
    text += `🌸 **Sipariş Türü:** ${sourceType}\n`;
    
    if (note) {
        text += `📝 **Kart Notu / Detaylar:** ${note}\n`;
    }
    
    text += `\n*Bu sipariş talebi Lotus Çiçekçilik web sitesi üzerinden oluşturulmuştur.*`;
    
    // WhatsApp'a Yönlendir ve Modalı Kapat
    redirectToWhatsApp(text);
    closeOrderModal();
    
    // Formu temizle
    document.getElementById("custom-order-form").reset();
    // Tarihi tekrar bugüne ayarla
    const today = new Date().toISOString().split('T')[0];
    document.getElementById("form-date").value = today;
}

// --- UTILITY: WHATSAPP REDIRECT ENGINE (URL ENCODER) ---
function redirectToWhatsApp(text) {
    // Özel karakterleri, emojileri ve satır atlamalarını güvenli şekilde URL'e kodlar
    const encodedText = encodeURIComponent(text);
    
    // Mobil ve Web uyumlu genel WhatsApp linki
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;
    
    // Yeni sekmede yönlendirme gerçekleştirir
    window.open(waUrl, '_blank');
}
