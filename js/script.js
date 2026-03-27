document.addEventListener('DOMContentLoaded', function() {
    console.log("MercorConnect sitesi yüklendi.");

    // Gelecekteki dinamik özellikler için placeholder
    loadFeaturedJobs();
    loadFeaturedProfiles();
    loadSuccessStories();
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Tüm tab içeriklerini gizle
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Tüm tab linklerinden "active" sınıfını kaldır
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Seçilen tab'ı göster ve "active" sınıfını ekle
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.className += " active";
}

// Örnek veri yükleme fonksiyonları
function loadFeaturedJobs() {
    const ilanlarContainer = document.getElementById('ilanlar');
    // Normalde burası bir API'den veri çeker. Şimdilik statik içerik ekleyelim.
    ilanlarContainer.innerHTML = `
        <div class="job-card">
            <h3>Senior ML Engineer</h3>
            <p><strong>Şirket:</strong> YC-backed AI Startup</p>
            <p><strong>Maaş:</strong> $100-150/saat</p>
            <p><strong>Lokasyon:</strong> Remote (Worldwide)</p>
            <a href="#" class="btn btn-secondary">Detaylar</a>
        </div>
        <div class="job-card">
            <h3>AI Research Scientist</h3>
            <p><strong>Şirket:</strong> Innovative AI Lab</p>
            <p><strong>Maaş:</strong> $120-180/saat</p>
            <p><strong>Lokasyon:</strong> Remote (USA/EU)</p>
            <a href="#" class="btn btn-secondary">Detaylar</a>
        </div>
    `;
}

function loadFeaturedProfiles() {
    const profillerContainer = document.getElementById('profiller');
    profillerContainer.innerHTML = `
        <div class="profile-card">
            <h3>Yetenek: ML & CV Uzmanı</h3>
            <p><strong>Deneyim:</strong> 8+ Yıl</p>
            <p><strong>Yetkinlikler:</strong> PyTorch, TensorFlow, OpenCV, LLMs</p>
            <p><strong>Aradığı Pozisyon:</strong> Senior/Lead AI Engineer</p>
            <a href="#" class="btn btn-secondary">Profili İncele</a>
        </div>
    `;
    profillerContainer.style.display = "none"; // Başlangıçta gizli
}

function loadSuccessStories() {
    // Gelecekte slider için içerik eklenecek
}

// yetenekler.html sayfası için iş ilanlarını yükle
if (document.querySelector('.jobs')) {
    loadAllJobs();
}

function loadAllJobs() {
    const jobsContainer = document.querySelector('.jobs');
    // Örnek veriler
    const jobsData = [
        { title: 'Senior ML Engineer', company: 'YC-backed AI Startup', salary: '$100-150/saat', location: 'Remote (Worldwide)' },
        { title: 'AI Research Scientist', company: 'Innovative AI Lab', salary: '$120-180/saat', location: 'Remote (USA/EU)' },
        { title: 'Full Stack Developer (AI Focus)', company: 'TechCorp', salary: '$80-120/saat', location: 'Remote' },
        { title: 'Data Scientist', company: 'Fintech Leader', salary: '$90-140/saat', location: 'Remote (Worldwide)' }
    ];

    let jobsHTML = '<h2>Açık Pozisyonlar</h2>';
    jobsData.forEach(job => {
        jobsHTML += `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p><strong>Şirket:</strong> ${job.company}</p>
                <p><strong>Maaş:</strong> ${job.salary}</p>
                <p><strong>Lokasyon:</strong> ${job.location}</p>
                <a href="#" class="btn btn-secondary">Başvur</a>
            </div>
        `;
    });
    jobsContainer.innerHTML = jobsHTML;
}

// Scroll animasyonları
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    for (let i = 0; i < revealElements.length; i++) {
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150; // elemanın görünür olmaya başlayacağı piksel

        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add("visible");
        } else {
            revealElements[i].classList.remove("visible");
        }
    }
}

window.addEventListener("scroll", revealOnScroll);
// İlk yüklemede de kontrol et
revealOnScroll();
