export const createModal = () => {
    const modalOverflow = document.createElement('div');
    const modalContent = document.createElement('div');
    const closeBtn = document.createElement('button');
    const modalBody = document.createElement('div');
    modalOverflow.classList.add('modal-overflow');
    modalContent.classList.add('modal-content');
    closeBtn.classList.add('modal-close');
    closeBtn.setAttribute('aria-label', 'Закрыть');
    modalBody.classList.add('modal-body');

    modalOverflow.append(modalContent);
    modalContent.append(closeBtn, modalBody);
    modalOverflow.addEventListener('click', (e) => {
        const closeBtn = e.target.closest('.modal-close');

        if (closeBtn || e.target === modalOverflow) {
            closeModal();
        };

    });

    const handleEscape = (event) => {
        if(event.key === 'Escape') {
            closeModal();
        }
    };

    const openModal = () => {
        document.body.append(modalOverflow);
        modalOverflow.classList.add('active');
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modalOverflow.classList.remove('active');
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
    };

    const setContent = (content) => {
        modalBody.replaceChildren(content);
    };

    return {openModal, closeModal, setContent};
}