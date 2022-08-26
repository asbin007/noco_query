# nocoQuery


## Getting Started

```
const noco = require('noco_query')

//for example
const url = "http://localhost:8080/api/v1/db/data/noco/***"
const table = "users"
const token = "*******"

const db = new nocoQuery({host: url, table: table, xc_token: token});

//for connecting to database
db.connect();

```

![Connecting](https://raw.githubusercontent.com/Avrel3/noco_query/main/snapshot/connect.png)


### For getting data

```

db.get(query, (data) => console.log(data))

```

![Get](https://raw.githubusercontent.com/Avrel3/noco_query/main/snapshot/get.png)


### For posting data

```

db.post({
    "username": "Sasuke Uchiha",
    "password: "Naruto Uchiha
});

```

![Post](https://raw.githubusercontent.com/Avrel3/noco_query/main/snapshot/post.png)


### Lacks (for now)

* Delete
* Patch