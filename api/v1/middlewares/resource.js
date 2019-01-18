import sendResponse from '../utils/sendResponse';

class Resource {
  async getAll(req, res) {
    try {
      const data = await this.model.findAll();

      return sendResponse(res, 200, { message: 'Success', data });
    } catch (error) {
      return sendResponse(res, 500, { error });
    }
  }

  async get(req, res, next) {
    const { id } = req;

    try {
      const resource = await this.model.findOne({
        where: { [this.key || 'id']: id },
      });

      if (!resource) {
        return sendResponse(res, 404, { error: `${this.name} not found` });
      }

      req[this.name] = resource;
      return next();
    } catch (error) {
      return sendResponse(res, 500, { error });
    }
  }

  async delete(req, res) {
    try {
      await req[this.name].destroy();
      return sendResponse(res, 200);
    } catch (error) {
      return sendResponse(res, 500, { error });
    }
  }
}

export default Resource;
