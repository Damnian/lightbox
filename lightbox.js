window.addEventListener('load', function() {

// pobranie anchorów, które mają atrybut data-lightbox
  function getAnchors() {
    const anchors = document.querySelectorAll('a[data-lightbox]');
    const anchorsArr = [];
/* tworzę pustą tablicę, po czym robię pętlę po pobranych anchorach
żeby sprawdzić, czy nie ma pustego atrybutu, jeśli jest pusty to nie
pushuję go do tablicy. 
Ogólnie jest to chyba ominięcie problemu, którym jest nie znaleziony
selektor, wybierający OD RAZU anchory z niepustym atrybutem data-lightbox*/
    for (var i = 0; i < anchors.length; i++) {
      if (anchors[i].getAttribute('data-lightbox')!='' && anchors[i].getAttribute('data-lightbox')!= null) {
        anchorsArr.push(anchors[i]);
      }
    }
    return anchorsArr;
  }

/* tutaj robię pętlę po w/w tablicy, żeby jej elementom nadać listener "click".
Powinienem chyba raczej zastosować forEach(?). Ogólnie próbowałem zrobić
event delegation na body dla ev.target.nodeName==='A' (z atrybutem), ale nie wiem
dlaczego event nie działał dla "A"... (a np. dla "IMG" działał)
*/
  function addClick(a) {
    for (var i = 0; i < a.length; i++) {
      a[i].addEventListener('click', click, false);
/*
Zastanawiam się czy funkcja addClick(a) nie powinna zwracać zmiennych:
imageSource, imageTitle, imageAlt: https://stackoverflow.com/questions/2917175/return-multiple-values-in-javascript 
zawartych w funkcji click(ev) a poniższe funkcje budujące/dopasowujące/usuwające czy nie powinny być wywoływane
na samym końcu niniejszego dokumentu...
Ale chyba "zagnieździłem" się listenerem "click" i na razie nie wiem jak się
stąd "wydostać na zewnątrz".
*/
    }
  return;
  }

  function click(ev) {
    ev.preventDefault();
    const imageSource = this.getAttribute('href'),
          imageTitle = this.getAttribute('data-title'),
          miniImage = this.querySelector('img'),
          imageAlt = miniImage.getAttribute('alt'),
          dataLightbox = this.getAttribute('data-lightbox');

    return {
      imageSource: imageSource,
      imageTitle: imageTitle,
      imageAlt: imageAlt,
      dataLightbox: dataLightbox
    };
  }

  function createLightbox(a, b, c) {
    const lightbox = document.createElement('div');
    document.body.appendChild(lightbox).classList.add('lightbox');

    if (b != null) {
      b
    } else {
        b = 'Bez tytułu';
      }

    lightbox.innerHTML = 
      '<div class="lightbox__overlay">' +
        '<div class="lightbox__content-wrapper">' +
          '<img class="lightbox__photo" src="' + a + '" alt="' + c + '">' +
          '<p class="lightbox__title">' +
            b + 
          '</p>' +
          '<button class="lightbox__close-btn">X</button>' +
        '</div>' +
      '</div>';

    return lightbox;
  }

  function matchLightboxSize(a) {
    const lightboxPhoto = a.querySelector('.lightbox__photo'),
          lightboxTitle = a.querySelector('.lightbox__title')
          windowHeight = window.innerHeight,
          windowWidth = window.innerWidth;

    if (windowWidth < 480) {
      lightboxPhoto.style.maxWidth = windowWidth - 25 +'px';
    } else if (windowWidth > 480 && windowWidth < 720) {
      lightboxPhoto.style.maxWidth = windowWidth - 50 +'px';
    } else {
      lightboxPhoto.style.maxWidth = windowWidth - 100 +'px';
    }

    lightboxPhoto.style.maxHeight = windowHeight - 100 +'px';
    lightboxTitle.style.width = lightboxPhoto.clientWidth + 'px';
    return;
  }

  function closeLightbox(a) {
    const closeBtn = a.querySelector('.lightbox__close-btn');

    closeBtn.addEventListener('click', function() {
      document.body.removeChild(a);
    }, false);
    return;
  }


//wywoływanie
  const anchorsArr = getAnchors();
// ???????????
  addClick(anchorsArr);


//  const lightbox = createLightbox(imageSource, imageTitle, imageAlt);
//  matchLightboxSize(lightbox);
//  closeLightbox(lightbox);

}, false);

