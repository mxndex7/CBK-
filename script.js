// Toggle do menu mobile
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        navbar.classList.toggle('active');
        menuToggle.classList.toggle('active');
        this.setAttribute('aria-expanded', (!expanded).toString());
    });

    // Fechar menu com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.focus();
        }
    });
}

// Fechar menu ao clicar em um link e marcar active
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (navbar) navbar.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }

        // Adicionar classe active ao link clicado
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Scroll suave para navegar por seções (inclui skip-link)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // foco para acessibilidade
            target.setAttribute('tabindex', '-1');
            target.focus({preventScroll: true});
        }
    });
});

// Atualizar link ativo baseado na seção visível
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            const sectionId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Efeito de fadeIn para elementos ao scrollar
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observer a cards
document.querySelectorAll('.highlight-card, .noticia-card, .info-section').forEach(el => {
    observer.observe(el);
});

// Formulário de contato (simulado)
const form = document.querySelector('.contato-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simular envio
        const button = form.querySelector('button');
        const originalText = button.textContent;

        button.textContent = 'Mensagem enviada!';
        button.style.background = 'var(--primary-yellow)';
        button.style.color = 'var(--primary-blue)';

        // Limpar formulário
        form.reset();

        // Resetar botão após 3 segundos
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 3000);
    });
}

// Adicionar efeito de entrada aos elementos no carregamento e ativar lazy loading
window.addEventListener('load', function() {
    document.querySelectorAll('.highlight-card, .noticia-card').forEach((el, index) => {
        el.style.opacity = '1';
    });

    // Habilitar lazy loading para navegadores que suportam
    document.querySelectorAll('img').forEach(img => {
        try { img.loading = 'lazy'; } catch (e) {}
    });
});

// Tratar erro de carregamento de imagens
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23ddd" width="300" height="200"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="16"%3EImagem não disponível%3C/text%3E%3C/svg%3E';
    });
});

// Balão de notícia: abre um balão com informações da notícia ao clicar no card
(function() {
    const balloon = document.getElementById('newsBalloon');
    if (!balloon) return;

    let openCard = null;
    let docClickHandler = null;
    let keydownHandler = null;
    let resizeHandler = null;
    let scrollHandler = null;

    function buildBalloonContent(htmlContent) {
        return `
            <button class="news-balloon-close close-btn" aria-label="Fechar balao">×</button>
            <div class="news-balloon-body">${htmlContent}</div>
        `;
    }

    function positionBalloon(card) {
        if (!card) return;
        const rect = card.getBoundingClientRect();

        // Temporariamente garantir que o balão esteja visível para medir
        balloon.style.left = '0px';
        balloon.style.top = '0px';
        balloon.classList.add('show');
        // forçar reflow para obter dimensões corretas
        const bRect = balloon.getBoundingClientRect();

        // Calcular posição horizontal centralizada em relação ao card
        let left = rect.left + (rect.width / 2) - (bRect.width / 2) + window.scrollX;
        const viewportWidth = document.documentElement.clientWidth;
        left = Math.max(8 + window.scrollX, Math.min(left, viewportWidth - bRect.width - 8 + window.scrollX));

        // Preferir posicionar acima; se não couber, posicionar abaixo
        let top = rect.top + window.scrollY - bRect.height - 12;
        if (top < window.scrollY + 8) {
            top = rect.top + window.scrollY + rect.height + 12;
            balloon.classList.add('below');
        } else {
            balloon.classList.remove('below');
        }

        balloon.style.left = `${left}px`;
        balloon.style.top = `${top}px`;
    }

    function openBalloon(card) {
        if (!card) return;
        const details = card.querySelector('.noticia-details');
        let content = '';
        if (details) {
            content = details.innerHTML;
        } else {
            const titleEl = card.querySelector('h3, h4');
            const title = titleEl ? titleEl.innerText : '';
            const date = (card.querySelector('.noticia-data') || {}).innerText || '';
            const img = card.querySelector('img') ? card.querySelector('img').src : '';
            const desc = (card.querySelector('.noticia-content p') || {}).innerText || '';
            content = `<h3>${title}</h3><p class="noticia-data">${date}</p>${img ? `<img src="${img}" alt="">` : ''}<p>${desc}</p>`;
        }

        balloon.innerHTML = buildBalloonContent(content);
        balloon.setAttribute('aria-hidden', 'false');
        positionBalloon(card);
        openCard = card;

        // foco no botão fechar
        const closeBtn = balloon.querySelector('.close-btn');
        if (closeBtn) closeBtn.focus();

        // Handlers para fechar quando clicar fora ou pressionar ESC
        docClickHandler = function(e) {
            if (!balloon.contains(e.target) && !openCard.contains(e.target)) {
                closeBalloon();
            }
        };
        keydownHandler = function(e) {
            if (e.key === 'Escape') closeBalloon();
        };
        resizeHandler = function() {
            positionBalloon(openCard);
        };
        scrollHandler = function() {
            positionBalloon(openCard);
        };

        setTimeout(() => {
            document.addEventListener('click', docClickHandler);
            document.addEventListener('keydown', keydownHandler);
            window.addEventListener('resize', resizeHandler);
            window.addEventListener('scroll', scrollHandler, true);
        }, 0);

        // botão fechar
        balloon.querySelector('.close-btn')?.addEventListener('click', function() {
            closeBalloon();
        });
    }

    function closeBalloon() {
        balloon.classList.remove('show');
        balloon.classList.remove('below');
        balloon.setAttribute('aria-hidden', 'true');
        balloon.innerHTML = '';
        openCard = null;
        document.removeEventListener('click', docClickHandler);
        document.removeEventListener('keydown', keydownHandler);
        window.removeEventListener('resize', resizeHandler);
        window.removeEventListener('scroll', scrollHandler, true);
        docClickHandler = null;
        keydownHandler = null;
        resizeHandler = null;
        scrollHandler = null;
    }

    // Anexar comportamento aos cards de notícia
    document.querySelectorAll('.noticia-card').forEach(card => {
        // garantir focável
        if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');

        card.addEventListener('click', function(e) {
            // permitir navegação via links normalmente
            if (e.target.closest('a')) return;
            openBalloon(card);
        });

        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openBalloon(card);
            }
        });
    });
})();
