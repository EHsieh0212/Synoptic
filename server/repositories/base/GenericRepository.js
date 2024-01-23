const { get } = require('lodash');
const { dbClient } = require('../../database/mysql/init');

class GenericRepository {
    constructor(model) {
        this.model = model;
    }

    count(query) {
        return this.model.count({ where: query });
    }

    findOne(query) {
        return this.model.findOne({ where: query });
    }

    findAll(query, limit, order) {
        return this.model.findAll({ where: query, limit, order });
    }

    findAllWithColumns(attributes, query, limit, order) {
        return this.model.findAll({ attributes, where: query, limit, order });
    }

    findAndCount(query, attributes, offset=0, limit=2, order) {
        return this.model.findAndCountAll({ where: query, attributes, offset, limit, order });
    }

    findAndCountAll(attributes, offset, limit, order) {
        return this.model.findAndCountAll({ attributes, offset, limit, order });
    }

    async insertOne(entity, transaction) {
        return this.model.create(entity, {transaction});
    }

    async insertMany(entities, returnField = 'id') {
        try {
          const result = await this.model.bulkCreate(entities);
          const fieldValues = result.map(entity => entity.get(returnField));
          return fieldValues;
        } catch (error) {
          throw error
        }
      }

    async update(updateFields, query) {
        return await this.model.update(updateFields, { where: query});
    }

    delete(query) {
        return this.model.destroy({ where: query });
    }
}

module.exports = {
    GenericRepository,
};
