class Ajax {
  private baseUrl: string = "https://jsonplaceholder.typicode.com";

  public GET(path: string) {
    return fetch(`${this.baseUrl}/${path}`).then((res) => {
      if (!res.ok) {
        throw res.status.toString();
      } else {
        return res.json();
      }
    });
  }
}

export default new Ajax();
