import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        info: { // general title of documentation
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Doc for Products'
        },
        tags: [ // diferents end points to describe
            { // first end point doc
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
    },
    apis: ['./src/router.ts'] // routes to find endpoints
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper {
            position: relative;
            width: 60px;
            margin-left: 100px;
        }
        .topbar-wrapper::after {
            content: 'Mister DAN';
            display: inline-block;
            position: absolute;
            font-weight: bold;
            white-space: nowrap;
            letter-spacing: 2px;
            color: white;
            font-size: 20px;
            margin-left: 100px;
        }
        .topbar-wrapper .link {
            content: url('https://raw.githubusercontent.com/misterdan100/mister-todo-v2/main/src/assets/misterdan-favicon.png');
            height: 60px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: #2b3b45;
        }
    `,
    customSiteTitle: 'Documentation REST API Express / TS | Mister DAN'
}

export default swaggerSpec
export {
    swaggerUiOptions
}