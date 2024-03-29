export default class Paginator {
  constructor(page = 1, pageSize = 10) {
    this.page = page;
    this.pageSize = pageSize;
    this.skipCount = (page - 1) * pageSize;
  }

  async paginate(Model, query) {
    const documents = await Model.find(query)
      .skip(this.skipCount)
      .limit(this.pageSize);

    const documentCount = await Model.countDocuments(query);

    const collectionName = Model.collection.name;
    const totalPages = Math.ceil(documentCount / this.pageSize);
    const nextPage = this.page < totalPages ? this.page + 1 : null;
    const previousPage = this.page > 1 ? this.page - 1 : null;

    console.log(Model.collection.name);

    return {
      [collectionName]: documents,
      pagination: {
        page: this.page,
        pageSize: this.pageSize,
        totalPages,
        nextPage,
        previousPage,
        [`total${collectionName[0].toUpperCase()}${collectionName.slice(1)}`]:
          documentCount,
      },
    };
  }
}
