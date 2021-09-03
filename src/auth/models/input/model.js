'use strict';

'use strict';

const inputModel = (sequelize, DataTypes) => sequelize.define('Input', {
  trip: { type: DataTypes.STRING, required: true },
  date: { type: DataTypes.STRING, required: true },
  transportation: { type: DataTypes.STRING, required: true }
});

module.exports = inputModel;