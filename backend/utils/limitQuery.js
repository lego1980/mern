//https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
limitQuery = (query) => {
    //console.log("limitQuery",query.limitPerPage)
    let defaultLimit = 5;
    if (query.hasOwnProperty('limitPerPage')) {
        if (query.limitPerPage != '0' && !isNaN(query.limitPerPage)) {
            defaultLimit = parseInt(query.limitPerPage);
            return defaultLimit;  
        }        
    }
    return defaultLimit;
}
module.exports = limitQuery;