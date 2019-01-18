import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { Contact, Message } from '../../models';
import { contactSeeds, messageSeeds } from '../../seedData';

chai.use(chaiHttp);

const PATH = '/api/v1/contacts';

describe('Contact Controller Test', () => {
  describe('/GET all contacts', () => {
    it('should return an empty array', async () => {
      const res = await chai.request(app).get(`${PATH}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.data.length).to.equal(0);
    });
  });

  describe('/POST', () => {
    // Happy endings
    it('create a new contact', async () => {
      const res = await chai.request(app)
        .post(`${PATH}`)
        .set('Accept', 'application/json')
        .send({
          name: 'Larrystone    Yakov',
          phoneNumber: '08029190299'
        });
      expect(res.statusCode).to.equal(201);
      expect(res.body.message).to.equal('New contact created');
      expect(res.body.data.name).to.equal('Larrystone Yakov');
      expect(res.body.data.phoneNumber).to.equal('08029190299');
    });


    it('returns a list of contacts', async () => {
      const res = await chai.request(app).get(`${PATH}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body.data.length).to.equal(1);
    });

    //Sad endings
    it('returns an invalid contact name', async () => {
      const res = await chai.request(app)
        .post(`${PATH}`)
        .set('Accept', 'application/json')
        .send({ phoneNumber: '080342243453' });

      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Invalid contact data provided');
    });

    it('returns an invalid contact phone number', async () => {
      const res = await chai.request(app)
        .post(`${PATH}`)
        .set('Accept', 'application/json')
        .send({ name: 'User without number' });

      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Invalid contact data provided');
    });

    it('returns an error if contact already exist', async () => {
      const res = await chai.request(app)
        .post(`${PATH}`)
        .set('Accept', 'application/json')
        .send({
          name: 'User with taken number',
          phoneNumber: '08029190299'
        });

      expect(res.statusCode).to.equal(409);
      expect(res.body.error).to.equal('Contact with this phone number already exist');
    });
  });

  describe('/GET contact', () => {
    //Happy ending
    it('return a contact', async () => {
      const res = await chai.request(app).get(`${PATH}/08029190299`);
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Contact found');
    });

    //Sad endings
    it('return a 404 error', async () => {
      const res = await chai.request(app).get(`${PATH}/08029190209`);
      expect(res.statusCode).to.equal(404);
      expect(res.body.error).to.equal('contact not found');
    });

    it('return error for invalid id', async () => {
      const res = await chai.request(app).get(`${PATH}/080291902a`);
      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Invalid Phone Number provided');
    })
  });

  describe('/PUT', () => {
    before(async () => {
      await Contact.bulkCreate(contactSeeds);
    });

    // Happy endings
    it('update contact detail', async () => {
      const res = await chai.request(app)
        .put(`${PATH}/08029190299`)
        .set('Accept', 'application/json')
        .send({
          name: 'Rollingstone Guy',
          phoneNumber: '09092123412'
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body.data.name).to.equal('Rollingstone Guy');
      expect(res.body.data.phoneNumber).to.equal('09092123412');
    });

    // Sad endings
    it('return an error if contact data is invalid', async () => {
      const res = await chai.request(app)
        .put(`${PATH}/09092123412`)
        .set('Accept', 'application/json')
        .send({
          name: 'a',
          phoneNumber: '09092123411'
        });

      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Invalid contact data provided');
    });

    it('return an error if id data is not present in database', async () => {
      const res = await chai.request(app)
        .put(`${PATH}/08029190299`)
        .set('Accept', 'application/json')
        .send({
          name: 'New Name',
          phoneNumber: '09092123002'
        });
      expect(res.statusCode).to.equal(404);
      expect(res.body.error).to.equal('contact not found');
    });

    it('return an error if the phoneNumber to update to is already in the database', async () => {
      const res = await chai.request(app)
        .put(`${PATH}/09092123412`)
        .set('Accept', 'application/json')
        .send({
          name: 'Rollingstone Guy',
          phoneNumber: '08080000000'
        });

      expect(res.statusCode).to.equal(500);
    });
  });

  describe('/DELETE', () => {
    before(async () => {
      await Message.bulkCreate(messageSeeds);
    });

    // Happy ending
    it('delete a contact', async () => {
      const res = await chai.request(app).delete(`${PATH}/09092123412`);

      expect(res.statusCode).to.equal(200);
    });


    //Sad endings
    it('return an error if id not present in db', async () => {
      const res = await chai.request(app).delete(`${PATH}/09092123478`);

      expect(res.statusCode).to.equal(404);
      expect(res.body.error).to.equal('contact not found');
    });

    it('return an if id is invalid', async () => {
      const res = await chai.request(app).delete(`${PATH}/090921234asds`);

      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.equal('Invalid Phone Number provided');
    })
  })
});