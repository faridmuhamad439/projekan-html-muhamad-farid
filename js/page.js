function setupPagination(options) {
    const { 
        container, 
        prevButton, 
        nextButton, 
        pageInfo, 
        currentPage, 
        totalItems, 
        itemsPerPage, 
        onPageChange 
    } = options;

    if (!container || !prevButton || !nextButton || !pageInfo) {
        return;
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages > 1) {
        container.style.display = 'flex';
        pageInfo.textContent = `Halaman ${currentPage} dari ${totalPages}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;

        prevButton.onclick = () => {
            if (currentPage > 1) onPageChange(currentPage - 1);
        };
        nextButton.onclick = () => {
            if (currentPage < totalPages) onPageChange(currentPage + 1);
        };
    } else {
        container.style.display = 'none';
    }
}