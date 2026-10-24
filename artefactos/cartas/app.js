/**
 * Ecossistema Digital — paulolopes.org
 * Front-end Core Script (app.js)
 * 
 * Funcionalidades:
 * - Filtro dinâmico do Arquivo de Artefactos (Desenho, Fotografia, Texto)
 * - Lightbox leve para observação de artefactos multimédia
 * - Leitor focado para ensaios/posts dos blogs
 * - Gestão de UI/UX minimalista e acessível
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --- 1. Estado da Aplicação ---
    const state = {
        currentFilter: 'all',
        activeModal: null
    };

    // --- 2. Seletores Principais ---
    const DOM = {
        grid: document.querySelector('[data-js="archive-grid"]'),
        filterBtns: document.querySelectorAll('[data-js="filter-btn"]'),
        modal: document.querySelector('[data-js="lightbox-modal"]'),
        modalContent: document.querySelector('[data-js="lightbox-content"]'),
        modalClose: document.querySelector('[data-js="lightbox-close"]')
    };

    // --- 3. Filtro do Arquivo de Artefactos ---
    const initArchiveFilters = () => {
        if (!DOM.filterBtns.length || !DOM.grid) return;

        DOM.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.filter;
                
                // Atualiza estado dos botões
                DOM.filterBtns.forEach(b => b.classList.remove('is-active'));
                e.currentTarget.classList.add('is-active');

                // Filtra os itens no DOM
                filterItems(category);
            });
        });
    };

    const filterItems = (category) => {
        const items = DOM.grid.querySelectorAll('[data-category]');
        
        items.forEach(item => {
            const itemCategory = item.dataset.category;
            const matches = category === 'all' || itemCategory === category;

            if (matches) {
                item.style.display = 'block';
                requestAnimationFrame(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                });
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300); // Transição CSS sincronizada
            }
        });
    };

    // --- 4. Lightbox para Visualização de Artefactos ---
    const initLightbox = () => {
        if (!DOM.modal) return;

        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-js="open-artifact"]');
            if (!trigger) return;

            e.preventDefault();
            const mediaSrc = trigger.getAttribute('href') || trigger.dataset.src;
            const title = trigger.dataset.title || '';
            const caption = trigger.dataset.caption || '';

            renderLightboxContent(mediaSrc, title, caption);
            openModal();
        });

        if (DOM.modalClose) {
            DOM.modalClose.addEventListener('click', closeModal);
        }

        DOM.modal.addEventListener('click', (e) => {
            if (e.target === DOM.modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && state.activeModal) closeModal();
        });
    };

    const renderLightboxContent = (src, title, caption) => {
        DOM.modalContent.innerHTML = `
            <figure class="artifact-display">
                <img src="${src}" alt="${title}" loading="lazy" />
                <figcaption class="artifact-meta">
                    ${title ? `<h3 class="artifact-title">${title}</h3>` : ''}
                    ${caption ? `<p class="artifact-caption">${caption}</p>` : ''}
                </figcaption>
            </figure>
        `;
    };

    const openModal = () => {
        DOM.modal.classList.add('is-visible');
        DOM.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        state.activeModal = DOM.modal;
    };

    const closeModal = () => {
        if (!state.activeModal) return;
        DOM.modal.classList.remove('is-visible');
        DOM.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        state.activeModal = null;
        setTimeout(() => { DOM.modalContent.innerHTML = ''; }, 300);
    };

    // --- 5. Melhorias de Leitura (Blog Humanidades & Auto-etnográfico) ---
    const initReadingExperience = () => {
        // Indicador simples de progresso de leitura em ensaios longos
        const progressBar = document.querySelector('[data-js="reading-progress"]');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }, { passive: true });
    };

    // --- 6. Inicialização ---
    const init = () => {
        initArchiveFilters();
        initLightbox();
        initReadingExperience();
        console.log('paulolopes.org core app initialized.');
    };

    init();
});
