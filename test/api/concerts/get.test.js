const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');
const Seat = require('../../../models/seat.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => { 

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

    const testConTwo = new Concert({
      _id: '60a553f6217cff17d9e37a91',
      performer: 'Maybell Haley',
      genre: 'Pop',
      price: 40,
      day: 1,
      image: '/img/uploads/hdfh42sd213.jpg' 
     });
   await testConTwo.save();

   const testSeatOne = new Seat({
    _id: '60a553d6217cff17d9e37a88',
    day: 1,
    seat: 9,
    client: 'Curtis Johnson',
    email: 'curtisj@example.com'
   });
 await testSeatOne.save();
  
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/random should return one random concert', async () => {
    const res = await request(server).get('/api/concerts/random');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get('/api/concerts/60a553f6217cff17d9e37a8f');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/:id/tickets should return one concert by :id and free tickets', async () => {
    const res = await request(server).get('/api/concerts/60a553f6217cff17d9e37a8f/tickets');

    const soldTickets = await Seat.find({ day: res.body.concert.day });
    const freeTickets = 50 - soldTickets.length;
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object').to.have.property('freeTickets');
    expect(res.body).to.not.be.null;
    expect(res.body.freeTickets).to.be.equal(freeTickets);
  });

  it('/performer/:performer should return one concert by performer', async () => {
    const res = await request(server).get('/api/concerts/performer/John%20Doe');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });

  it('/genre/:genre should return one concert by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });

  it('/price/:price_min/:price_max should return one concert by price', async () => {
    const minPrice = 25;
    const maxPrice = 40;
    const res = await request(server).get('/api/concerts/price/25/40');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });

  it('/day/:day should return one concert by day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });
  
  after(async () => {
    await Concert.deleteMany();
    await Seat.deleteMany();
  });

});