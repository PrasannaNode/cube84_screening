module.exports = {
    paginationData(limit, page, data) {
      try {
        return {
          results: data.rows,
          total: data.count,
          pageMeta: {
            page: page,
            pageCount: Math.ceil(data.count / limit),
            nextPage: page >= Math.ceil(data.count / limit) ? null : page + 1,
            pageSize: limit,
            total: data.count
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }