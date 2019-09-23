//https://stackoverflow.com/questions/19435580/sorting-alpha-with-mongoose - using ".collation({locale: "en" })
sortQuery = (query) => {
    console.log("sortQuery",query.sortOrder,typeof query.sortOrder,query.sortField)
    let sortField = 'updatedAt';
    let sortOrder = -1;
    if (query.hasOwnProperty('sortOrder')) {
        if (query.sortOrder == '1') {
            sortOrder = 1;
        }  
        console.log("sortOrder",sortOrder,typeof sortOrder)      
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