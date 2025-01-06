import { getProducts, deleteProduct } from './productServices.js';

const productsContainer = document.querySelector('[data-products]');

const createProductCard = (product) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-product-id', product.id);

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="card-container--info">
            <p>${product.name}</p>
            <div class="card-container--value">
                <p>$ ${product.price.toFixed(2)}</p>
                <button class="delete-btn" data-delete="${product.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;

    const deleteBtn = card.querySelector(`[data-delete="${product.id}"]`);
    deleteBtn.addEventListener('click', async () => {
        try {
            if (await deleteProduct(product.id)) {
                card.remove();
            }
        } catch (error) {
            alert('Error al eliminar el producto');
        }
    });

    return card;
};

export const renderProducts = async () => {
    try {
        const products = await getProducts();
        productsContainer.innerHTML = '';
        
        if (products.length === 0) {
            productsContainer.innerHTML = '<p class="no-products">No se han agregado productos</p>';
            return;
        }

        products.forEach(product => {
            productsContainer.appendChild(createProductCard(product));
        });
    } catch (error) {
        productsContainer.innerHTML = '<p class="error">Error al cargar los productos</p>';
    }
};

// Iniciar la renderización de productos
document.addEventListener('DOMContentLoaded', renderProducts);
