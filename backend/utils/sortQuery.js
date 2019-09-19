//https://stackoverflow.com/questions/19435580/sorting-alpha-with-mongoose - using ".collation({locale: "en" })
sortQuery = (query) => {
    console.log("sortQuery",query.sortBy,query.sortField)
    let sortField = 'updatedAt';
    let sortOrder = -1;
    if (query.hasOwnProperty('sortBy')) {
        if (query.sortBy == '1') {
            sortOrder = 1;
        }        
    }
    if (query.hasOwnProperty('sortField')) {
        if (query.sortField == 'title') {
            return ({title:sortOrder});
        }
        if (query.sortField == 'category') {
            return ({category:sortOrder});
        }
        if (query.sortField == 'updatedAt') {
            return ({category:sortOrder});
        }
        if (query.sortField == 'createdAt') {
            return ({category:sortOrder});
        }         
    }
    return ({[sortField]:sortOrder});  
}
module.exports = sortQuery;