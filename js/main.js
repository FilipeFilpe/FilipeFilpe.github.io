function getRepositoriesGithub(user) {
    let url = "https://api.github.com/users/FilipeFilpe/repos";

    fetch(url)
    .then(res => res.json())
    .then(data => {
        // updated_at
        let projects = data.map(e => e.updated_at).sort();
        console.log(projects);
    })
}
getRepositoriesGithub("FilipeFilpe");

fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@filipefilpe')
    .then((res) => res.json())
    .then((data) => {
        // Fillter the array
        const res = data.items; //This is an array with the content. No feed, no info about author etc..
        const posts = res.filter(item => item.categories.length > 0); // That's the main trick* !

        function toText(node) {
            let tag = document.createElement('div');
            tag.innerHTML = node;
            node = tag.innerText;
            return node;
        }
        function shortenText(text, startingPoint, maxLength) {
            return text.length > maxLength ? text.slice(startingPoint, maxLength) : text;
        }

        let output = '';
        posts.forEach((item) => {
            output += `
            <div class="card" >
                <div class="card-img">
                    <img src="${item.thumbnail}" class="card-img-top">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <div class="blog__info">
                        <small class="blog__author">${item.author}</small>
                        <small class="blog__date">${shortenText(item.pubDate, 0, 10)}</small>
                    </div>
                    <p class="card-text">${shortenText(toText(item.content), 0, 300) + '...'}</p>
                    <a href="${item.link}" class="btn btn-primary" target="_blanck">Leia mais...</a>
                </div>
            </div>`
        });
        document.querySelector('.posts-medium').innerHTML = output;
    })
