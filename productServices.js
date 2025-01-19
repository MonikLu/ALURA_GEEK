const API_URL = 'https://my-json-server.typicode.com/MonikLu/ALURA_GEEK';

// GET - Obtener todos los productos
export const getProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/products`);
        return await response.json();
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

// POST - Crear nuevo producto
export const createProduct = async (productData) => {
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Error response:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Producto creado:', data);
        return data;

    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    }
};

// DELETE - Eliminar producto
export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return true;

    } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error;
    }
};
