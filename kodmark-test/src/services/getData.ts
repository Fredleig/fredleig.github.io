export const getData = (value?: string) => {
    return fetch(`https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx&tag=${value}`)
    .then(res => res.json())
}