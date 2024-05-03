class APIFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  search() {
    let keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword, // use regex to match the keyword in the field 'name' of items
            $options: "i", // ignore case sensitivity in the database field
          },
        }
      : {};
    this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryStrCopy = { ...this.querystr };
    //before
    // console.log(queryStrCopy);
    //remove filed from query
    const excludeFields = ["keyword", "page", "limit"];
    excludeFields.forEach((fields) => delete queryStrCopy[fields]);
    //after
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/gt|gte|lt|lte/g, (match) => `$${match}`); // to adding  '$' symbol before gt, lt etc for mongo

    // console.log(queryStr);
    this.query.find(JSON.parse(queryStr));

    return this;
  }
  paginate(resPerPage) {
    let currentPage = this.querystr.page || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query.limit(resPerPage).skip(skip); // to  get data for a particular page
    return this;
  }
}

module.exports = APIFeatures;
