//https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
pageQuery = (query) => {
    console.log("pageNo",query.pageNo)
    let pageNo = 1;
    if (query.hasOwnProperty('pageNo')) {
        if (query.pageNo != '0' && !isNaN(query.pageNo)) {
            pageNo = parseInt(query.pageNo);
            return pageNo;  
        }        
    }
    return pageNo;
}
module.exports = pageQuery;