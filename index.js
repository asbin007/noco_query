const axios = require("axios").default;
require("colors");
const log = (str) => console.log(str);

class nocoQuery {
  constructor({ host, table, xc_token }) {
    this.host = host;
    this.table = table;
    this.xc_token = xc_token;
  }

  connect() {
    const url = `${this.host}/${this.table}/views/${this.table}`;
    const method = "GET";
    const options = {
      url: url,
      method: method,
      headers: {
        "Content-Type": "application/json",
        "xc-token": this.xc_token,
      },
    };
    axios
      .request(options)
      .then((res) => {
        log("Nocodb connected".green);
      })
      .catch(function (err) {
        if (err) log(`${err.message}`.red);
      });
  }

  get(query = "", data = () => {}) {
    var url = `${this.host}/${this.table}/views/${this.table}?${query}`;
    if (typeof data != "function") {
      log("GET: Pass a proper callback function for the response".red);
      return;
    }
    const options = {
      headers: {
        
        "Content-Type": "application/json",
        "xc-token": this.xc_token,
      },
    };
    axios
      .get(url, options)
      .then((res) => res.data["list"])
      .then((res) => data(res))
      .catch(function (err) {
        if (err) log(`GET: ${err.message}`.red);
        return;
      });
  }

  find(query = "", data = () => {}) {
    var url = `${this.host}/${this.table}/views/${this.table}/find-one?${query}`;
    if (typeof data != "function") {
      log("GET: Pass a proper callback function for the response".red);
      return;
    }
    const options = {
      headers: {
        
        "Content-Type": "application/json",
        "xc-token": this.xc_token,
      },
    };
    axios
      .get(url, options)
      .then((res) => res.data)
      .then((res) => data(res))
      .catch(function (err) {
        if (err) {
          log(`GET: ${err.message}`.red);
          return;
        }
      });
  }

  post(body, log_on_success = true) {
    if (typeof body != "object") {
      log("POST: Pass data in proper object".red);
      return;
    }
    var url = `${this.host}/${this.table}/views/${this.table}`;
    const options = {
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xc-token": this.xc_token,
      },
      data: body,
    };
    axios
      .request(options)
      .then((res) => {
        if (log_on_success) log("POST: Post successful".green);
      })
      .catch(function (err) {
        if (err) log(`POST: Post failed\n${err.message}`.red);
        return;
      });
  }

  update(query = "", body, log_on_success = true) {
    if (typeof body != "object") {
      log("UPDATE: Pass data in proper object".red);
      return;
    }
    this.find(query, (res) => {
      var url = `${this.host}/${this.table}/views/${this.table}/${res["Id"]}`;
      const options = {
        url: url,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "xc-token": this.xc_token,
        },
        data: body,
      };
      axios
        .request(options)
        .then((_) => {
          if (log_on_success) log("UPDATE: Update successful".green);
        })
        .catch(function (err) {
          if (err) {
            log(`UPDATE: Update failed\n${err.message}`.red);
            return;
          }
        });
    });
  }

  delete(query = "", log_on_success = true) {
    this.find(query, (___) => {
      let Id = ___["Id"];
      var url = `${this.host}/${this.table}/views/${this.table}/${Id}`;
      var options = {
        url: url,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "xc-token": this.xc_token,
        },
      };
      axios
        .request(options)
        .then((res) => {
          if (res.data == 1) {
            if (log_on_success) log("DELETE: Deletion successful".green);
          } else log("DELETE: No results found to delete".red);
          if ((query = ""))
            log(
              "DELETE".red +
                ": " +
                "No query passed so deleted first data to appear".green
            );
        })
        .catch(function (err) {
          if (err) {
            log(`DELETE: Deletion failed\n${err.message}`.red);
            return;
          }
        });
    });
  }

  destroy() {
    this.get("", (___) => {
      var url = `${this.host}/${this.table}/views/${this.table}`;
      let _ = ___.length;
      for (let i = 0; i < _; i++) {
        let Id = ___[i]["Id"];
        var options = {
          url: url + `/${Id}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "xc-token": this.xc_token,
          },
        };
        axios
          .request(options)
          .then((res) => {})
          .catch(function (err) {
            if (err) {
              log(`DESTROY: Destroying failed\n${err.message}`.red);
              return;
            }
          });
      }
      log(`DESTROY`.red + ": ".white + `Data destroyed`.green);
    });
  }
}

module.exports = nocoQuery;