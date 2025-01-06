import { createProduct } from './productServices.js';
import { renderProducts } from './productList.js';

const form = document.querySelector('[data-form]');
const inputs = {
    name: form.querySelector('[data-name]'),
    price: form.querySelector('[data-price]'),
    image: form.querySelector('[data-image]')
};

const clearForm = () => {
    Object.values(inputs).forEach(input => input.value = '');
};

const validateForm = () => {
    return Object.values(inputs).every(input => input.value.trim() !== '');
};

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateForm()) {
        alert('Por favor, complete todos los campos');
        return;
    }

    const productData = {
        name: inputs.name.value.trim(),
        price: parseFloat(inputs.price.value),
        image: inputs.image.value.trim()
    };

    try {
        await createProduct(productData);
        await renderProducts(); // Actualizar la lista de productos
        clearForm();
    } catch (error) {
        alert('Error al crear el producto');
    }
});

form.addEventListener('reset', clearForm);
