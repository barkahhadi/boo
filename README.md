# Backend Engineer Coding Test

## Overview

The app involves storing and retrieving user profiles, allowing profile creation with a new POST route and updating the existing GET route to handle profile IDs. A backend API is implemented for commenting and voting functionalities. Users can create accounts, post comments, retrieve, sort, and filter comments, as well as like/unlike comments. All data, including profiles and comments, is stored in the same MongoDB database.

## Setup Instructions

1. **Install project dependencies:**

```bash
 npm install
```

2. **Run the service:**

```bash
npm run start
```

The service will be accessible at [http://localhost:3000](http://localhost:3000).

<br/>

## Run the tests

To Run the test simply run

```bash
npm run test
```

<br/>

## Endpoints

### 1. Create New Profile

-   **Method:** POST
-   **URL:** `http://localhost:3000/profile/add`
-   **Content-Type:** application/json

**Request Body:**

```json
{
    "name": "Barkah",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "INTP",
    "enneagram": "9w8",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "temperaments": "Phlegmatic",
    "image": "https://barkah.dev/images/avatars.svg"
}
```

### 2. Get Profile by ID

-   **Method:** GET
-   **URL:** `http://localhost:3000/6597593014293fe5600c4802`

### 3. Create User Account

-   **Method:** POST
-   **URL:** `http://localhost:3000/user/add`
-   **Content-Type:** application/json

**Request Body:**

```json
{
    "name": "Hadi"
}
```

### 4. Create New Comment

-   **Method:** POST
-   **URL:** `http://localhost:3000/comment/add`
-   **Content-Type:** application/json

**Request Body:**

```json
{
    "profileId": "6597593014293fe5600c4802",
    "userId": "6597594314293fe5600c4806",
    "comment": "This is a comment.",
    "mbti": "INTP",
    "enneagram": "9w8",
    "zodiac": null
}
```

### 5. Get Comments by Profile ID

-   **Method:** GET
-   **URL:** `http://localhost:3000/comment/6597593014293fe5600c4802?sortBy=recent&filterBy=all`

```
sortBy = recent | best
filterBy = mbti | enneagram | zodiac
```

### 6. Toggle Like

-   **Method:** POST
-   **URL:** `http://localhost:3000/comment/toggle-like`
-   **Content-Type:** application/json

**Request Body:**

```json
{
    "commentId": "6597594e14293fe5600c480a",
    "userId": "6597594314293fe5600c4806"
}
```
