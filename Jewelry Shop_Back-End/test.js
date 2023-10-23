import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://dattthe161372:Abcdghik1@DatTT.5ga5mwv.mongodb.net/SDN301m_Project?retryWrites=true&w=majority';
const dbName = 'SDN301m_Project';

async function main() {
  const client = new MongoClient(uri, { useNewUrlParser: false, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Kết nối thành công đến MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('products');

    const result = await collection.updateMany({ isDeleted: true }, { $set: { isDeleted: false } });
    console.log(`${result.modifiedCount} bản ghi đã được cập nhật.`);
  } catch (err) {
    console.error('Lỗi khi thực hiện cập nhật:', err);
  } finally {
    client.close();
  }
}

main().catch(console.error);
