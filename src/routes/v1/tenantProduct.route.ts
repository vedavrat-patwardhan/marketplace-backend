import {
  createTenantProduct,
  filteredTenantProducts,
  getAllTenantProducts,
  getTenantProduct,
  searchAndFilterTenantProducts,
  searchTenantProduct,
} from '@src/controller/tenantProduct.controller';
import validate from '@src/middleware/validate';
import {
  createTenantProductSchema,
  filterTenantProductSchema,
  searchAndFilterTenantProductSchema,
  searchTenantProductSchema,
} from '@src/validation/tenantProduct.validation';
import { Router } from 'express';

const tenantProductRouter: Router = Router();

//*POST ROUTE

/**
 * @swagger
 * /v1/tenant/product/create:
 *  post:
 *    tags:
 *      - "Tenant Product"
 *    summary: "Create a new product"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - generalDetails
 *            properties:
 *              generalDetails:
 *                type: object
 *                required:
 *                  - status
 *                  - productId
 *                  - language
 *                  - manufacturer
 *                  - countryOfOrigin
 *                  - importerName
 *                  - location
 *                  - productName
 *                  - urlKey
 *                  - isMarketplace
 *                properties:
 *                  status:
 *                    type: string
 *                  productId:
 *                    type: string
 *                  language:
 *                    type: string
 *                  manufacturer:
 *                    type: string
 *                  countryOfOrigin:
 *                    type: string
 *                  importerName:
 *                    type: string
 *                  location:
 *                    type: string
 *                  productName:
 *                    type: string
 *                  urlKey:
 *                    type: string
 *                  isMarketplace:
 *                    type: boolean
 *    responses:
 *      200:
 *        description: "Product created successfully"
 *      400:
 *        description: "Product with this URL key is already registered"
 *      500:
 *        description: "Failed to create product"
 */

tenantProductRouter.post(
  '/create',
  validate({ body: createTenantProductSchema }),
  createTenantProduct,
);

//*GET ROUTE

/**
 * @swagger
 * /v1/tenant/product/{itemsPerPage}/{pageCount}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - "Tenant Product"
 *    summary: "Get all products"
 *    parameters:
 *      - in: path
 *        name: itemsPerPage
 *        required: false
 *        description: "Number of items per page. Default is 10."
 *        schema:
 *          type: integer
 *      - in: path
 *        name: pageCount
 *        required: false
 *        description: "Number of pages. Default is 1."
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: "Products fetched successfully"
 *      400:
 *        description: "Invalid query params"
 *      404:
 *        description: "No product found"
 *      500:
 *        description: "Failed to fetch products"
 */

tenantProductRouter.get(
  '/:itemsPerPage/:pageCount',

  getAllTenantProducts,
);

/**
 * @swagger
 * /v1/tenant/product/{id}:
 *  get:
 *    tags:
 *      - "Tenant Product"
 *    summary: "Get product by ID"
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: "Product ID"
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: "Product fetched successfully"
 *      404:
 *        description: "Product not found"
 *      500:
 *        description: "Failed to fetch product"
 */

tenantProductRouter.get('/:id',  getTenantProduct);

// //*PATCH ROUTE
// tenantProductRouter.patch(
//   '/',
//
//   validate({ body: updateTenantProductSchema }),
//   updateTenantProduct,
// );

// //*DELETE ROUTE
// tenantProductRouter.delete('/:id',  deleteProduct);

//? Tenant routes

/**
 * @swagger
 * /v1/tenant/product/tenant/search:
 *  get:
 *    tags:
 *      - "Tenant Product"
 *    summary: "Search products in tenant"
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: search
 *        required: true
 *        description: "Search query"
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: "Products fetched successfully"
 *      400:
 *        description: "Invalid query params"
 *      404:
 *        description: "Products with ${search} name / description is not available"
 *      500:
 *        description: "Failed to fetch products"
 */

tenantProductRouter.get(
  '/search',
  validate({ query: searchTenantProductSchema }),
  searchTenantProduct,
);

/**
 * @swagger
 * /v1/tenant/product/filter:
 *  get:
 *    tags:
 *      - "Tenant Product"
 *    summary: "Filter products in tenant"
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: category
 *        required: false
 *        description: "Category to filter by"
 *        schema:
 *          type: string
 *      - in: query
 *        name: manufacturer
 *        required: false
 *        description: "Manufacturer to filter by"
 *        schema:
 *          type: string
 *      - in: query
 *        name: minPrice
 *        required: false
 *        description: "Minimum price to filter by"
 *        schema:
 *          type: number
 *          minimum: 0
 *      - in: query
 *        name: maxPrice
 *        required: false
 *        description: "Maximum price to filter by"
 *        schema:
 *          type: number
 *          minimum: 0
 *      - in: query
 *        name: variants
 *        required: false
 *        description: "Variants to filter by"
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *      - in: query
 *        name: attributes
 *        required: false
 *        description: "Attributes to filter by"
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *    responses:
 *      200:
 *        description: "Products fetched successfully"
 *      400:
 *        description: "Invalid query params"
 *      404:
 *        description: "No products found with the given filters"
 *      500:
 *        description: "Failed to fetch products"
 */

tenantProductRouter.get(
  '/filter',
  validate({ query: filterTenantProductSchema }),
  filteredTenantProducts,
);

/**
 * @swagger
 * /v1/tenant/product/search-filter:
 *  get:
 *    tags:
 *      - "Tenant Product"
 *    summary: "Search and filter products in tenant"
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: search
 *        required: true
 *        description: "Search query"
 *        schema:
 *          type: string
 *      - in: query
 *        name: category
 *        required: false
 *        description: "Category to filter by"
 *        schema:
 *          type: string
 *      - in: query
 *        name: manufacturer
 *        required: false
 *        description: "Manufacturer to filter by"
 *        schema:
 *          type: string
 *      - in: query
 *        name: minPrice
 *        required: false
 *        description: "Minimum price to filter by"
 *        schema:
 *          type: number
 *          minimum: 0
 *      - in: query
 *        name: maxPrice
 *        required: false
 *        description: "Maximum price to filter by"
 *        schema:
 *          type: number
 *          minimum: 0
 *      - in: query
 *        name: variants
 *        required: false
 *        description: "Variants to filter by"
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *      - in: query
 *        name: attributes
 *        required: false
 *        description: "Attributes to filter by"
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *    responses:
 *      200:
 *        description: "Products fetched successfully"
 *      400:
 *        description: "Invalid query params"
 *      404:
 *        description: "No products found with the given filters"
 *      500:
 *        description: "Failed to fetch products"
 */
tenantProductRouter.get(
  '/search-filter',
  validate({ query: searchAndFilterTenantProductSchema }),
  searchAndFilterTenantProducts,
);

export default tenantProductRouter;