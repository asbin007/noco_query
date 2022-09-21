# noco_query

## Getting Started

```javascript
const nocoQuery = require("noco_query");

const config = {
  url: "http://localhost:8080/api/v1/db/data/noco/hdwh_wbidnw",
  table: "users",
  xc_token: "*******",
};

const db = new nocoQuery(config);

//checking the connection to database // not mandatory

db.connect();
```

![Connecting](https://raw.githubusercontent.com/Avrel3/noco_query/main/snapshot/connect.png)

### Get data

```javascript
// Note: "" || invalid query => returns every data;
// Full documentation of queries can be found in official Nocodb website
// i.e const query = "w=(<key>,eq,<value>)"

const query = "";

db.get(query, (data) => console.log(data));
```

![Get](https://raw.githubusercontent.com/Avrel3/noco_query/main/snapshot/get.png)

### Post data

```javascript
const body = {
  username: "<username>",
  password: "<password>",
};

db.post(body);
```

![Post](https://raw.githubusercontent.com/Avrel3/noco_query/main/snapshot/post.png)

### Find data

```javascript
const query = "w=(username,eq,<username>)";

db.find(query, (data) => console.log(data));
```

### Update data

```javascript
const query = "w=(username,eq,<user>)";
const body = {
  username: "<user>",
};

db.update(query, body);
```

### Delete data

```javascript
const query = "w=(username,eq,<user>)";

db.delete(query);
```

### Destroy data

```javascript
//Note: Deletes all rows in the table

db.destroy();
```
