import Sequelize from 'sequelize-mock';

export default class SequelizeMock extends Sequelize {
    sync() {
        return Promise.resolve();
    }
}
