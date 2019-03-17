# shopping-cart-restfull-api

Basic RESTful api for shopping where you can add/delete your product and order any product after authorization.
#### DESCRIPTION

 -    Built a REST Api in Node.js using MVC approch using Node.js + MongoDB.
 -    JWT for Authetication and Authorization.

#### BASIC REQUIREMENTS

 - Node.js 6.11.2
 - MongoDb

#### INSTALLATION INSTRUCTIONS
-   Clone or download the repo. into your local system.
-   Cd into that root folder you just cloned locally.
-   install all dependencies which are written in the packet.json file, type
    ```
    npm install
    ```
-   Now typing
    ```
    npm start
    ```
    will start a server !
    
    App should now be running on **localhost:3000**
         
### Dependencies 
 - For dependencies refer Package.json


### For Testing (Postman)
- Postman extension can be used for testing !

## Available API Routes

### [Products Routes](#1-product-routes)
| Routes        | Description           | 
| ------------- |:-------------:|
| [`GET/products/`](#a-get-list-of-all-products)    |Get list of all products|
| [`POST/products/`](#b-post-a-new-product)     | Post a new product |     
| [`GET/products/:productId`](#c-get-details-of-a-particular-product)| Get details of a particular product. |    
| [`PATCH/products/:productId`](#d-update-a-particular-product) | Update a particular product |
| [`DELETE/products/:productId`](#e-delete-a-particular-product) |Delete a particular product |

### [User Routes](#2-user-routes)
| Routes        | Description           | 
| ------------- |:-------------:|
| [`POST/user/signUp`](#a-sign-up-a-new-user)    | Sign up a new user |
| [`POST/user/login`](#b-login-a-existing-user)     | Login a user |     
| [`DELETE/user/:userId`](#c-delete-a-user)|Delete a user from database |    

### [Order Routes](#3-order-routes)
| Routes        | Description           | 
| ------------- |:-------------:|
| [`GET/orders/`](#a-get-list-of-all-orders)    | Get all orders by the logged in user |
| [`POST/orders/`](#b-post-a-new-order)     | Post a new order for the logged in user |
| [`GET/orders/:orderId`](#c-get-details-of-a-particular-order)| Fetch details of a particular order |    
| [`DELETE/orders/:orderId`](#d-delete-a-particular-order) | Deletes a particular order |

## 1. Product Routes

### A. Get list of all Products.
Send Get request to fetch the list of all products with seller email in JSON format..
```
Method: GET 
URL: /products/
Produces: application/json
```
  #### Example :
  - **Request** : /products/
  - **Response**:
  
    ````
    {
    "count": 3,
    "products": [
        {
            "name": "laptop",
            "price": 12000,
            "_id": "5c5d8523c5551e1257d0eaab",
            "productImage": "uploads/2019-02-08T13:33:23.496Zdownload.jpg",
            "sellerEmail": "testing@gmail.com",
            "request": {
                "type": "GET",
                "url": "https://localhost:3000/products/5c5d8523c5551e1257d0eaab"
            }
        },
        {
            "name": "book",
            "price": 120,
            "_id": "5c5d8546c5551e1257d0eaac",
            "productImage": "uploads/2019-02-08T13:33:58.815ZSketch (1).png",
            "sellerEmail": "testing@gmail.com",
            "request": {
                "type": "GET",
                "url": "https://localhost:3000/products/5c5d8546c5551e1257d0eaac"
            }
        },
        {
            "name": "Milk",
            "price": 50,
            "_id": "5c5d8594c5551e1257d0eaae",
            "productImage": "uploads/2019-02-08T13:35:15.814ZScreenshot (69).png",
            "sellerEmail": "testing2@gmail.com",
            "request": {
                "type": "GET",
                "url": "https://localhost:3000/products/5c5d8594c5551e1257d0eaae"
            }
        }
    ]
}
    ````

----

### B. Post a new product
  
  User must be logged in to do that.
  
```
Method: POST
URL: /products/
Authorization: {token}
Produces: application/json
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| name   | String |Required    | Name of the product |
| price   | String |Required    | Price of the product |
| productImage   | String |Required    | Image of the product(.png/.jpeg) |

#### Example :
- **Request:**  `/products/`

- **Response:**
````
{
    "message": "Product saved",
    "currentProduct": {
        "name": "Tea",
        "price": 50,
        "_id": "5c5d86c3c5551e1257d0eaaf"
    },
    "request": {
        "type": "GET",
        "url": "https://localhost:3000/products/5c5d86c3c5551e1257d0eaaf"
    }
}
````    
----

### C. Get details of a particular product

```
Method: GET
URL: /products/:productId
Produces: application/json
```
#### Example :
- **Request:**  `/products/5c5d8523c5551e1257d0eaab`

- **Response:**
````
{
    "product": {
        "productSeller": {
            "email": "testing@gmail.com"
        },
        "_id": "5c5d8523c5551e1257d0eaab",
        "name": "laptop",
        "price": 12000,
        "productImage": "uploads/2019-02-08T13:33:23.496Zdownload.jpg"
    },
    "request": {
        "type": "GET",
        "url": "https://localhost:3000/products"
    }
}
````    
----

### D. Update a particular product
  User must be logged in to do that.
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| name   | String | Not  |Updated name of the product |
| price   | String | Not  |Updated price of the product |

#### Request Body :
````
[
	{
		"propName":"name",
		"value":"T.V"
	},
  {
		"propName":"price",
		"value":"20000"
	}	
]
````
````
Method: PATCH
URL: /products/:productId
Authorization: {token}
Produces: application/json
````
#### Example :
- **Request:**  `/products/5c21e3f5c6cfb46d8c51b616`

- **Response:**
````
{
    "message": "Product Updated Successfully",
    "request": {
        "type": "GET",
        "description": "Get product details.",
        "url": "http://localhost:3000/products/5bdd9d946d97be54a4dc5666"
    }
}
````    
----
### E. Delete a particular product
  User must be logged in to do that.
```
Method: DELETE
URL: /products/:productId
Authorization: {token}
Produces: application/json
```
#### Example :
- **Request:**  `/products/5c21e3f5c6cfb46d8c51b616`

- **Response:**
````
{
    "message": "Product Deleted",
    "request": {
        "type": "POST",
        "description": "Create new Product",
        "url": "http://localhost:3000/products",
        "body": {
            "name": "String",
            "price": "Number",
            "productImage": "String"
        }
    }
}
````    
## 2. User Routes

### A. Sign up a new User.
  Sends a POST request to create a new user and returns a web token for further authentication.
```
Method: POST 
URL: /user/signup
Produces: application/json
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| email   | Email |Required    | User Email |
| password   | String |Required    | password |

  #### Example :
  - **Request** : /user/signUp
  - **Response**:
  
    ````
    {
      "message": "User Created!!"
    }
    ````

----

### B. Login a existing user

Sends a POST request to login a exisiting user
    
```
Method: POST
URL: /user/login
Produces: application/json
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| email   | Email |Required    | User Email |
| password   | String |Required    | password |

#### Example :
- **Request:**  `/user/login`

- **Response:**
````
      {
        "message": "Auth Successful!!",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbHBpdEB0ZXN0LmNvbSIsIklkIjoiNWMyMWUxNGRjNmNmYjQ2ZDhjNTFiNjE1IiwiaWF0IjoxNTQ1NzI0MjcyLCJleHAiOjE1NDU3Mjc4NzJ9.0Ro0iBOO0I_mEjYHhQHPhXy0JmP_iAYhgZAHI3a4vkI"
      }
````    
----   
### C. Delete a user
```
Method: DELETE
URL: /user/:userId
Produces: application/json
```
#### Example :
- **Request:**  `/user/:userId`

- **Response:**
````
{
	"message":'User successfully deleted!!'
}
````    
## 3. Order Routes

### A. Get list of all Orders.
Send Get request to fetch the list of Orders by a User in JSON format.
User must be logged in to do that
```
Method: GET 
URL: /orders/
Authorization: {token}
Produces: application/json
```
  #### Example :
  - **Request** : /orders/
  - **Response**:
  
    ````
    {
    "response": {
        "count": 1,
        "orders": [
            {
                "_id": "5c5d89d9c5551e1257d0eab0",
                "productId": {
                    "_id": "5c5d8523c5551e1257d0eaab",
                    "name": "laptop"
                },
                "quantity": 2,
                "buyer": "5c5d8501c5551e1257d0eaaa",
                "request": {
                    "type": "GET",
                    "url": "https://api-project-rsinghal26.c9users.io/orders/5c5d89d9c5551e1257d0eab0"
                }
            }
        ]
    }
}    ````
----

### B. Post a new order
  
  User must be logged in to do that.
  
```
Method: POST
URL: /orders/
Authorization: {token}
Produces: application/json
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| productId   | String |Required    | Id of the product to be ordered |
| quantity   | integer |Required    | Quantity |

#### Example :
- **Request:**  `/orders/`

- **Response:**
````
{
    "message": "Order Stored",
    "currentOrder": {
        "_id": "5c5d89d9c5551e1257d0eab0",
        "productId": "5c5d8523c5551e1257d0eaab",
        "quantity": 2
    },
    "request": {
        "type": "GET",
        "url": "https://localhost:3000/orders/5c5d89d9c5551e1257d0eab0"
    }
}
````    
----

### C. Get details of a particular order
  User must be logged in to do that
```
Method: GET
URL: /orders/:orderId
Authorization: {token}
Produces: application/json
```
#### Example :
- **Request:**  `/orders/5c21f7d6c6cfb46d8c51b61a`

- **Response:**
````
{
    "order": [
        {
            "quantity": 2,
            "_id": "5c5d89d9c5551e1257d0eab0",
            "productId": {
                "productSeller": {
                    "id": "5c5d8501c5551e1257d0eaaa",
                    "email": "testing@gmail.com"
                },
                "_id": "5c5d8523c5551e1257d0eaab",
                "name": "laptop",
                "price": 12000,
                "productImage": "uploads/2019-02-08T13:33:23.496Zdownload.jpg",
                "__v": 0
            }
        }
    ],
    "request": {
        "type": "GET",
        "url": "https://localhost:3000/orders"
    }
}
````    
----
### D. Delete a particular order
  User must be logged in to do that.
```
Method: DELETE
URL: /orders/:orderId
Authorization: Bearer {token}
Produces: application/json
```
#### Example :
- **Request:**  `/orders/5c21f89dc6cfb46d8c51b61c`

- **Response:**
````
{
    "message": "Order Deleted",
    "request": {
        "type": "POST",
        "description": "Place new Order",
        "url": "http://localhost:3000/orders/"
    }
}
````    
