if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful', registration);
        }, function (err) {
            // Registration failed
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

function getProjects() {
    fetch("../dados.json")
        .then(res => res.json() )
        .then(data => {
            let html = '';
            let htmlModal = '';
            
            data[0].projetos.map(item => {
                const {img, titulo, descricao, url, tecnologias} = item;
                html += `
                    <div>
                        <div class="item-portfolio" data-toggle="modal" data-target="#${titulo.replace(/\s/g, '')}">
                            <img data-toggle="modal" data-target="#stoniaModal" class="img-fluid" src="${img}" alt="">
                        </div>
                    </div>
                `;

                htmlModal += `
                    <div class="modal fade" id="${titulo.replace(/\s/g, '')}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content" style="border-radius: 0;">
                                <div class="modal-body" style="padding:0;">
                                    <div class="box-items">
                                        <div>
                                            <img style="box-shadow:0px 0px 20px 0px dimgrey" src="${img}">
                                        </div>
                                        <div class="detalhes">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                            <div style="display: flex; flex-direction: column; align-items: center;">
                                                <h2 class="titulo">${titulo}</h2>
                                            </div>                                            
                                            <p>${descricao}</p>
                                            <h4>Tecnologias:</h4>
                                            <ul>
                                                ${tecnologias.map(tech => '<li>'+tech+'</li>').join('')}
                                            </ul>
                                            <a href="${url}" class="btn btn-primary" target="_blanck">Leia mais...</a>                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            document.querySelector('.itens-portfolio').innerHTML = html;
            document.querySelector('.modal-portfolio').innerHTML = htmlModal;
        });
}

function getPostsMedium() {
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
    
            let html = '';
            posts.forEach((item) => {
                html += `
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
                    </div>`;
            });
            document.querySelector('.posts-medium').innerHTML = html;
        })
}

function getRepositoriesGithub() {    
    fetch('https://api.github.com/users/FilipeFilpe/repos')
        .then(res => res.json())
        .then(data => {
            // let projects = data.map(e => e.updated_at).sort();
            let html = '';
            data.map(el => {
                html += `
                    <div class="project">
                        <div class="project-body">
                            <h5 class="project-title">${el.name}</h5>
                            <div>
                                ${el.description ? '<p class="project-title">'+el.description+'</p>' : ""}
                                <a href="${el.html_url}" alt="Link para ${el.html_url}" class="btn btn-primary" target="_blanck">Veja mais...</a>
                            </div>
                        </div>
                    </div>
                `;
            });

            document.querySelector('#github-projects div.projects').innerHTML = html;
        });
}

getProjects();
getPostsMedium();
getRepositoriesGithub();