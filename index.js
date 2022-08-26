const axios = require("axios").default;
const colors = require('colors');
const log = (str) => console.log(str);


class nocoQuery {

  constructor({ host, table, xc_token }) {
    this.host = host;
    this.xc_token = xc_token;
    this.table = table;
  }
  
    connect() {
        const url = `${this.host}/${this.table}/views/${this.table}`;
        const method = "GET";
        const options = {
            url: url,
            method: method,
            headers: {
                "Content-Type": "application/json",
                "xc-token": this.xc_token
            },
        };

        axios.request(options).then((res) => {
            if (res.status === 200){
                log("Nocodb connected".green);
            }else{
                log("connection unsuccesful".red)
            }
          }).catch(function (err) {
            if (err)  log(`${err.message}`.red);
          });
    }

    get(query, data = () => {}, limit) {
        var url = `${this.host}/${this.table}/views/${this.table}?w=${query}`;
        if(typeof data != "function"){
            log("Pass a proper callback function for the response".red)
            return;
        }
        if(typeof limit == "number"){
            url = `${this.host}/${this.table}/views/${this.table}?limit=${limit}&w=${query}`;
        }
        const options = {
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "xc-token": this.xc_token,
            },
        };
        axios.get(url, options)
        .then((res) => res.data["list"])
        .then((res) => data(res) )
          .catch(function (err) {
            if (err) {log(`${err.message}\nPass a proper callback`.red);
            return;}
        });
    }

    post(body) {
        if(typeof body== "undefined"){
            log("Pass data as arguments while posting".red)
            return;
        }
        var url = `${this.host}/${this.table}/views/${this.table}`;
        const options = {
            url: url,
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "xc-token": this.xc_token,
            },
            data: body
        };
        axios.request(options)
        .then((res) => {log("Post successful".green)})
          .catch(function (err) {
            if (err){ log(`Post failed\n${err.message}`.red);
            return;} 
        });
    }

}

module.exports = nocoQuery;