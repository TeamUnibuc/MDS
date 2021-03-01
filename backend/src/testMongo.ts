import { Schema } from 'mongoose'
import mongoose from 'mongoose'

export const testSchema = new Schema({
    name: String,
    data: String
});

const Test = mongoose.model('Test', testSchema);

export function insertTestModel (name: string, date: string): Promise<void> {
    const Joker = new Test({
        name: name,
        data: date
    })
    return Joker.save().then(
        () => { console.log("Worked insert!") },
        err => { console.log(`Insert broken: ${err}`) }
    );
}

export const printInsertPrint = async (): Promise<void> => {
    let res = await Test.find({}).exec();
    console.log("-------- All Test models BEFORE insert: ");
    console.log(JSON.stringify(res, null, 2));
    await insertTestModel("HardCoded", new Date().toString())
    res = await Test.find({}).exec();
    console.log("-------- All Test models AFTER insert: ");
    console.log(JSON.stringify(res, null, 2));
}
