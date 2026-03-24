# CBK - Redesign do Site

## 📋 Visão Geral

Este é um **redesign completo do site da Confederação Brasileira de Karate**, focado em:
- ✅ Design moderno e intuitivo
- ✅ Responsividade total (mobile, tablet, desktop)
- ✅ Paleta de cores baseada no logo da CBK
- ✅ Estrutura semântica HTML5
- ✅ Performance otimizada
- ✅ Accessibility considerada

## 🎨 Paleta de Cores

A paleta foi escolhida baseada no logo e bandeira do Brasil:

- **Verde Primário**: `#1b873f` - Cor principal, poder, tradição
- **Verde Secundário**: `#16a34a` - Variação mais vibrante
- **Amarelo**: `#fcd34d` - Destaque, energia
- **Azul Escuro**: `#1e3a8a` - Confiança, profissionalismo
- **Branco**: `#ffffff` - Limpeza, clareza

## 🏗️ Estrutura do Projeto

```
CBK/
├── index.html          # Página principal com todas as seções
├── styles.css          # Estilos responsivos e moderno
├── script.js           # Interatividades JavaScript
├── img/                # Pasta com imagens
│   ├── logo.png
│   ├── cartaz1.jpg
│   └── c1-c11.jpg      # Imagens de eventos
└── README.md           # Este arquivo
```

## 📑 Seções do Site

1. **Inicial** - Hero section com destaque
2. **Destaques** - Cards com informações rápidas (Calendário, Resultados, Rankings, Faixas Pretas)
3. **Notícias** - Últimas notícias em destaque + grid de notícias recentes
4. **Confederação** - Informações sobre a CBK
5. **Resultados** - Seção com resultados de competições
6. **Área Técnica** - Informações técnicas, árbitros, faixas pretas
7. **Esporte Seguro** - Link para plataforma de segurança
8. **Transparência** - Documentos e prestação de contas
9. **Ouvidoria** - Canal de comunicação com a confederação
10. **Contato** - Formulário de contato + informações

## 🎯 Principais Melhorias em Relação ao Design Anterior

### Antes (Design Antigo)
- ❌ Layout confuso e desorganizado
- ❌ Falta de hierarquia visual clara
- ❌ Cores inconsistentes
- ❌ Não responsivo para mobile
- ❌ Muitos elementos espalhados sem organização

### Depois (Novo Design)
- ✅ Layout limpo e organizado
- ✅ Hierarquia visual clara com tipografia e cores
- ✅ Paleta consistente baseada no logo
- ✅ 100% responsivo
- ✅ Grid layouts modernos
- ✅ Animações suaves
- ✅ Navegação intuitiva
- ✅ Melhor experiência do usuário

## 🚀 Funcionalidades JavaScript

1. **Menu Mobile** - Toggle responsivo do menu para telas pequenas
2. **Scroll Suave** - Navegação suave entre seções
3. **Link Ativo** - Indica qual seção está visível
4. **Fade In Animations** - Elementos aparecem ao fazer scroll
5. **Formulário Interativo** - Feedback visual ao enviar contato
6. **Lazy Loading** - Fallback para imagens que não carregam

## 📱 Responsividade

O site foi otimizado para:
- **Desktop**: Layout com múltiplas colunas
- **Tablet**: Layout em 2 colunas com ajustes
- **Mobile**: Layout single column com menu responsivo

Breakpoints:
- `768px` - Tablet
- `480px` - Mobile

## 🔧 Como Usar

1. **Salvar os arquivos** na mesma pasta:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `img/` (pasta com imagens)

2. **Abrir no navegador**:
   ```
   Duplo clique em index.html
   ```

3. **Personalizar**:
   - Mudar cores em `styles.css` nas variáveis CSS
   - Adicionar conteúdo novos em seções do `index.html`
   - Modificar scripts em `script.js`

## 🎨 Customização de Cores

Todas as cores estão definidas no topo do `styles.css` como variáveis CSS:

```css
:root {
    --primary-green: #1b873f;
    --primary-yellow: #fcd34d;
    --primary-blue: #1e3a8a;
    /* ... mais cores ... */
}
```

Para mudar a paleta inteira, basta editar essas variáveis.

## ⚡ Performance

- Minificação recomendada para produção
- Otimização de imagens (usar formatos como WebP)
- Cache do navegador configurável
- CSS e JavaScript separados para melhor carregamento

## 🔐 SEO

- Estrutura HTML semântica (`<section>`, `<article>`, `<header>`, `<footer>`)
- Meta tags descritivas
- Hierarquia de headings propr (`<h1>` → `<h2>` → `<h3>`)
- URLs amigáveis com âncoras

## ♿ Accessibility

- Cores com contraste adequado
- Navegação por teclado suportada
- Alt text em todas as imagens
- Semântica HTML apropriada

## 📝 Notas

- O formulário de contato é simulado (feedback visual apenas)
- Para implementar backend, substituir o event listener do formulário
- As imagens estão em `/img/`, ajustar paths se necessário

## 🎯 Próximos Passos Sugeridos

1. Adicionar backend para o formulário de contato
2. Integrar API de resultados em live
3. Implementar CMS para notícias
4. Adicionar busca de conteúdo
5. Integração com redes sociais em tempo real
6. Dark mode
7. Multilíngue (EN, ES)

---

**Desenvolvido com ❤️ para a CBK**
