const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/concerts', () => {

  before(async () => {
    const testConOne = new Concert({
       _id: '60a553f6217cff17d9e37a8f',
       performer: 'John Doe',
       genre: 'Rock',
       price: 25,
       day: 1,
       image: '/img/uploads/1fsd324fsdg.jpg' 
      });
    await testConOne.save();
  
  });

  it('/:id should update chosen document and return success', async () => {
    const res = await request(server).put('/api/concerts/60a553f6217cff17d9e37a8f').send({ performer: 'Amanda Doe', });
    const updatedConcert = await Concert.findOne({ _id: '60a553f6217cff17d9e37a8f' });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.not.be.null;
    expect(updatedConcert.performer).to.be.equal('Amanda Doe');
  });

  after(async () => {
    await Concert.deleteMany();
  });

});