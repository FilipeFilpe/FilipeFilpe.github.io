function getRepositoriesGithub(user) {
    let url = "https://api.github.com/users/FilipeFilpe/repos";

    // Set up our HTTP request
    let xhr = new XMLHttpRequest();
    let projects = null;
    // Setup our listener to process completed requests
    xhr.onload = function () {

        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
            
            projects = JSON.parse(xhr.responseText);
            return projects;

        } else {
            // What do when the request fails
            console.log('The request failed!');
        }
        
        // Code that should run regardless of the request status
        console.log('This always runs...');
    };
    
    // Create and send a GET request
    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    xhr.open('GET', url);
    xhr.send();
}
