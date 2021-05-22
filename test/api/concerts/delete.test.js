const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/concerts', () => {

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

  it('/:id should delete chosen document and return success', async () => {
    const res = await request(server).delete('/api/concerts/60a553f6217cff17d9e37a8f');
    const deletedConcert = await Concert.findOne({ _id: '60a553f6217cff17d9e37a8f' });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(deletedConcert).to.be.null;
  });

  after(async () => {
    await Concert.deleteMany();
  });
});