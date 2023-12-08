const axios = require('axios');
const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://10.97.94.32:8080/api/v1';
const {	StatusCodes} = require('http-status-codes');
const productService = {

    createProduct: async(req, res) => {
        try{
            const response = await axios.post(`${productServiceUrl}/products`,req.body);
            res.status(StatusCodes.CREATED).json(response.data);
           }
           catch(error) {
            const status = error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
            const errorMessage = error?.response?.data ?? 'Internal Server Error';
            res.status(status).json({
                error: errorMessage
            })
        }
    },
    getAllProducts: async(req, res) => {
       try{
        const response = await axios.get(`${productServiceUrl}/products`);
        res.status(StatusCodes.OK).json(response.data);
       }
       catch(error) {
        const status = error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
        const errorMessage = error?.response?.data ?? 'Internal Server Error';
        res.status(status).json({
            error: errorMessage
        })
    }
    },
    getProductById: async(req, res) => {
        try{
            const response = await axios.get(`${productServiceUrl}/products/${req.params.productId}`);
            res.status(StatusCodes.OK).json(response.data);
        }
        catch(error) {
            const status = error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
            const errorMessage = error?.response?.data ?? 'Internal Server Error';
            res.status(status).json({
                error: errorMessage
            })
        }
    },
    updateProduct: async(req, res) => {
        try{
            const response = await axios.put(`${productServiceUrl}/products/${req.params.productId}`, req.body);
            res.status(StatusCodes.OK).json(response.data);
        }
        catch(error) {
            const status = error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
            const errorMessage = error?.response?.data ?? 'Internal Server Error';
            res.status(status).json({
                error: errorMessage
            })
        }
    },
    deleteProduct: async(req, res) => {
        try{
            const response = await axios.delete(`${productServiceUrl}/products/${req.params.productId}`);
            res.status(StatusCodes.OK).json(response.data);
        }
        catch(error) {
            const status = error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
            const errorMessage = error?.response?.data ?? 'Internal Server Error';
            res.status(status).json({
                error: errorMessage
            })
        }
    }
}

module.exports = productService;