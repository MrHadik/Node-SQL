

# Node-SQL

Node-SQL is simple CRUD operation using Node.js as backend and for database used phpmyadmin



## Screenshots

### Home

![Home](https://user-images.githubusercontent.com/74814143/219609037-64d6f4dc-d821-4795-8245-bd909dc80d8f.png)

### Add User

![Add User](https://user-images.githubusercontent.com/74814143/219609310-7d014e50-b422-49cd-8bb4-bbadca8892e1.png)

![App User Box](https://user-images.githubusercontent.com/74814143/219610681-ad590cf4-15e9-4dca-ac6b-7eefef4416b3.png)

### Edit User

![Edit User](https://user-images.githubusercontent.com/74814143/219609488-4be0f742-30d4-460a-8a69-a6cd11f867cf.png)

![Updated box](https://user-images.githubusercontent.com/74814143/219609790-7099f88f-096b-477e-b71d-45dd221a6879.png)

### Delete User

![App Screenshot](https://user-images.githubusercontent.com/74814143/219610226-4c60c0bc-dedb-4ec0-b2a5-06a35c9cabe7.png)




## Tech Stack

**Client:** React

**Server:** Node, Express



## Run Locally

Clone the project

```bash
  git clone https://github.com/MrHadik/Node-SQL.git
```

Go to the project directory for Backend

```bash
  cd Node-SQL
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
Go to the project directory for Front end 

```bash
  cd Node-SQL/client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## API Reference

#### Get all Users

```http
  GET /api/users
```
#### Get Single User

```http
  GET /api/user/${id} 
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `numbers` | **Required**. Id of user to user |


#### Add Single User 

```http
  POST /api/user/add
```

| Body   | Type     | Description                       |
| :-------- | :------- | :-------------------------------- | 
| `email`   | `string` | **Required**. email of user to add user | 
| `passwd`      | `string` | **Required**. password of user to add user |
| `name`      | `string` | **Required**. name of user to add user |
| `gender`      | `string` | **Required**. gender of user to add user |
| `mobile`      | `numbers` | **Required**. mobile of user to add user |
| `city`      | `string` | **Required**. city of user to add user |
| `address`      | `string` | **Required**. address of user to add user |


#### Delete Single User

```http
  DELETE /api/user/delete/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `numbers` | **Required**. Id of user to delete |

#### Update Single User 

```http
  PUT /api/user/update
```

| Body   | Type     | Description                       |
| :-------- | :------- | :-------------------------------- | 
| `email`   | `string` | **Required**. email of user to add user | 
| `passwd`      | `string` | **Required**. password of user to add user |
| `name`      | `string` | **Required**. name of user to add user |
| `gender`      | `string` | **Required**. gender of user to add user |
| `mobile`      | `numbers` | **Required**. mobile of user to add user |
| `city`      | `string` | **Required**. city of user to add user |
| `address`      | `string` | **Required**. address of user to add user |
