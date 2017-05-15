10 Hacker news

To launch app:
- Run "npm install";
- Run "webpack";
- open "index.html"

React app that fetches data from the API.
Gets 10 random IDs from first request, than makes request to get article data and uses author ID from article data
to make request for author data.

Components state "isFetching" is responsible for displaying data on the page. When all the
data is fetched it gets displayed.