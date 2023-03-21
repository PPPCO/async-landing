const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCcbUuPjp7J32YSIESrUe76A&part=snippet%2Cid&order=date&maxResults=9';
const content = null || document.getElementById('content');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c2bd775417msh6ec84d4f66442b8p1987d8jsne9506376239e',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

// fetch(API, options)
// 	.then(response => response.json())// transformando la respuesta a json
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
async function fetchData(urlAPI) {
    const response = await fetch(urlAPI, options);
    const data = await response.json();// esto ya nos entregara un objeto que ya podemos iterar
    return data;
}
// creando una funcion que se llama a si misma
(async function () {
    try {
        const videos = await fetchData(API);
        let view = `
        ${videos.items.map((video) => `
            <div class="group relative">
                <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
                >
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full" />
                </div>
                <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
                </div>
            </div>
        `).slice(0,4).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();