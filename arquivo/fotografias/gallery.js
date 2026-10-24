// Definição dos álbuns e respetivos ficheiros (caminhos relativos para as pastas)
const galleryData = {
  

    
  "Poole, UK 2017/18": [
  "fotos/LytchettMinster/LM_2017-18_3.jpg",
  "fotos/LytchettMinster/LM_2017-18_4.jpg",
  "fotos/LytchettMinster/LM_2017-18_5.jpg",
  "fotos/LytchettMinster/LM_2017-18_6.jpg",
  "fotos/LytchettMinster/LM_2017-18_7.jpg",
  "fotos/LytchettMinster/LM_2017-18_8.jpg",
  "fotos/LytchettMinster/LM_2017-18_9.jpg",
  "fotos/Poole/Poole_1.jpg",
  "fotos/Poole/Poole_2.jpg",
  "fotos/Poole/Poole_3.jpg",
  "fotos/Poole/Poole_4.jpg",
  "fotos/Poole/Poole_5.jpg",
  "fotos/Poole/UptonPark_1.jpg",
  "fotos/Poole/UptonPark_2.jpg"
 ],
    
  "Londres, UK 2018/19": [
        "fotos/londres/Londres2018_01.jpg",
        "fotos/londres/Londres2018_02.jpg",
        "fotos/londres/Londres2018_03.jpg",
        "fotos/londres/Londres2019_01.jpg",
        "fotos/londres/Londres2019_02.jpg",
        "fotos/londres/Londres2019_03.jpg",
        "fotos/londres/Londres2019_04.jpg",
        "fotos/londres/Londres2019_05.jpg"

    ],
    
  "Candal, Lousã 2025": [
        
        "fotos/Candal/Candal_2.jpg",
        "fotos/Candal/Candal_3.jpg",
        "fotos/Candal/Candal_4.jpg",
        "fotos/Candal/Candal_5.jpg",
        "fotos/Candal/Candal_6.jpg"
    ]
    
};

document.addEventListener("DOMContentLoaded", () => {
    const navContainer = document.getElementById("album-nav");
    const gridContainer = document.getElementById("gallery-grid");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");

    // Função para renderizar as fotos do álbum selecionado
    function renderAlbum(albumName) {
        gridContainer.innerHTML = "";
        const fotos = galleryData[albumName];

        fotos.forEach(src => {
            const item = document.createElement("div");
            item.className = "gallery-item";
            
            const img = document.createElement("img");
            img.src = src;
            img.alt = `Registo fotográfico de ${albumName}`;
            img.loading = "lazy"; // Otimização de desempenho nativa

            // Evento para abrir o lightbox
            img.addEventListener("click", () => {
                lightboxImg.src = src;
                lightbox.removeAttribute("hidden");
            });

            item.appendChild(img);
            gridContainer.appendChild(item);
        });
    }

    // Criar os botões de navegação dinamicamente
    const albumNames = Object.keys(galleryData);
    albumNames.forEach((name, index) => {
        const btn = document.createElement("button");
        btn.className = "album-btn";
        btn.textContent = name;

        if (index === 0) {
            btn.classList.add("active");
            renderAlbum(name);
        }

        btn.addEventListener("click", () => {
            document.querySelectorAll(".album-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderAlbum(name);
        });

        navContainer.appendChild(btn);
    });

    // Fechar Lightbox
    lightboxClose.addEventListener("click", () => lightbox.setAttribute("hidden", "true"));
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.setAttribute("hidden", "true");
    });
});
