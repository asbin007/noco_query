# noco_query

## Getting Started

```
const nocoQuery = require('noco_query');

const config = {
    url: "http://localhost:8080/api/v1/db/data/noco/hdwh_wbidnw",
    table: "users",
    xc_token: "*******",
}

const noco = new nocoQuery(config);

//checking the connection to database // !(mandatory)
db.connect();
```

![Connecting](https://raw.githubusercontent.com/Avrel3/noco_query/main/snapshot/connect.png)

### Get data

```
// Note: "" || invalid query => returns every data;
// Full documentation of queries can be found in official Nocodb website // i.e const query = "w=(<key>,eq,<value>)"

const query = "";

db.get(query, (data) => console.log(data))
```

![Get](https://raw.githubusercontent.com/Avrel3/noco_query/main/snapshot/get.png)

### Post data

```
const body = {
    username: "hinata_hyuga",
    password: "naruto-kun"
}

db.post(body);
```

![Post](https://raw.githubusercontent.com/Avrel3/noco_query/main/snapshot/post.png)

### Find data

```
const query = "w=(username,eq,hinata_hyuga)";

db.find(query, (data) => console.log(data))
```

### Update data

```
const query = "w=(username,eq,hinata_hyuga)"
const body = {
    username: "hinata_uzumaki"
}

db.update(query, body);
```

### Delete data

```
const query = "w=(username,eq,hinata_uzumaki)"

db.delete(query);
```

### Destroy data

```
//Note: Deletes all rows in the table

db.destroy();
```
