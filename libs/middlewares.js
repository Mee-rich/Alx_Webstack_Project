import express from "express";
import path from "path";
import cors from "cors";

/**
 * Adds middlewares to the given express application.
 * @param {express.Express} api- The express application.
 */
const injectMiddlewares = (api) => {
    api.use(express.json({ limit: '200mb' }));
    api.use(express.static(path.join(__dirname, 'public')));
    api.use(cors());
    api.use(express.urlencoded({ extended: false }));
};


export default injectMiddlewares;