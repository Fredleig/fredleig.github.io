class Ajax {
  private baseUrl: string = "http://localhost:3000";

  private getFetchParams(method: string) {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
    }
  }

  public GET(path: string, params: string) {
    return fetch(`${this.baseUrl}/${path}?${params}`)
        .then(res => res.json())
  }

  public POST(path: string, data: object) {
    return fetch(`${this.baseUrl}/${path}`, {
          ...this.getFetchParams("POST"),
          body: JSON.stringify(data)
        }
    )
        .then((response) => response.json())
  }

  public PUT(path: string, data: object) {
    return fetch(`${this.baseUrl}/${path}`, {
      ...this.getFetchParams("PUT"),
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
  }

  public DELETE(path: string) {
    return fetch(`${this.baseUrl}/${path}`, this.getFetchParams("DELETE"))
     .then((response) => response.json())
  }

}

export default new Ajax()