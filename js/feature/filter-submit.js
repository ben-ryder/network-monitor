// Setting behaviour of filter forms submission.
document.querySelector("#filterForm").addEventListener('submit', (e) => {
    if (e.submitter.id === "filterSubmit"){
        return true;
    }
    else {
        // Redirect to page without query string. (effectively resets filter ot default)
        e.preventDefault();
        window.location.href = window.location.href.split('?')[0]
        return false;
    }
})

console.log("hello")