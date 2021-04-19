class UrlService {
  constructor(model) {
    this.dataSource = model;
  }

  async getUrl(urlCode) {
    return await this.dataSource.findOne({ urlCode });
  }

  async getUrls() {
    return await this.dataSource.find();
  }
}

module.exports = UrlService;
