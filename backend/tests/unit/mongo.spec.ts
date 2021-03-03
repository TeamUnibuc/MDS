import mongoose from 'mongoose'
import { TestModel } from '../../src/models/Test'

describe("Mongo database tests", () => {
  describe("Connection tests", () => {
    it("Check database connection", async () => {
       expect(mongoose.connection.readyState).toBe(1)
    });
  })

  const exampleTest = {
    email: "frank@email.com",
    firstName: "Johnny",
    lastName: "Decker",
  }

  describe("Test model operations", () => {

    const deleteAllTestDocuments = () => {
      return TestModel.deleteMany().exec().catch((err) => {
        console.log(err);
        throw new Error('Error deleting')
      })
    }

    it("Checks for empty Test collection after reset collection", async () => {
      await deleteAllTestDocuments();
      const res = await TestModel.find({});
      expect(res).toHaveLength(0);
    })

    it("Insert a document into Test collection after reset collection", async () => {
      await deleteAllTestDocuments();
      const res = await TestModel.create(exampleTest);
      console.log(res)
    })

    it("Checks for inserted Test model after reset collection", async () => {
      await deleteAllTestDocuments();
      await TestModel.create(exampleTest);
      const res = await TestModel.find({}).exec();
      expect(res).toHaveLength(1);
      expect(res[0].address?.city).toBeFalsy()
      expect(res[0].gender).toBeFalsy()
      expect(res[0].email).toBe(exampleTest.email)
      expect(res[0].firstName).toBe(exampleTest.firstName)
      expect(res[0].lastName).toBe(exampleTest.lastName)
    })
  })
});


