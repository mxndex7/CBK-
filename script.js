// Toggle do menu mobile
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', function() {
    navbar.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navbar.classList.remove('active');
        menuToggle.classList.remove('active');
        
        // Adicionar classe active ao link clicado
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Scroll suave para navegar por seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Atualizar link ativo baseado na seção visível
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

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

// Adicionar efeito de entrada aos elementos no carregamento
window.addEventListener('load', function() {
    document.querySelectorAll('.highlight-card, .noticia-card').forEach((el, index) => {
        el.style.opacity = '1';
    });
});

// Lazy loading de imagens (básico)
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23ddd" width="300" height="200"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="16"%3EImagem não disponível%3C/text%3E%3C/svg%3E';
    });
});
