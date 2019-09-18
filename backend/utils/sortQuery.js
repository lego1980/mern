//https://stackoverflow.com/questions/19435580/sorting-alpha-with-mongoose
sortQuery = (query) => {
    console.log("query1",query.f,query.o)
    let sortField = 'updatedAt';
    let sortOrder = -1;
    if (query.hasOwnProperty('o')) {
        if (query.o == '1') {
            sortOrder = 1;
        }        
    }
    if (query.hasOwnProperty('f')) {
        if (query.f == 'title') {
            return ({title:sortOrder});
        }
        if (query.f == 'category') {
            return ({category:sortOrder});
        }        
    }
    return ({[sortField]:sortOrder});  
}

module.exports = sortQuery;