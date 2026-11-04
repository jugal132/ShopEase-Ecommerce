# ShopEase – E-commerce Web Application

A beginner-friendly full-stack e-commerce demo built with Java 17, Spring Boot, Spring Data JPA, Hibernate, MySQL, HTML, CSS and JavaScript.

## Features
- Responsive product catalogue
- Search by product name or category
- Category filters
- Shopping cart with quantity controls and total calculation
- Cart saved in browser localStorage
- REST API to list, retrieve and create products
- Sample products inserted when the app starts

> This is a learning/portfolio demo. It does not process real payments and does not include production authentication, order persistence or shipping integration.

## Requirements
- JDK 17+
- Maven 3.8+
- MySQL 8+

## Run locally
1. Create the database:
   `CREATE DATABASE ecommerce_db;`
2. Configure MySQL credentials using environment variables `DB_USERNAME` and `DB_PASSWORD`, or edit `src/main/resources/application.properties`.
3. Run from the repository root:
   `mvn spring-boot:run`
4. Open http://localhost:8080

Default local database settings are username `root` and an empty password. Change these for your environment. Never commit real credentials.

## REST API
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | List all products |
| GET | `/api/products/{id}` | Get one product |
| POST | `/api/products` | Create a product |

Example POST body:
```json
{
  "name": "Wireless Headphones",
  "description": "Bluetooth headphones",
  "category": "Electronics",
  "price": 1499.00,
  "stock": 20,
  "imageUrl": "https://images.unsplash.com/photo-150"
}
```

## Project structure
```
pom.xml
README.md
src/main/java/com/example/ecommerce/
  EcommerceApplication.java
  controller/ProductController.java
  model/Product.java
  repository/ProductRepository.java
  service/ProductService.java
src/main/resources/
  application.properties
  static/index.html
  static/style.css
  static/app.js
```

## Resume project summary
**ShopEase – E-commerce Web Application | Java, Spring Boot, Spring Data JPA, Hibernate, MySQL, HTML, CSS, JavaScript**
- Built a responsive product catalogue with search and category filtering.
- Created REST endpoints using Spring Boot.
- Persisted product data using Spring Data JPA and MySQL.
- Implemented browser-based cart functionality with quantity updates and total calculation.

Run and verify the project locally before listing it as completed work on a resume. Add screenshots and tests as you extend it.
