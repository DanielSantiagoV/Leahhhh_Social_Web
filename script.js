// Configuración del sitio
const config = {
    site_name: "Leahhh",
    favicon: "favicon.png",
    logo: "logo.gif",
    username: "Leahhh",
    by: "Unknown v1.1",
    tagline: "fuck love - save money Stuff!!!",
    tagline2: "fuckuuuuuuuu - assssss",
    background_videos: [
      "background.mp4",
      "assets/background2.mp4",
    ],
    icons_folder: "assets/icons/",
    music_files: [
      "assets/music/SpotiMate.io - GBP _feat. 21 Savage_ - Central Cee.mp3",
      "assets/music/letoa.mp3",
      "assets/music/SleepMode.mp3",
      "assets/music/Booter Bee - Phone Call.mp3",
      "assets/music/deathbed.mp3"
    ],
    links: [
      { name: "GitHub", icon: "github.png", url: "https://github.com/DanielSantiagoV" },
      { name: "Steam", icon: "steam.png", url: "https://steamcommunity.com/profiles/76561199593430948" },
      { name: "Discord", icon: "discord.png", url: "https://discord.com/users/853723630218117120" },
      { name: "LTC", icon: "ltc.png", url: "" },
      { name: "Spotify", icon: "spotify.png", url: "https://open.spotify.com/user/ymu7xcl3jp0p8cfbl8xlnjzr3?si=482f88af8b364f3d" },
      { name: "Try Hack Me", icon: "tryhackme.png", url: "https://tryhackme.com/p/DanielSantiagoV" }
    ]
  };
  
  // Variables globales para el sistema de videos
  let currentVideoIndex = 0;
  let backgroundVideo = null;
  
  // Inicialización del cursor personalizado
  function initCursor() {
    const cursor = document.getElementById("cursor");
    cursor.style.left = window.innerWidth / 2 + "px";
    cursor.style.top = window.innerHeight / 2 + "px";
    
    document.addEventListener("mousemove", e => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
  }
  
  // Efecto de escritura/borrado en el título del sitio
  function initSiteTitleEffect() {
    const siteTitle = document.getElementById("site-title");
    const fullText = config.site_name;
    const eraseUpToChar = fullText[0];
    const eraseIndex = fullText.indexOf(eraseUpToChar) + 1;
    let step = 0, phase = "typing", displayText = "";
    
    function typeEraseLoop() {
      if (phase === "typing") {
        step++;
        if (step > fullText.length) {
          phase = "erasing";
          step = fullText.length;
        }
      } else if (phase === "erasing") {
        step--;
        if (step < eraseIndex) {
          phase = "typingFromErase";
          step = eraseIndex;
        }
      } else if (phase === "typingFromErase") {
        step++;
        if (step > fullText.length) {
          phase = "erasing";
          step = fullText.length;
        }
      }
      displayText = fullText.slice(0, step);
      siteTitle.textContent = displayText;
      setTimeout(typeEraseLoop, 180);
    }
    
    typeEraseLoop();
  }
  
  // Efecto de escritura en el preloader
  function initPreloaderTyping() {
    const preloaderText = document.getElementById("preloader-text");
    let preloaderMsg = "Click to Enter!";
    let preloaderIdx = 0, preloaderDir = 1;
    
    setInterval(() => {
      if (preloaderDir === 1) {
        preloaderIdx++;
        if (preloaderIdx > preloaderMsg.length) preloaderDir = -1;
      } else {
        preloaderIdx--;
        if (preloaderIdx === 0) preloaderDir = 1;
      }
      preloaderText.textContent = preloaderMsg.slice(0, preloaderIdx);
    }, 100);
  }
  
  // Efecto de nieve
  function createSnow(containerId, speed = 1, zigzag = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    setInterval(() => {
      if (!document.body.contains(container)) return;
      
      let flake = document.createElement("div");
      flake.className = "snowflake";
      flake.textContent = "❄";
      flake.style.left = Math.random() * 100 + "vw";
      flake.style.fontSize = 14 + Math.random() * 10 + "px";
      flake.style.opacity = 0.7 + Math.random() * 0.3;
      
      if (zigzag) {
        flake.style.setProperty("--zigzag", (Math.random() > 0.5 ? 1 : -1) * 80 + "px");
      }
      
      container.appendChild(flake);
      setTimeout(() => {
        if (container.contains(flake)) container.removeChild(flake);
      }, 13000 / speed);
    }, 600 / speed);
  }
  
  // Inicializar preloader
  function initPreloader() {
    createSnow("preloader-snow", 0.7, true);
    
    document.getElementById("preloader").addEventListener("click", () => {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("mainContent").style.display = "block";
      startMainFeatures();
    });
  }
  
  // Funciones principales del sitio
  function startMainFeatures() {
    // Sistema de videos de fondo múltiples
    initBackgroundVideoSystem();
  
    // Usuario y línea de autor
    setUsernameText(config.username);
    document.getElementById("byline").textContent = config.by;
    startSparkles();
  
    // Efecto de escritura en tagline
    initTaglineTyping();
  
    // Enlaces sociales
    createSocialLinks();
  
    // Nieve principal
    createSnow("main-snow", 0.5, true);
  
    // Rastro de nieve del cursor
    initCursorSnowTrail();
  
    // Efecto 3D tilt
    initTiltEffect();
  
    // Reproductor de música
    startMusicPlayer();
  }
  
  // Sistema de videos de fondo múltiples
  function initBackgroundVideoSystem() {
    backgroundVideo = document.getElementById("bgVideo");
    
    if (!backgroundVideo) {
      console.warn("Elemento de video no encontrado");
      return;
    }
  
    // Configurar el primer video
    loadNextVideo();
    
    // Escuchar el evento 'ended' para cambiar automáticamente al siguiente video
    backgroundVideo.addEventListener('ended', () => {
      currentVideoIndex = (currentVideoIndex + 1) % config.background_videos.length;
      loadNextVideo();
    });
  
    // Escuchar errores de carga de video
    backgroundVideo.addEventListener('error', (e) => {
      console.warn(`Error cargando video: ${config.background_videos[currentVideoIndex]}`, e);
      // Intentar con el siguiente video
      currentVideoIndex = (currentVideoIndex + 1) % config.background_videos.length;
      loadNextVideo();
    });
  }
  
  // Cargar el siguiente video en la secuencia
  function loadNextVideo() {
    if (!backgroundVideo || !config.background_videos.length) return;
    
    const videoPath = config.background_videos[currentVideoIndex];
    
    // Verificar si el archivo existe antes de cargarlo
    fetch(videoPath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          // El archivo existe, cargarlo
          backgroundVideo.src = videoPath;
          backgroundVideo.load();
          backgroundVideo.play().catch(e => {
            console.warn("Error reproduciendo video:", e);
          });
        } else {
          // El archivo no existe, saltar al siguiente
          console.warn(`Video no encontrado: ${videoPath}`);
          currentVideoIndex = (currentVideoIndex + 1) % config.background_videos.length;
          loadNextVideo();
        }
      })
      .catch(error => {
        console.warn(`Error verificando video: ${videoPath}`, error);
        // En caso de error de red, intentar con el siguiente
        currentVideoIndex = (currentVideoIndex + 1) % config.background_videos.length;
        loadNextVideo();
      });
  }
  
  // Función para cambiar manualmente al siguiente video
  function nextBackgroundVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % config.background_videos.length;
    loadNextVideo();
  }
  
  // Función para cambiar manualmente al video anterior
  function prevBackgroundVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + config.background_videos.length) % config.background_videos.length;
    loadNextVideo();
  }
  
  // Función para obtener el nombre del video actual
  function getCurrentVideoName() {
    if (!config.background_videos.length) return "No videos";
    const path = config.background_videos[currentVideoIndex];
    return path.split('/').pop().replace('.mp4', '');
  }
  
  // Efecto de escritura en tagline
  function initTaglineTyping() {
    const tagline = config.tagline;
    const tagline2 = config.tagline2;
    let tagIdx = 0, tagDir = 1;
    let tag2Idx = 0, tag2Dir = 1;
    
    function tagTick() {
      document.getElementById("tagline").textContent = tagline.slice(0, tagIdx);
      if (tagDir === 1) {
        tagIdx++;
        if (tagIdx > tagline.length) tagDir = -1;
      } else {
        tagIdx--;
        if (tagIdx < 0) tagDir = 1;
      }
      setTimeout(tagTick, 90);
    }
    
    function tag2Tick() {
      document.getElementById("tagline2").textContent = tagline2.slice(0, tag2Idx);
      if (tag2Dir === 1) {
        tag2Idx++;
        if (tag2Idx > tagline2.length) tag2Dir = -1;
      } else {
        tag2Idx--;
        if (tag2Idx < 0) tag2Dir = 1;
      }
      setTimeout(tag2Tick, 120); // Un poco más lento que la primera
    }
    
    tagTick();
    tag2Tick();
  }
  
  // Crear enlaces sociales
  function createSocialLinks() {
    const grid = document.querySelector(".link-grid");
    grid.innerHTML = "";
    
    config.links.forEach(link => {
      let a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      
      let img = document.createElement("img");
      img.src = config.icons_folder + link.icon;
      img.alt = link.name;
      a.appendChild(img);
      
      let span = document.createElement("span");
      span.textContent = link.name;
      a.appendChild(span);
      
      grid.appendChild(a);
    });
  }
  
  // Rastro de nieve del cursor
  function initCursorSnowTrail() {
    document.addEventListener("mousemove", e => {
      let flake = document.createElement("div");
      flake.className = "snowflake";
      flake.textContent = "❄";
      flake.style.left = e.clientX + (Math.random() * 8 - 4) + "px";
      flake.style.top = e.clientY + (Math.random() * 8 - 4) + "px";
      flake.style.fontSize = 10 + Math.random() * 8 + "px";
      flake.style.opacity = 0.7 + Math.random() * 0.3;
      
      document.body.appendChild(flake);
      setTimeout(() => {
        if (document.body.contains(flake)) document.body.removeChild(flake);
      }, 1800);
    });
  }
  
  // Efecto 3D tilt
  function initTiltEffect() {
    if (window.VanillaTilt && document.querySelector(".tilt")) {
      VanillaTilt.init(document.querySelector(".tilt"), {
        max: 10,
        speed: 800,
        glare: false,
        scale: 1.02,
      });
    }
  }
  
  // Efecto de chispas en el nombre de usuario
  function startSparkles() {
    const container = document.getElementById("sparkle-container");
    if (!container) return;
    
    function createSparkle() {
      if (!container || !document.body.contains(container)) return;
      
      const sparkle = document.createElement("span");
      sparkle.textContent = "✦";
      sparkle.style.position = "absolute";
      sparkle.style.left = Math.random() * 100 + "%";
      sparkle.style.top = Math.random() * 100 + "%";
      sparkle.style.fontSize = 6 + Math.random() * 6 + "px";
      sparkle.style.opacity = 0.7 + Math.random() * 0.3;
      sparkle.style.color = "#fff";
      sparkle.style.pointerEvents = "none";
      sparkle.style.textShadow = "0 0 6px #fff, 0 0 3px #fff";
      
      sparkle.animate(
        [
          { transform: "translate(0, 0)" },
          { transform: `translate(${(Math.random() - 0.5) * 10}px, ${(Math.random() - 0.5) * 10}px)` },
          { transform: "translate(0, 0)" }
        ],
        {
          duration: 3000 + Math.random() * 2000,
          iterations: Infinity,
        }
      );
      
      container.appendChild(sparkle);
      setTimeout(() => {
        if (container.contains(sparkle)) container.removeChild(sparkle);
      }, 3000 + Math.random() * 2000);
    }
    
    setInterval(createSparkle, 400);
  }
  
  // Reproductor de música
  function startMusicPlayer() {
    const audio = document.getElementById("audio-player");
    const musicFiles = config.music_files;
    let idx = Math.floor(Math.random() * musicFiles.length);
  
    function playNext() {
      audio.src = musicFiles[idx];
      audio.play().catch(() => {});
      idx = (idx + 1) % musicFiles.length;
    }
  
    audio.addEventListener("ended", playNext);
    playNext();
  }
  
  // Inicialización cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    initCursor();
    initSiteTitleEffect();
    initPreloaderTyping();
    initPreloader();
  });
  
  // Función para establecer el nombre de usuario
  function setUsernameText(username) {
    const usernameText = document.getElementById('username-text');
    if (usernameText) {
      usernameText.textContent = username;
      // Asegurar que mantiene la clase glass-animated
      if (!usernameText.classList.contains('glass-animated')) {
        usernameText.classList.add('glass-animated');
      }
    }
  }
  
  // Efecto parallax en el banner
  document.addEventListener('mousemove', function(e) {
    const banner = document.querySelector('.profile-banner-inside img');
    if (!banner) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;
    banner.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
    banner.style.transition = 'transform 0.3s cubic-bezier(.4,1.4,.7,1)';
  });
  window.addEventListener('scroll', function() {
    const banner = document.querySelector('.profile-banner-inside img');
    if (!banner) return;
    const y = window.scrollY * 0.08;
    banner.style.transform = `translateY(${y}px) scale(1.04)`;
  });
  
  // Selector de tema (oscuro/claro)
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const root = document.documentElement;
  const THEME_KEY = 'portfolio_theme';
  
  const themes = {
    dark: {
      '--main-black': '#101010',
      '--main-white': '#fff',
      '--main-purple': '#a259f7',
      '--main-bg-gradient': 'linear-gradient(120deg, #101010 0%, #3a1c71 100%)',
    },
    light: {
      '--main-black': '#f7f7fa',
      '--main-white': '#222',
      '--main-purple': '#a259f7',
      '--main-bg-gradient': 'linear-gradient(120deg, #fff 0%, #e0d6f7 100%)',
    }
  };
  
  function setTheme(theme) {
    Object.entries(themes[theme]).forEach(([k, v]) => root.style.setProperty(k, v));
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    themeIcon.innerHTML = theme === 'dark'
      ? '<circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07-1.41-1.41M6.34 6.34 4.93 4.93m12.02 0-1.41 1.41M6.34 17.66l-1.41 1.41"/>'
      : '<circle cx="12" cy="12" r="5"/><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>';
  }
  
  function toggleTheme() {
    const current = document.body.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }
  
  themeBtn.addEventListener('click', toggleTheme);
  // Inicializar tema
  setTheme(localStorage.getItem(THEME_KEY) || 'dark');
  
  // Botón de copiar usuario de Discord
  const discordUser = 'daniel_santiagov'; // Cambia esto por tu usuario real
  const discordCopyFeedback = document.getElementById('discord-copy-feedback');
  document.querySelectorAll('.link-grid a').forEach(a => {
    if (a.href.includes('discord.com')) {
      // Agregar botón copiar
      const copyBtn = document.createElement('button');
      copyBtn.textContent = '📋';
      copyBtn.title = 'Copiar usuario Discord';
      copyBtn.style.marginLeft = '6px';
      copyBtn.style.background = 'transparent';
      copyBtn.style.border = 'none';
      copyBtn.style.cursor = 'pointer';
      copyBtn.style.fontSize = '1.1em';
      copyBtn.style.color = 'var(--main-purple, #a259f7)';
      copyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        navigator.clipboard.writeText(discordUser);
        discordCopyFeedback.style.display = 'block';
        setTimeout(() => discordCopyFeedback.style.display = 'none', 1200);
      });
      a.appendChild(copyBtn);
    }
  });
  
  // Reproductor de música personalizado
  const customAudioInput = document.getElementById('custom-audio-input');
  const customAudio = document.getElementById('custom-audio');
  if (customAudioInput && customAudio) {
    customAudioInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file);
        customAudio.src = url;
        customAudio.style.display = 'block';
        customAudio.play();
      } else {
        customAudio.style.display = 'none';
        customAudio.src = '';
      }
    });
  }
  
  // Playlist de canciones
  const songs = [
    {
      id: 1,
      title: "Ginseng Strip",
      artist: "Yung Lean - Crafted with ❤️ by @daaaaaniel",
      album: "Crafted with ❤️ by @daaaaaniel",
      albumArtUrl: "https://media.discordapp.net/attachments/1199096079707295836/1386537697023099010/WhatsApp_Image_2025-06-23_at_04.39.58.jpeg?ex=685aba1b&is=6859689b&hm=a6a881598a9a71264923cc3c5523a24a0b9f32de53a463e5a3ebcf0ec26c292c&=&format=webp",
      audioSrc: "assets/music/Ginseng Strip.mp3"
    }
  ];
  let currentSong = 0;
  
  const musicAudio = document.getElementById('music-audio');
  const musicPlay = document.getElementById('music-play');
  const musicPrev = document.getElementById('music-prev');
  const musicNext = document.getElementById('music-next');
  const musicProgress = document.getElementById('music-progress');
  const musicCurrent = document.getElementById('music-current');
  const musicDuration = document.getElementById('music-duration');
  const musicTitle = document.getElementById('music-title');
  const musicArtist = document.getElementById('music-artist');
  const musicCover = document.getElementById('music-cover-img');
  
  function loadSong(idx) {
    const song = songs[idx];
    musicTitle.textContent = song.title;
    musicArtist.textContent = song.artist;
    musicCover.src = song.albumArtUrl;
    musicAudio.src = song.audioSrc;
    musicAudio.load();
    musicPlay.textContent = '▶️';
    musicProgress.value = 0;
    musicCurrent.textContent = '0:00';
    musicDuration.textContent = '0:00';
  }
  
  function playSong() {
    musicAudio.play();
    musicPlay.textContent = '⏸️';
  }
  function pauseSong() {
    musicAudio.pause();
    musicPlay.textContent = '▶️';
  }
  
  const audioPlayerBg = document.getElementById('audio-player');
  const musicPlayIcon = document.getElementById('music-play-icon');
  const playIcon = '<polygon points="8 5 20 12 8 19 8 5" fill="#fff"/>';
  const pauseIcon = '<rect x="7" y="5" width="4" height="14" rx="1" fill="#fff"/><rect x="13" y="5" width="4" height="14" rx="1" fill="#fff"/>';
  
  function updatePlayPauseIcon(isPlaying) {
    if (musicPlayIcon) {
      musicPlayIcon.innerHTML = isPlaying ? pauseIcon : playIcon;
    }
  }
  
  // Inicializar el icono de play al cargar
  updatePlayPauseIcon(false);
  
  if (musicAudio) {
    musicAudio.addEventListener('play', () => {
      updatePlayPauseIcon(true);
      if (audioPlayerBg && !audioPlayerBg.paused) {
        audioPlayerBg.pause();
      }
    });
    musicAudio.addEventListener('pause', () => {
      updatePlayPauseIcon(false);
    });
  }
  
  if (musicAudio && musicPlay && musicProgress && musicCurrent && musicDuration && musicPrev && musicNext) {
    loadSong(currentSong);
    musicAudio.addEventListener('loadedmetadata', () => {
      musicDuration.textContent = formatTime(musicAudio.duration);
      musicProgress.max = Math.floor(musicAudio.duration);
    });
    musicAudio.addEventListener('timeupdate', () => {
      musicCurrent.textContent = formatTime(musicAudio.currentTime);
      musicProgress.value = Math.floor(musicAudio.currentTime);
    });
    musicProgress.addEventListener('input', () => {
      musicAudio.currentTime = musicProgress.value;
    });
    musicPlay.addEventListener('click', () => {
      if (musicAudio.paused) {
        playSong();
      } else {
        pauseSong();
      }
    });
    musicAudio.addEventListener('ended', () => {
      nextSong();
    });
    musicPrev.addEventListener('click', () => {
      prevSong();
    });
    musicNext.addEventListener('click', () => {
      nextSong();
    });
  }
  
  function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playSong();
  }
  function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    playSong();
  }
  
  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
  
  const musicCard = document.getElementById('music-card');
  if (musicAudio && musicCard) {
    musicAudio.addEventListener('play', () => {
      musicCard.classList.add('playing');
    });
    musicAudio.addEventListener('pause', () => {
      musicCard.classList.remove('playing');
    });
    musicAudio.addEventListener('ended', () => {
      musicCard.classList.remove('playing');
    });
  } 