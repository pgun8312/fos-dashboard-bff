const axios = require('axios');
const userServiceUrl = 'http://localhost:8082/api/v1';
const {	StatusCodes} = require('http-status-codes');

const userService = {
    createUser: async (req, res) => {
        try{
            const response = await axios.post(`${userServiceUrl}/users`,req.body);
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
    // not implemented  properly
    getAllUsers: async(req, res) => {
       try{
        const response = await axios.get(`${userServiceUrl}/users`);
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
    getUserById: async(req, res) => {
        try{
            const response = await axios.get(`${userServiceUrl}/users/${req.params.userId}`);
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
    updateUser: async(req, res) => {
        try{
            const response = await axios.put(`${userServiceUrl}/users/${req.params.userId}`, req.body);
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
    deleteUser: async(req, res) => {
        try{
            const response = await axios.delete(`${userServiceUrl}/users/${req.params.userId}`);
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
    createUserProfile: async (req, res) => {
        try{
            const response = await axios.post(`${userServiceUrl}/users/user-profile`,req.body);
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
    getUserProfileById: async(req, res) => {
        try{
            const response = await axios.get(`${userServiceUrl}/users/user-profile/${req.params.userId}`);
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
}

module.exports = userService;