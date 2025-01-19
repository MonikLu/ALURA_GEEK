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
    console.log('Formulario enviado');

    if (!validateForm()) {
        alert('Por favor, complete todos los campos');
        return;
    }

    const productData = {
        name: inputs.name.value.trim(),
        price: parseFloat(inputs.price.value),
        image: inputs.image.value.trim()
    };
    console.log('Datos del producto a enviar:', productData);

    try {
        const newProduct = await createProduct(productData);
        console.log('Respuesta del servidor:', newProduct);
        
        if (newProduct) {
            alert('Producto agregado exitosamente');
            await renderProducts(); // Actualizar la lista de productos
            clearForm();
        }
    } catch (error) {
        console.error('Error completo:', error);
        alert('Error al crear el producto: ' + error.message);
    }
});

form.addEventListener('reset', clearForm);
